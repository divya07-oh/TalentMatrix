const mockUsers = require('../utils/mockUsers');

// GET /api/user/profile/:id
exports.getProfile = (req, res) => {
  const { id } = req.params;
  
  // Find user by ID
  const user = mockUsers.find(u => u.id.toString() === id.toString());
  
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  // Return profile data (excluding password)
  const { password: _, ...profileData } = user;
  
  // Ensure default values for profile fields if they don't exist yet
  res.status(200).json({
    ...profileData,
    college: profileData.college || 'Not Specified',
    department: profileData.department || 'Not Specified',
    year: profileData.year || 'Not Specified',
    skills: profileData.skills || [],
    gitRepos: profileData.gitRepos || []
  });
};

// PUT /api/user/profile/:id
exports.updateProfile = (req, res) => {
  const { id } = req.params;
  const { name, department, year, skills, gitRepos } = req.body;

  const userIndex = mockUsers.findIndex(u => u.id.toString() === id.toString());

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found." });
  }

  // Update user in mock database
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    name: name || mockUsers[userIndex].name,
    department: department || mockUsers[userIndex].department,
    year: year || mockUsers[userIndex].year,
    skills: skills || mockUsers[userIndex].skills,
    gitRepos: gitRepos || mockUsers[userIndex].gitRepos
  };

  const { password: _, ...updatedUser } = mockUsers[userIndex];

  res.status(200).json({
    message: "Profile updated successfully.",
    user: updatedUser
  });
};
