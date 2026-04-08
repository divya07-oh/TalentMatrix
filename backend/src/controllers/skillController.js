const Skill = require('../models/Skill');
const { addNotification } = require('../utils/notificationService');

// POST /api/skills/add
exports.addSkill = async (req, res) => {
  try {
    const { userId, skillName, projectRepoLink } = req.body;
    const certificateFile = req.file;

    if (!skillName || !certificateFile || !userId) {
      return res.status(400).json({ message: "skillName, certificate, and userId are required." });
    }

    const newSkill = new Skill({
      userId,
      skillName,
      githubLink: projectRepoLink || "",
      certificate: certificateFile.path.replace(/\\/g, '/'),
      status: 'pending'
    });

    await newSkill.save();

    // Admin Notification
    await addNotification("admin", "A new skill is pending verification", "skill", "admin");

    res.status(201).json({
      message: "Skill submitted for verification successfully.",
      skill: newSkill
    });
  } catch (error) {
    console.error("Skill Add Error:", error);
    res.status(500).json({ message: "Internal server error during skill submission." });
  }
};

// GET /api/skills/user/:userId
exports.getUserSkills = async (req, res) => {
  try {
    const { userId } = req.params;
    const skills = await Skill.find({ userId });
    
    res.status(200).json({
      message: "User skills retrieved successfully.",
      skills
    });
  } catch (error) {
    console.error("Get User Skills Error:", error);
    res.status(500).json({ message: "Internal server error retrieving user skills." });
  }
};

// GET /api/skills/pending
exports.getPendingSkills = async (req, res) => {
  try {
    const pendingSkills = await Skill.find({ status: 'pending' }).populate('userId', 'name email');
    
    res.status(200).json({
      message: "Pending skills retrieved successfully.",
      skills: pendingSkills
    });
  } catch (error) {
    console.error("Get Pending Skills Error:", error);
    res.status(500).json({ message: "Internal server error retrieving pending skills." });
  }
};

// GET /api/skills/all (NEW)
exports.getAllSkills = async (req, res) => {
  try {
    const allSkills = await Skill.find().populate('userId', 'name email');
    
    res.status(200).json({
      message: "All skill transmissions retrieved.",
      skills: allSkills
    });
  } catch (error) {
    console.error("Get All Skills Error:", error);
    res.status(500).json({ message: "Internal server error retrieving skills." });
  }
};

// PUT /api/skills/verify/:skillId
exports.updateSkillStatus = async (req, res) => {
  try {
    const { skillId } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: "Invalid status." });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(skillId, { status }, { new: true });

    if (!updatedSkill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    await addNotification(
      updatedSkill.userId, 
      `Your skill "${updatedSkill.skillName}" has been ${status}`, 
      "skill", 
      "student"
    );

    res.status(200).json({
      message: `Skill status updated to ${status}.`,
      skill: updatedSkill
    });
  } catch (error) {
    console.error("Update Skill Status Error:", error);
    res.status(500).json({ message: "Internal server error during verification." });
  }
};
