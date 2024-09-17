const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Collection schema for managing user movie collections
const collectionSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true 
  },
  movies: [{
    type: String, 
  }],
  isPublic: {
    type: Boolean,
    default: false 
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Collection', collectionSchema); 
