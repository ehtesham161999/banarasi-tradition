const Cart = require('../models/Cart');

// GET /api/cart/:userId
exports.getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

// POST /api/cart/:userId
// Body: { items: [...] }
exports.saveCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { items } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: 'Items array chahiye' });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ userId, items });
    }

    res.json({ success: true, cart });
  } catch (err) {
    next(err);
  }
};