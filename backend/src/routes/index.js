const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const skillRoutes = require('./skillRoutes');
const searchRoutes = require('./searchRoutes');
const collaborationRoutes = require('./collaborationRoutes');
const notificationRoutes = require('./notificationRoutes');
const adminRoutes = require('./adminRoutes');
const studentRoutes = require('./studentRoutes');
const projectRoutes = require('./projectRoutes');
const analyticsRoutes = require('./analyticsRoutes');

// Root route
router.get('/', (req, res) => {
    res.json({ message: "API Running" });
});

// Auth routes
router.use('/api/auth', authRoutes);

// Profile routes
router.use('/api/user', profileRoutes);

// Skill routes
router.use('/api/skills', skillRoutes);

// Search routes
router.use('/api/search', searchRoutes);

// Collaboration routes
router.use('/api/collaboration', collaborationRoutes);

// Notification routes
router.use('/api/notifications', notificationRoutes);

// Admin routes
router.use('/api/admin', adminRoutes);

// Student routes
router.use('/api/student', studentRoutes);

// Project Workspace routes
router.use('/api/projects', projectRoutes);

// Analytics routes
router.use('/api/analytics', analyticsRoutes);

module.exports = router;


