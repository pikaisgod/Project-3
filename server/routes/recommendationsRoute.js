const express = require('express');
const { getMovieRecommendations } = require('../services/simklapi');
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Route to fetch movie recommendations
router.get('/recommendations', authenticate, async (req, res) => {
  try {
    const recommendations = await getMovieRecommendations(req.userId);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

module.exports = router;
