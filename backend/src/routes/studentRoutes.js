const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /api/student/dashboard/:userId
router.get('/dashboard/:userId', studentController.getDashboardStats);

module.exports = router;
