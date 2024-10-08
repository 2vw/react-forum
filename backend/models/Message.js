// models/Message.js
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const MessageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  comments: [CommentSchema],  // Add comments field
  tags: { type: [String], default: [] },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
