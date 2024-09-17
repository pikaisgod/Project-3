const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema to store user data and their watchlist of movie IDs
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  toWatchList: [{
    type: String, 
  }],
  watchedList: [{
    type: String, 
  }],
  topRatedMovies: [{
    type: String, 
  }],
  collections: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Collection'
  }],
}, {
  timestamps: true, 
});

module.exports = mongoose.model('User', userSchema); 