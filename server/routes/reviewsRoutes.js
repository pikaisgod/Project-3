const express = require('express');
const Review = require('../models/review');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Submit a new review
router.post('/:movieId', authenticate, async (req, res) => {
  const { rating, review } = req.body;
  const { movieId } = req.params;

  try {
    const newReview = new Review({
      userId: req.userId,
      movieId,
      rating,
      review,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
});

// Fetch reviews for a movie
router.get('/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).populate('userId');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

module.exports = router;
