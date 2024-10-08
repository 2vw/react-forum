// app.js (backend)
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./authRoutes');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/forum', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Authentication routes
app.use('/api/auth', authRoutes);

// Example protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({ message: 'You have access to this route', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
