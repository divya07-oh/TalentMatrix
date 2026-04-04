const mockSkills = require('../utils/mockSkills');
const { addNotification } = require('../utils/notificationService');

// POST /api/skills/add
// Add a new skill with certificate upload
exports.addSkill = (req, res) => {
  const { userId, skillName, projectRepoLink } = req.body;
  const certificateFile = req.file;

  if (!skillName) {
    return res.status(400).json({ message: "skillName is required." });
  }
  
  if (!certificateFile) {
    return res.status(400).json({ message: "certificate file is required." });
  }

  // Note: projectRepoLink might be optional depending on strictness, but we'll accept it
  // userId is also required for mock purpose
  if (!userId) {
     return res.status(400).json({ message: "userId is required." });
  }

  const newSkill = {
    id: mockSkills.length > 0 ? mockSkills[mockSkills.length - 1].id + 1 : 1,
    userId,
    skillName,
    projectRepoLink: projectRepoLink || "",
    certificateFile: certificateFile.path.replace(/\\/g, '/'), // normalize path
    status: 'pending'
  };

  mockSkills.push(newSkill);

  // Admin Notification
  addNotification(1, "A new skill is pending verification", "system", "admin");

  res.status(201).json({
    message: "Skill submitted for verification successfully.",
    skill: newSkill
  });
};

// GET /api/skills/user/:userId
// Get all skills for a specific student
exports.getUserSkills = (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    return res.status(400).json({ message: "User ID is required in URL parameters." });
  }

  const userSkills = mockSkills.filter(s => s.userId.toString() === userId.toString());
  
  res.status(200).json({
    message: "User skills retrieved successfully.",
    skills: userSkills
  });
};

// GET /api/skills/pending
// Get all pending skills (for admin review)
exports.getPendingSkills = (req, res) => {
  const pendingSkills = mockSkills.filter(s => s.status === 'pending');
  
  res.status(200).json({
    message: "Pending skills retrieved successfully.",
    skills: pendingSkills
  });
};

// PUT /api/skills/verify/:skillId
// Update a skill's status (approve/reject)
exports.updateSkillStatus = (req, res) => {
  const { skillId } = req.params;
  const { status } = req.body;

  if (!['approved', 'rejected', 'pending'].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Must be 'approved', 'rejected', or 'pending'." });
  }

  const skillIndex = mockSkills.findIndex(s => s.id.toString() === skillId.toString());

  if (skillIndex === -1) {
    return res.status(404).json({ message: "Skill not found." });
  }

  mockSkills[skillIndex].status = status;

  if (status === 'approved') {
    addNotification(mockSkills[skillIndex].userId, "Your skill has been approved", "skill", "student");
  } else if (status === 'rejected') {
    addNotification(mockSkills[skillIndex].userId, "Your skill has been rejected", "skill", "student");
  }

  res.status(200).json({
    message: `Skill status updated to ${status}.`,
    skill: mockSkills[skillIndex]
  });
};
