const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); // Import dotenv
const Token = require('./models/Token');
const User = require('./models/User');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB using the URI from the environment variables
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes
app.get('/tokens', async (req, res) => {
    try {
      const { from, to } = req.query;
  
      const query = {};
      if (from) query.firstFetchedAt = { $gte: new Date(from) };
      if (to) query.firstFetchedAt = { ...query.firstFetchedAt, $lte: new Date(to) };
  
      const tokens = await Token.find(query).sort({ firstFetchedAt: -1 }); // Sort by descending date
      res.json(tokens);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tokens' });
    }
  });

  // Route to get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 }); // Sort by _id in descending order
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
