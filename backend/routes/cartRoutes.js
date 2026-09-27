const router = require('express').Router();
const { getCart, saveCart } = require('../controllers/cartController');

router.get('/:userId', getCart);
router.post('/:userId', saveCart);

module.exports = router;