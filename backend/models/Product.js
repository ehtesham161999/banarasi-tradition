const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, required: true },
    video: { type: String },
    category: { type: String, default: 'silk' },
    description: { type: String, default: '' },
    stock: { type: Number, default: 10 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);