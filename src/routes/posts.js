// Assuming you're using Express and Mongoose

// src/routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Adjust the path according to your structure

// POST /api/create
router.post('/create', async (req, res) => {
  const { title, message, tags, captcha } = req.body;
  // Validate CAPTCHA token if needed

  try {
    const newPost = new Post({
      title,
      message,
      tags, // Save tags to the database
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

module.exports = router;
