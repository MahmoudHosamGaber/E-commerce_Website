const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
} = require("../../controllers/productReviewController");
const { verifyAuth } = require("../../middleware/authMiddleware");

router.post("/:id/review", verifyAuth, createReview);

/**
 * @desc    Get Product Reviews
 * @route   Get /api/product/:id/reviews
 * @access  Public
 */
router.get("/:id/reviews", getReviews);

module.exports = router;
