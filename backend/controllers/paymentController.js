const crypto = require('crypto');
const razorpay = require('../utils/razorpay');
const Order = require('../models/Order');

// 1. Create Razorpay order
exports.createRazorpayOrder = async (req, res, next) => {
  try {
    const { amount } = req.body; // rupees
    const options = {
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

// 2. Verify payment signature
exports.verifyPayment = async (req, res, next) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid signature' });
    }

    // Payment verified → save order in DB
    const order = await Order.create({
      ...orderData,
      paymentMethod: 'Razorpay',
      paymentStatus: 'paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    res.json({ success: true, order });
  } catch (err) {
    next(err);
  }
};