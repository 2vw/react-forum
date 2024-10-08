// src/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: {
    type: [String], // Array of strings to hold tags
    default: [],
  },
  comments: [
      
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
