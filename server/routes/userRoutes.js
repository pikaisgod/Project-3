const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Collection = require('../models/Collection');
const router = express.Router();

// Middleware to authenticate the user using the JWT token
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1]; 
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ error: 'Failed to authenticate token' });
    req.userId = decoded.userId;
    next();
  });
};

// Route to fetch user profile data
router.get('/profile', authenticate, async (req, res) => {
  try {
    // Find user data
    const user = await User.findById(req.userId).populate('Collections');
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Send profile data to the front-end
    res.json({
      username: user.username,
      topRatedMovies: user.topRatedMovies,
      toWatchList: user.toWatchList,
      watchedList: user.watchedList,
      collections: user.collections,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

module.exports = router;
