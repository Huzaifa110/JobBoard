const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://localhost:27017/Job-Board', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = db;
