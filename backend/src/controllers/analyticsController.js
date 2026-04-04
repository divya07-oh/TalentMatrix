const mockUsers = require('../utils/mockUsers');
const mockSkills = require('../utils/mockSkills');
const mockCollaborations = require('../utils/mockCollaborations');

exports.getOverview = (req, res) => {
    try {
        const totalUsers = mockUsers.length;
        const totalSkills = mockSkills.length;
        
        const approvedSkills = mockSkills.filter(s => s.status === 'approved').length;
        const pendingSkills = mockSkills.filter(s => s.status === 'pending').length;
        
        const totalCollaborations = mockCollaborations.length;
        const activeCollaborations = mockCollaborations.filter(c => c.status === 'accepted').length;

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
