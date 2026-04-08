const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// GET /api/notifications/:userId
router.get('/:userId', notificationController.getNotifications);

// PUT /api/notifications/read/:id
router.put('/read/:id', notificationController.markAsRead);

// DELETE /api/notifications/:id (NEW)
router.delete('/:id', notificationController.deleteNotification);

// DELETE /api/notifications/clear/:userId
router.delete('/clear/:userId', notificationController.clearNotifications);

module.exports = router;
