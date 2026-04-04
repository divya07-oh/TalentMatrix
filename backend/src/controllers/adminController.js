const mockUsers = require('../utils/mockUsers');
const mockSkills = require('../utils/mockSkills');
const mockCollaborations = require('../utils/mockCollaborations');

exports.getDashboardStats = (req, res) => {
    try {
        // 1. Total Students
        const totalStudents = mockUsers.filter(u => u.role === 'student').length;
        
        // 2. Total Admins
        const totalAdmins = mockUsers.filter(u => u.role === 'admin').length;
        
        // 3. Total Skills
        const totalSkills = mockSkills.length;
        
        // 4. Pending Skill Verifications
        const pendingSkills = mockSkills.filter(s => s.status === 'pending').length;
        
        // 5. Approved Skills
        const approvedSkills = mockSkills.filter(s => s.status === 'approved').length;
        
        // 6. Total Collaborations
        const totalCollaborations = mockCollaborations.length;
        
        // 7. Active Collaborations
        const activeCollaborations = mockCollaborations.filter(c => c.status === 'accepted').length;
        
        // 8. Recent Activities
        // Reverse arrays to get the latest first, then map to a standard format
        const recentSkills = [...mockSkills].reverse().slice(0, 5).map(s => ({
            activityType: 'skill_submission',
            id: s.id,
            userId: s.userId,
            title: `Skill Submitted: ${s.skillName}`,
            status: s.status,
            date: s.createdAt || new Date().toISOString() // Fallback if createdAt doesn't exist yet
        }));
        
        const recentCollabs = [...mockCollaborations].reverse().slice(0, 5).map(c => ({
            activityType: 'collaboration_request',
            id: c.id,
            senderId: c.senderId,
            title: `Collaboration: ${c.message.substring(0, 30)}${c.message.length > 30 ? '...' : ''}`,
            status: c.status,
            date: c.createdAt || new Date().toISOString()
        }));
        
        // Combine and sort by date descending, then slice to get top 5 overall
        const recentActivities = [...recentSkills, ...recentCollabs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);
        
        // 9. Top Skills Added
        const skillCounts = {};
        mockSkills.forEach(s => {
            if (s.skillName) {
                const name = s.skillName;
                skillCounts[name] = (skillCounts[name] || 0) + 1;
            }
        });
        
        const topSkills = Object.entries(skillCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        return res.status(200).json({
            totalStudents,
            totalAdmins,
            totalSkills,
            pendingSkills,
            approvedSkills,
            totalCollaborations,
            activeCollaborations,
            recentActivities,
            topSkills
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving dashboard stats." });
    }
};

exports.getInsights = (req, res) => {
    try {
        // 1. Top 5 Skills
        const skillCounts = {};
        mockSkills.forEach(s => {
            if (s.skillName) {
                const name = s.skillName;
                skillCounts[name] = (skillCounts[name] || 0) + 1;
            }
        });
        
        const topSkills = Object.entries(skillCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        // 2. Most Active Students
        const userActivityCount = {};
        
        // Count skills added by user
        mockSkills.forEach(s => {
            const uid = s.userId.toString();
            userActivityCount[uid] = (userActivityCount[uid] || 0) + 1;
        });
        
        // Count collaborations matching user
        mockCollaborations.forEach(c => {
            const sender = c.senderId.toString();
            const receiver = c.receiverId.toString();
            userActivityCount[sender] = (userActivityCount[sender] || 0) + 1;
            userActivityCount[receiver] = (userActivityCount[receiver] || 0) + 1;
        });

        const activeStudents = Object.entries(userActivityCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([userId, totalActivities]) => {
                const user = mockUsers.find(u => u.id.toString() === userId);
                return {
                    userId,
                    name: user ? user.name : "Unknown",
                    email: user ? user.email : "N/A",
                    totalActivities
                };
            });

        // 3. Recent Activities (reusing logic but returning more details if necessary)
        const recentSkills = [...mockSkills].reverse().slice(0, 5).map(s => ({
            activityType: 'skill_submission',
            id: s.id,
            userId: s.userId,
            title: `Skill Submitted: ${s.skillName}`,
            status: s.status,
            date: s.createdAt || new Date().toISOString()
        }));
        
        const recentCollabs = [...mockCollaborations].reverse().slice(0, 5).map(c => ({
            activityType: 'collaboration_request',
            id: c.id,
            senderId: c.senderId,
            title: `Collaboration: ${c.message.substring(0, 30)}${c.message.length > 30 ? '...' : ''}`,
            status: c.status,
            date: c.createdAt || new Date().toISOString()
        }));
        
        const recentActivities = [...recentSkills, ...recentCollabs]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);

        return res.status(200).json({
            message: "Insights retrieved successfully",
            data: {
                topSkills,
                activeStudents,
                recentActivities
            }
        });

    } catch (error) {
        console.error("Admin Insights Error:", error);
        return res.status(500).json({ message: "Internal server error retrieving insights." });
    }
};
