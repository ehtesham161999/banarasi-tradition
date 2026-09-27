const router = require('express').Router();
const { uploadFields } = require('../middleware/upload');

// POST /api/upload
router.post('/', uploadFields, (req, res) => {
  try {
    const response = {};

    if (req.files?.image) {
      response.image = `/uploads/images/${req.files.image[0].filename}`;
    }

    if (req.files?.video) {
      response.video = `/uploads/videos/${req.files.video[0].filename}`;
    }

    res.json({
      success: true,
      ...response,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;