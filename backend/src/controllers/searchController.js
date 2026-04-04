const mockUsers = require('../utils/mockUsers');
const mockSkills = require('../utils/mockSkills');

// GET /api/search/skills
// Search students by skill
exports.searchStudentsBySkill = (req, res) => {
  const { skill, collegeId } = req.query;

  // 1. Validation
  if (!skill) {
    return res.status(400).json({ message: "Skill query parameter is required." });
  }

  const searchSkill = skill.toLowerCase();

  // 2. Filter Skills
  const matchedSkills = mockSkills.filter(s => s.skillName.toLowerCase() === searchSkill);

  // If no skills matched at all
  if (matchedSkills.length === 0) {
    return res.status(200).json({ message: "No students found", data: [] });
  }

  // 3. Extract userIds and find corresponding users
  let matchingUsers = [];
  const processedUserIds = new Set();

  matchedSkills.forEach(matchedSkill => {
    // Only process each userId once to prevent duplicates
    if (!processedUserIds.has(matchedSkill.userId)) {
      processedUserIds.add(matchedSkill.userId);

      const user = mockUsers.find(u => u.id.toString() === matchedSkill.userId.toString());
      
      if (user) {
        // Collect all skills of this user that match the search (usually just one, but handle if multiple)
        const userMatchedSkills = matchedSkills.filter(s => s.userId === user.id);
        
        matchingUsers.push({
          id: user.id,
          name: user.name,
          email: user.email,
          collegeId: user.collegeId || (user.email.split('@')[1] ? user.email.split('@')[1].split('.')[0] : 'unknown'), // fallback since mock users might not have collegeId explicitly set
          skills: userMatchedSkills
        });
      }
    }
  });

  // 4. College Filtering
  if (collegeId) {
    matchingUsers = matchingUsers.filter(u => u.collegeId === collegeId);
  }

  // 5. Empty State Check after filtering
  if (matchingUsers.length === 0) {
    return res.status(200).json({ message: "No students found", data: [] });
  }

  // 6. Sorting (alphabetically by name)
  matchingUsers.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return res.status(200).json({
    message: "Students found successfully",
    data: matchingUsers
  });
};
