// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Define a schema for the messages
const messageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    comments: [{ text: String }],
    tags: { type: [String], default: [] },
});

const Message = mongoose.model('Message', messageSchema);

// POST endpoint to create a new message
app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: "Error saving message", error });
    }
});

// API endpoint to get all messages (or just one if an id is specified)
app.get('/api/fetch', async (req, res) => {
    const { id } = req.query;
    try {
      if (id) {
        const message = await Message.findById(id);
        if (message) {
          res.json(message);
        } else {
          res.status(404).json({ message: "Message not found" });
        }
      } else {
        const messages = await Message.find();
        res.json(messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
});

app.post('/api/comments', async (req, res) => {
    const { postId, username, text } = req.body; // Get post ID and comment data from the request body
  
    try {
      const message = await Message.findById(postId);
      if (!message) {
        return res.status(404).json({ message: 'Message not found' });
      }
  
      // Add the new comment to the post's comments array
      message.comments.push({ username, text });
      await message.save();
  
      res.status(201).json(message); // Return the updated message
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: 'Error adding comment' });
    }
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
