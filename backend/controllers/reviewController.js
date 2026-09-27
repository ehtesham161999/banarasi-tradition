const Review = require('../models/Review');

// GET /api/reviews/:productId
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({
      createdAt: -1,
    });

    // Average rating calculate karo
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    res.json({
      reviews,
      avgRating: Math.round(avgRating * 10) / 10,
      totalReviews: reviews.length,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews
exports.createReview = async (req, res, next) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ message: 'Saare fields chahiye' });
    }

    const review = await Review.create({
      productId,
      userName,
      rating: Number(rating),
      comment,
    });

    res.status(201).json({ success: true, review });
  } catch (err) {
    next(err);
  }
};