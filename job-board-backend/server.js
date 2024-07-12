const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const db = require('./database'); 
const jwt = require('jsonwebtoken');
const authRoutes = require('./routes/authRoutes');
const axios = require('axios');
const userRoutes = require('./routes/userRoutes'); 
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

const app = express();
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
  optionsSuccessStatus: 204, 
};
app.use(cors(corsOptions)); 

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

app.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Access to protected route granted' });
});

app.get('/', (req, res) => {
  res.send('Testing backend envoirnment');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});