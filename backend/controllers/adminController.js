const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// POST /api/admin/login
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username aur password chahiye' });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({ message: 'Galat username ya password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Galat username ya password' });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/admin/setup — first time admin banao
exports.setup = async (req, res, next) => {
  try {
    const existing = await Admin.findOne();

    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username aur password chahiye' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: 'Admin ban gaya! Ab login karo.',
      admin: { id: admin._id, username: admin.username },
    });
  } catch (err) {
    next(err);
  }
};