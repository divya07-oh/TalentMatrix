const Skill = require('../models/Skill');
const Collaboration = require('../models/Collaboration');

exports.getDashboardStats = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // 1. Skill Stats
        const totalSkills = await Skill.countDocuments({ userId });
        const approvedSkills = await Skill.countDocuments({ userId, status: 'approved' });
        const pendingSkills = await Skill.countDocuments({ userId, status: 'pending' });

        // 2. Collaboration Stats (Accepted)
        const collaborationCount = await Collaboration.countDocuments({
            $or: [
                { senderId: userId },
                { receiverId: userId }
            ],
            status: 'accepted'
        });

        return res.status(200).json({
            totalSkills,
            approvedSkills,
            pendingSkills,
            collaborationCount
        });

    } catch (error) {
        console.error("Student Dashboard Stats Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving student dashboard stats." });
    }
};
