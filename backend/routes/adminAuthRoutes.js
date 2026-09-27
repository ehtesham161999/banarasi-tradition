const router = require('express').Router();
const { login, setup } = require('../controllers/adminController');

router.post('/login', login);
router.post('/setup', setup);

module.exports = router;