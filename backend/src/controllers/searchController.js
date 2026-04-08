const User = require('../models/User');
const Skill = require('../models/Skill');

// GET /api/search/skills
// Search students by skill
exports.searchStudentsBySkill = async (req, res) => {
  try {
    const { skill, collegeId } = req.query;

    // 1. Validation
    if (!skill) {
      return res.status(400).json({ message: "Skill query parameter is required." });
    }

    // 2. Filter Skills using Regex for case-insensitive partial match
    // and populate user details
    const matchedSkills = await Skill.find({
      skillName: { $regex: skill, $options: 'i' },
      status: 'approved' // Only search approved skills
    }).populate('userId', 'name email collegeId');

    // If no skills matched at all
    if (matchedSkills.length === 0) {
      return res.status(200).json({ message: "No students found", data: [] });
    }

    // 3. Transform data and handle duplicates (one student might have multiple matching skills)
    let matchingUsers = [];
    const processedUserIds = new Set();

    matchedSkills.forEach(matchedSkill => {
      const user = matchedSkill.userId;
      if (user && !processedUserIds.has(user._id.toString())) {
        
        // Optional College Filtering
        if (collegeId && user.collegeId !== collegeId) {
          return;
        }

        processedUserIds.add(user._id.toString());

        // Find all matched skills for this specific user in the current result set
        const userMatchedSkills = matchedSkills.filter(s => 
          s.userId && s.userId._id.toString() === user._id.toString()
        );
        
        matchingUsers.push({
          id: user._id,
          name: user.name,
          email: user.email,
          collegeId: user.collegeId,
          skills: userMatchedSkills.map(s => ({
            id: s._id,
            skillName: s.skillName,
            status: s.status
          }))
        });
      }
    });

    // 4. Sorting (alphabetically by name)
    matchingUsers.sort((a, b) => a.name.localeCompare(b.name));

    return res.status(200).json({
      message: "Students found successfully",
      data: matchingUsers
    });
  } catch (error) {
    console.error("Search Skills Error:", error);
    return res.status(500).json({ message: "Internal server error during search." });
  }
};
