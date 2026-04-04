const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const upload = require('../middleware/upload');

// POST /api/skills/add
router.post('/add', upload.single('certificate'), skillController.addSkill);

// GET /api/skills/user/:userId
router.get('/user/:userId', skillController.getUserSkills);

// GET /api/skills/pending
router.get('/pending', skillController.getPendingSkills);

// PUT /api/skills/verify/:skillId
router.put('/verify/:skillId', skillController.updateSkillStatus);

module.exports = router;
