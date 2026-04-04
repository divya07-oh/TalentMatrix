const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// POST /api/projects/create
router.post('/create', projectController.createProject);

// GET /api/projects/user/:userId
router.get('/user/:userId', projectController.getUserProjects);

// PUT /api/projects/progress/:id
router.put('/progress/:id', projectController.updateProgress);

module.exports = router;
