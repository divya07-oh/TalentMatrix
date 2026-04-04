const express = require('express');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');

// POST /api/collaboration/send
router.post('/send', collaborationController.sendRequest);

// GET /api/collaboration/user/:userId
router.get('/user/:userId', collaborationController.getUserRequests);

// PUT /api/collaboration/respond/:id
router.put('/respond/:id', collaborationController.respondToRequest);

module.exports = router;
