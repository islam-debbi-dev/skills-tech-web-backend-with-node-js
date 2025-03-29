const mongoose = require('mongoose');

async function connectDB() {
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
}

// export the connectDB function
module.exports = {connectDB};