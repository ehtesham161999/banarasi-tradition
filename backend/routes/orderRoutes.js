const router = require('express').Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getDashboardStats,
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getOrders);

// ⚠️ Stats route :id se PEHLE hona chahiye
router.get('/stats/dashboard', getDashboardStats);

router.get('/:id', getOrder);
router.put('/:id', updateOrderStatus);

module.exports = router;