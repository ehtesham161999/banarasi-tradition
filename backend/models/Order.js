const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        price: Number,
        qty: Number,
        image: String,
      },
    ],
    total: { type: Number, required: true },
    paymentMethod: { type: String, default: 'COD' },
    paymentStatus: { type: String, default: 'pending' },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    orderStatus: { type: String, default: 'placed' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);