const mockProjects = require('../utils/mockProjects');

// POST /api/projects/create
exports.createProject = (req, res) => {
    try {
        const { projectName, members } = req.body;

        if (!projectName || !projectName.trim()) {
            return res.status(400).json({ message: "Project name is required." });
        }

        let projectMembers = members;
        if (!projectMembers || !Array.isArray(projectMembers)) {
            projectMembers = [];
        }

        const newProject = {
            id: mockProjects.length > 0 ? mockProjects[mockProjects.length - 1].id + 1 : 1,
            projectName,
            members: projectMembers,
            progress: 0,
            status: "active",
            createdAt: new Date().toISOString()
        };

        mockProjects.push(newProject);

        return res.status(201).json({
            message: "Project created successfully.",
            data: newProject
        });
    } catch (error) {
        console.error("Create Project Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// GET /api/projects/user/:userId
exports.getUserProjects = (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const userProjects = mockProjects.filter(p => p.members.includes(userId.toString()));

        // Sort by latest first
        userProjects.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

        return res.status(200).json({
            message: "User projects retrieved successfully.",
            data: userProjects
        });
    } catch (error) {
        console.error("Get User Projects Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// PUT /api/projects/progress/:id
exports.updateProgress = (req, res) => {
    try {
        const { id } = req.params;
        const { progress, status } = req.body;

        const project = mockProjects.find(p => p.id.toString() === id.toString());

        if (!project) {
            return res.status(404).json({ message: "Project not found." });
        }

        if (progress !== undefined) {
            if (typeof progress !== 'number' || progress < 0 || progress > 100) {
                 return res.status(400).json({ message: "Progress must be a number between 0 and 100." });
            }
            project.progress = progress;
            
            // Auto update status based on progress if no explicit status is provided
            if (progress === 100 && !status) {
                project.status = "completed";
            } else if (progress < 100 && project.status === "completed" && !status) {
                project.status = "active";
            }
        }

        if (status !== undefined) {
            if (!['active', 'completed'].includes(status)) {
                return res.status(400).json({ message: "Status must be 'active' or 'completed'." });
            }
            project.status = status;
        }

        return res.status(200).json({
            message: "Project progress updated successfully.",
            data: project
        });
    } catch (error) {
        console.error("Update Progress Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
