const app = require('../src/app');
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000 // Timeout after 5 seconds to prevent hanging
    });
    isConnected = !!db.connections[0].readyState;
    console.log('MongoDB Connected in Serverless Function');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = async (req, res) => {
  try {
    await connectDB();
    return app(req, res);
  } catch (error) {
    console.error("Critical Serverless Error:", error);
    res.status(500).json({ message: "Internal Server Error: Database Connection Failed." });
  }
};
