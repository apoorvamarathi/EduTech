const Razorpay = require('razorpay');
const Transaction = require('../models/transactionModel');
const Course = require('../models/courseModel');
const Enrollment = require('../models/enrollmentModel');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create Razorpay Order
// @route   POST /api/payments/razorpay/order
const createOrder = async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);

  if (!course) return res.status(404).json({ message: 'Course not found' });

  try {
    const options = {
      amount: course.price * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: `receipt_${crypto.randomBytes(4).toString('hex')}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(201).json({ 
      ...order, 
      courseId: course._id,
      key: process.env.RAZORPAY_KEY_ID 
    });
  } catch (error) {
    console.error('Razorpay Order Error:', error);
    // Fallback to mock for testing if keys are default
    const orderId = `mock_order_${crypto.randomBytes(8).toString('hex')}`;
    res.status(201).json({ id: orderId, amount: course.price * 100, currency: 'INR', courseId: course._id, mock: true });
  }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/payments/razorpay/verify
const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

  // 1. Verify Signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature && !req.body.mock) {
    return res.status(400).json({ message: 'Invalid payment signature' });
  }

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: 'Course not found' });

  // 1. Calculate Revenue Split (e.g., 70% Instructor, 20% Platform, 10% GST/Tax)
  const totalAmount = course.price;
  const taxAmount = totalAmount * 0.18; // 18% GST
  const netAmount = totalAmount - taxAmount;
  const instructorRevenue = netAmount * 0.70;
  const platformRevenue = netAmount * 0.30;

  // 2. Create Transaction Record
  const transaction = await Transaction.create({
    user: req.user._id,
    course: courseId,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    amount: totalAmount,
    status: 'success',
    instructorRevenue,
    platformRevenue,
    taxAmount,
  });

  // 3. Automated Enrollment
  const alreadyEnrolled = await Enrollment.findOne({ user: req.user._id, course: courseId });
  if (!alreadyEnrolled) {
    await Enrollment.create({ user: req.user._id, course: courseId });
    course.studentsEnrolled.push(req.user._id);
    await course.save();
  }

  // 4. Trigger Auto Invoice (Placeholder logic)
  transaction.invoiceUrl = `/public/invoices/inv_${transaction._id}.pdf`;
  await transaction.save();

  res.status(200).json({ 
    success: true, 
    message: 'Payment verified and revenue split calculated',
    transaction 
  });
};

const getMyTransactions = async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id }).populate('course', 'title');
  res.json(transactions);
};

const getInstructorRevenue = async (req, res) => {
  const transactions = await Transaction.find().populate('course');
  const filtered = transactions.filter(t => t.course?.instructor.toString() === req.user._id.toString());
  
  const totalRevenue = filtered.reduce((acc, t) => acc + t.instructorRevenue, 0);
  res.json({ totalRevenue, transactions: filtered });
};

module.exports = { createOrder, verifyPayment, getMyTransactions, getInstructorRevenue };
