const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/courseModel');
const Enrollment = require('../models/enrollmentModel');

// @desc    Create payment intent
// @route   POST /api/payments/create-intent
// @access  Private
const createPaymentIntent = async (req, res) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);

  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100, // Stripe expects amount in cents
      currency: 'usd',
      metadata: { courseId: course._id.toString(), userId: req.user._id.toString() },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Confirm payment and enroll
// @route   POST /api/payments/confirm
// @access  Private
const confirmPayment = async (req, res) => {
  const { paymentIntentId, courseId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Create enrollment if not already exists
      const alreadyEnrolled = await Enrollment.findOne({
        user: req.user._id,
        course: courseId
      });

      if (!alreadyEnrolled) {
        const enrollment = new Enrollment({
          user: req.user._id,
          course: courseId,
        });
        await enrollment.save();

        const course = await Course.findById(courseId);
        course.studentsEnrolled.push(req.user._id);
        await course.save();
      }

      res.json({ message: 'Payment successful and enrolled' });
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPaymentIntent,
  confirmPayment,
};
