const User = require('../models/User');
const Skill = require('../models/Skill');
const Collaboration = require('../models/Collaboration');
const AdminSettings = require('../models/AdminSettings');

// GET /api/admin/stats
exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalSkills = await Skill.countDocuments();
        const pendingSkills = await Skill.countDocuments({ status: 'pending' });
        const approvedSkills = await Skill.countDocuments({ status: 'approved' });
        const totalCollaborations = await Collaboration.countDocuments();

        // Recent Activities: Skill Submissions
        const recentSkillsRaw = await Skill.find().sort({ createdAt: -1 }).limit(5);
        const recentSkills = recentSkillsRaw.map(s => ({
            activityType: 'skill_submission',
            id: s._id,
            title: `Skill Submitted: ${s.skillName}`,
            status: s.status,
            date: s.createdAt
        }));
        
        // Recent Activities: Collaboration Requests
        const recentCollabsRaw = await Collaboration.find().sort({ createdAt: -1 }).limit(5);
        const recentCollabs = recentCollabsRaw.map(c => ({
            activityType: 'collaboration_request',
            id: c._id,
            title: `Collaboration Request`,
            status: c.status,
            date: c.createdAt
        }));

        const recentActivities = [...recentSkills, ...recentCollabs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        return res.status(200).json({
            totalStudents,
            totalSkills,
            pendingSkills,
            approvedSkills,
            totalCollaborations,
            recentActivities
        });
    } catch (error) {
        console.error("Admin Dashboard Stats Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving dashboard stats." });
    }
};

// GET /api/admin/insights
exports.getInsights = async (req, res) => {
    try {
        // Aggregate skill distribution
        const topSkills = await Skill.aggregate([
            { $group: { _id: "$skillName", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 },
            { $project: { name: "$_id", count: 1, _id: 0 } }
        ]);

        return res.status(200).json({
            message: "Insights retrieved successfully",
            data: {
                topSkills,
                recentActivities: [] 
            }
        });
    } catch (error) {
        console.error("Admin Insights Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving insights." });
    }
};

// GET /api/admin/settings
exports.getSettings = async (req, res) => {
  try {
    let settings = await AdminSettings.findOne();
    if (!settings) {
      // Return a default if none exists yet
      return res.status(200).json({
        success: true,
        settings: {
          collegeName: "Default College",
          collegeDomain: "college.edu",
          description: "Default description",
          adminEmail: "admin@college.edu"
        }
      });
    }
    res.status(200).json({
      success: true,
      settings
    });
  } catch (error) {
    console.error("Admin Settings Error:", error);
    res.status(500).json({ message: "Internal server error retrieving settings." });
  }
};

// PUT /api/admin/settings
exports.updateSettings = async (req, res) => {
  try {
    const { collegeName, collegeDomain, description, adminEmail } = req.body;
    
    let settings = await AdminSettings.findOne();
    
    if (settings) {
      settings.collegeName = collegeName || settings.collegeName;
      settings.collegeDomain = collegeDomain || settings.collegeDomain;
      settings.description = description || settings.description;
      settings.adminEmail = adminEmail || settings.adminEmail;
      await settings.save();
    } else {
      settings = new AdminSettings({
        collegeName: collegeName || "TalentMatrix College",
        collegeDomain: collegeDomain || "college.edu",
        description: description || "Collaborative Skill Marketplace",
        adminEmail: adminEmail || "admin@college.edu"
      });
      await settings.save();
    }

    res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings
    });
  } catch (error) {
    console.error("Admin Settings Update Error:", error);
    res.status(500).json({ message: "Internal server error updating settings." });
  }
};
