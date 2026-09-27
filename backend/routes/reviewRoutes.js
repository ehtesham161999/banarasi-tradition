const router = require('express').Router();
const { getReviews, createReview } = require('../controllers/reviewController');

router.get('/:productId', getReviews);
router.post('/', createReview);

module.exports = router;