const User = require('../models/User');
const Skill = require('../models/Skill');
const Collaboration = require('../models/Collaboration');

// GET /api/analytics/overview
exports.getOverview = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSkills = await Skill.countDocuments();
        
        const approvedSkills = await Skill.countDocuments({ status: 'approved' });
        const pendingSkills = await Skill.countDocuments({ status: 'pending' });
        
        const totalCollaborations = await Collaboration.countDocuments();
        const activeCollaborations = await Collaboration.countDocuments({ status: 'accepted' });

        return res.status(200).json({
            message: "Analytics overview retrieved successfully",
            data: {
                totalUsers,
                totalSkills,
                skillsBreakdown: {
                    approved: approvedSkills,
                    pending: pendingSkills
                },
                totalCollaborations,
                activeCollaborations
            }
        });
    } catch (error) {
        console.error("Analytics Overview Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
