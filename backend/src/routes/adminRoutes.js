const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/dashboard', adminController.getDashboardStats);

// GET /api/admin/insights
router.get('/insights', adminController.getInsights);

// Settings Routes (NEW)
router.get('/settings', adminController.getSettings);
router.put('/settings', adminController.updateSettings);

module.exports = router;
