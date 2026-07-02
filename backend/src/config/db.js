const mongoose = require('mongoose');
const env = require('./env');

const connectWithRetry = async (attempt = 1) => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    const delay = Math.min(1000 * 2 ** attempt, 15000);
    console.error(`MongoDB connection failed (attempt ${attempt}): ${error.message}`);
    setTimeout(() => connectWithRetry(attempt + 1), delay);
  }
};

module.exports = connectWithRetry;
