const app = require('../src/app');
const connectDB = require('../src/config/db');

// Connect to Database for the serverless function
connectDB();

module.exports = app;
