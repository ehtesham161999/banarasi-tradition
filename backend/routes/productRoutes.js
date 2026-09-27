const router = require('express').Router();
const {
  getProducts,
  getProduct,
  createProduct,
} = require('../controllers/productController');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);

module.exports = router;