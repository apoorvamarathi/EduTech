const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmPayment } = require('../controllers/paymentController');
const { createOrder, verifyPayment, getMyTransactions, getInstructorRevenue } = require('../controllers/razorpayController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);

// Razorpay Mock Routes
router.post('/razorpay/order', protect, createOrder);
router.post('/razorpay/verify', protect, verifyPayment);
router.get('/my-transactions', protect, getMyTransactions);
router.get('/instructor-revenue', protect, getInstructorRevenue);

module.exports = router;
