const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User schema to store user data and their watchlist of movie IDs
const user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  watchlist: [{
    type: String, 
  }],
  toWatchList: [{
    type: String, 
  }],
  watchedList: [{
    type: String, 
  }],
  topRatedMovies: [{
    type: String, 
  }],
}, {
  timestamps: true, 
});

module.exports = mongoose.model('User', user); 