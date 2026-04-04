const mockUsers = require('../utils/mockUsers');
const mockSkills = require('../utils/mockSkills');
const mockCollaborations = require('../utils/mockCollaborations');

exports.getDashboardStats = (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // 1. User basic info
        const user = mockUsers.find(u => u.id.toString() === userId.toString());
        
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const userInfo = {
            name: user.name,
            email: user.email
        };

        // 2, 3, 4. Skills Stats
        const userSkills = mockSkills.filter(s => s.userId.toString() === userId.toString());
        
        const totalSkills = userSkills.length;
        const approvedSkills = userSkills.filter(s => s.status === 'approved').length;
        const pendingSkills = userSkills.filter(s => s.status === 'pending').length;

        // 5. Collaboration Stats
        const sentRequests = mockCollaborations.filter(c => c.senderId.toString() === userId.toString());
        const receivedRequests = mockCollaborations.filter(c => c.receiverId.toString() === userId.toString());
        
        const totalSent = sentRequests.length;
        const totalReceived = receivedRequests.length;
        
        const acceptedCollaborations = mockCollaborations.filter(c => 
            (c.senderId.toString() === userId.toString() || c.receiverId.toString() === userId.toString()) && 
            c.status === 'accepted'
        ).length;

        return res.status(200).json({
            userInfo,
            skills: {
                totalSkills,
                approvedSkills,
                pendingSkills
            },
            collaborations: {
                totalSent,
                totalReceived,
                acceptedCollaborations
            }
        });

    } catch (error) {
        console.error("Student Dashboard Stats Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving student dashboard stats." });
    }
};
