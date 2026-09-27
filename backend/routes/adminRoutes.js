const router = require('express').Router();
const Product = require('../models/Product');
const Setting = require('../models/Setting');
const { uploadFields } = require('../middleware/upload');

const {
  getHomeSections,
  updateHomeSections,
  getWeeklyDrop,
  updateWeeklyDrop,
} = require('../controllers/settingController');

// ===== HOME SECTIONS =====

router.get('/home-sections', getHomeSections);
router.put('/home-sections', updateHomeSections);

// ===== WEEKLY DROP =====

router.get('/weekly-drop', getWeeklyDrop);
router.put('/weekly-drop', updateWeeklyDrop);

// ===== HERO SLIDER =====

router.get('/hero', async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'hero_slides' });

    if (!setting) {
      setting = await Setting.create({
        key: 'hero_slides',
        value: [
          {
            image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
            title: 'Banarasi Silk Sarees',
            subtitle: 'Handwoven Elegance',
          },
          {
            image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1600',
            title: 'Festive Collection',
            subtitle: 'Celebrate in Style',
          },
          {
            image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=1600',
            title: 'Cotton Comfort',
            subtitle: 'Everyday Elegance',
          },
        ],
      });
    }

    res.json(setting.value);
  } catch (err) {
    next(err);
  }
});

router.put('/hero', async (req, res, next) => {
  try {
    const { slides } = req.body;

    if (!Array.isArray(slides)) {
      return res.status(400).json({ message: 'Slides array chahiye' });
    }

    let setting = await Setting.findOne({ key: 'hero_slides' });

    if (setting) {
      setting.value = slides;
      await setting.save();
    } else {
      setting = await Setting.create({ key: 'hero_slides', value: slides });
    }

    res.json({ success: true, slides: setting.value });
  } catch (err) {
    next(err);
  }
});

// ===== PRODUCTS =====

router.post('/products', uploadFields, async (req, res, next) => {
  try {
    const { name, price, mrp, category, description, stock } = req.body;

    const productData = {
      name,
      price: Number(price),
      mrp: Number(mrp),
      category: category || 'silk',
      description: description || '',
      stock: Number(stock) || 10,
      image: '',
      video: '',
    };

    if (req.files?.image) {
      productData.image = `/uploads/images/${req.files.image[0].filename}`;
    }

    if (req.files?.video) {
      productData.video = `/uploads/videos/${req.files.video[0].filename}`;
    }

    const product = await Product.create(productData);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

router.put('/products/:id', uploadFields, async (req, res, next) => {
  try {
    const updates = { ...req.body };

    if (updates.price) updates.price = Number(updates.price);
    if (updates.mrp) updates.mrp = Number(updates.mrp);
    if (updates.stock) updates.stock = Number(updates.stock);

    if (req.files?.image) {
      updates.image = `/uploads/images/${req.files.image[0].filename}`;
    }
    if (req.files?.video) {
      updates.video = `/uploads/videos/${req.files.video[0].filename}`;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
});

router.delete('/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;