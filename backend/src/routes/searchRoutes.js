const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// GET /api/search/skills
router.get('/skills', searchController.searchStudentsBySkill);

module.exports = router;
