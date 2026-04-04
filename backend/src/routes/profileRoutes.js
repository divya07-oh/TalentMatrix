const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// GET /api/user/profile/:id
router.get('/profile/:id', profileController.getProfile);

// PUT /api/user/profile/:id
router.put('/profile/:id', profileController.updateProfile);

module.exports = router;
