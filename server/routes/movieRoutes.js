const express = require('express');
const { searchMovies, getMovieById } = require('../services/simklapi');
const router = express.Router();

// Route to search for movies
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const movies = await searchMovies(query);
    res.json({ results: movies });
  } catch (error) {
    res.status(500).json({ error: 'Failed to search for movies' });
  }
});

// Route to get movie details by ID
router.get('/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const movie = await getMovieById(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

module.exports = router;
