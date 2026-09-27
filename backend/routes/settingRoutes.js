const router = require('express').Router();
const {
  getHeroSettings,
  updateHeroSettings,
} = require('../controllers/settingController');
const { uploadFields } = require('../middleware/upload');

// GET hero slides (public)
router.get('/hero', getHeroSettings);

// Update hero slides (admin) — with file upload
router.put('/hero', uploadFields, (req, res, next) => {
  // Agar files upload hui hain toh unke URLs banao
  let slides = [];

  if (req.body.slides) {
    slides = JSON.parse(req.body.slides);
  }

  // Agar image file upload hui hai toh usse replace karo
  if (req.files?.image) {
    // Yeh single image upload ke liye hai — multiple ke liye alag logic
  }

  req.body.slides = slides;
  updateHeroSettings(req, res, next);
});

module.exports = router;