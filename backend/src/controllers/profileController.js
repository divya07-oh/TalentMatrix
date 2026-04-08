const User = require('../models/User');

// GET /api/user/profile/:id
exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find user by ID in MongoDB
    const user = await User.findById(id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return profile data with defaults
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      collegeId: user.collegeId,
      department: user.department || 'Not Specified',
      year: user.year || 'Not Specified',
      skills: user.skills || [],
      gitRepos: user.gitRepos || []
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal server error retrieving profile." });
  }
};

// PUT /api/user/profile/:id
exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, year, skills, gitRepos } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          department,
          year,
          skills,
          gitRepos
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully.",
      user: updatedUser
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal server error updating profile." });
  }
};
