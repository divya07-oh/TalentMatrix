const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/dashboard', adminController.getDashboardStats);

// GET /api/admin/insights
router.get('/insights', adminController.getInsights);

module.exports = router;
