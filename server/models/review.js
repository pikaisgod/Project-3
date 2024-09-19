const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review schema to store reviews and ratings for movies
const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: String, // Simkl movie ID
    required: true,
  },
  rating: {
    type: Number, 
    min: 1,
    max: 10,
    required: true,
  },
  review: {
    type: String,
    required: true, 
  }
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Review', reviewSchema); 
