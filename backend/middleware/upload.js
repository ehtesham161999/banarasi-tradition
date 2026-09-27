const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Folders ensure karo
const ensureFolder = (folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
};

ensureFolder('uploads/images');
ensureFolder('uploads/videos');

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'video') {
      cb(null, 'uploads/videos/');
    } else {
      cb(null, 'uploads/images/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'image') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'), false);
    }
  } else if (file.fieldname === 'video') {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only videos allowed'), false);
    }
  } else {
    cb(null, true);
  }
};

// Multer instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max
  },
});

// Fields: image + video
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);

module.exports = { upload, uploadFields };