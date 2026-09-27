const Setting = require('../models/Setting');

// ===== HERO SLIDER =====
exports.getHeroSettings = async (req, res, next) => {
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
        ],
      });
    }

    res.json(setting.value);
  } catch (err) {
    next(err);
  }
};

exports.updateHeroSettings = async (req, res, next) => {
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
};

// ===== HOME SECTIONS =====
const DEFAULT_HOME_SECTIONS = {
  topCategories: [
    { name: 'SAREES', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600' },
    { name: 'PERFUMES', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600' },
    { name: 'KURTA SETS', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' },
    { name: 'SAREES SATURDAY', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600' },
  ],
  trendingNow: {
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
    line1: 'SILK',
    line2: 'SAREE',
    line3: 'SALE',
    price: 'Starting ₹599/-',
  },
  celebrities: {
    banner: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
    list: [
      { name: 'DEEPIKA SINGH', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400' },
      { name: 'SHWETA TIWARI', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400' },
      { name: 'TINAA DATTAA', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400' },
      { name: 'KISHORI SHAHANE', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400' },
      { name: 'SUHASI DHAMI', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400' },
      { name: 'ADITI BHATIA', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
    ],
  },
  sareeStore: [
    { name: 'SUDATHI GOLD', label: 'Banarasi GOLD', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800', slug: 'sudathi-gold' },
    { name: 'BESTSELLERS', label: 'BESTSELLERS', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800', slug: 'bestsellers' },
    { name: 'READY TO WEAR', label: 'READY TO WEAR SAREES', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800', slug: 'ready-to-wear' },
    { name: 'ESSENTIALS', label: 'ESSENTIALS', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800', slug: 'essentials' },
  ],
  sareeOfIndia: [
    { name: 'Bandhani Sarees', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600' },
    { name: 'Paithani Sarees', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600' },
    { name: 'Kanjivaram Sarees', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600' },
    { name: 'Banarasi Sarees', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600' },
  ],
  categoryCircles: [
    { name: 'Saree', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300' },
    { name: 'Silk', img: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=300' },
    { name: 'Cotton', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300' },
    { name: 'Kurta Sets', img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=300' },
    { name: 'Perfumes', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=300' },
    { name: 'Gold', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300' },
  ],
};

exports.getHomeSections = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'home_sections' });

    if (!setting) {
      setting = await Setting.create({
        key: 'home_sections',
        value: DEFAULT_HOME_SECTIONS,
      });
    }

    res.json(setting.value);
  } catch (err) {
    next(err);
  }
};

exports.updateHomeSections = async (req, res, next) => {
  try {
    const sections = req.body;
    if (!sections || typeof sections !== 'object') {
      return res.status(400).json({ message: 'Sections object chahiye' });
    }

    let setting = await Setting.findOne({ key: 'home_sections' });
    if (setting) {
      setting.value = sections;
      await setting.save();
    } else {
      setting = await Setting.create({ key: 'home_sections', value: sections });
    }

    res.json({ success: true, sections: setting.value });
  } catch (err) {
    next(err);
  }
};

// ===== WEEKLY DROP =====
const getNextSaturday = () => {
  const now = new Date();
  const day = now.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  const nextSat = new Date(now);
  nextSat.setDate(now.getDate() + daysUntilSaturday);
  nextSat.setHours(10, 0, 0, 0);
  return nextSat;
};

exports.getWeeklyDrop = async (req, res, next) => {
  try {
    let setting = await Setting.findOne({ key: 'weekly_drop' });

    if (!setting) {
      setting = await Setting.create({
        key: 'weekly_drop',
        value: {
          title: 'Sarees Saturday',
          subtitle: 'Har Saturday 100+ Naye Sarees',
          nextDrop: getNextSaturday().toISOString(),
          bannerImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600',
          productIds: [],
        },
      });
    }

    res.json(setting.value);
  } catch (err) {
    next(err);
  }
};

exports.updateWeeklyDrop = async (req, res, next) => {
  try {
    const data = req.body;

    let setting = await Setting.findOne({ key: 'weekly_drop' });
    if (setting) {
      setting.value = data;
      await setting.save();
    } else {
      setting = await Setting.create({ key: 'weekly_drop', value: data });
    }

    res.json({ success: true, weeklyDrop: setting.value });
  } catch (err) {
    next(err);
  }
};