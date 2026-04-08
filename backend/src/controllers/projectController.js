const Project = require('../models/Project');

// POST /api/projects/create
exports.createProject = async (req, res) => {
    try {
        const { name, userId, members } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Project name is required." });
        }

        const projectMembers = Array.isArray(members) ? members : [];

        const newProject = new Project({
            name,
            owner: userId,
            members: projectMembers,
            progress: 0,
            status: "active"
        });

        await newProject.save();

        return res.status(201).json({
            message: "Project created successfully.",
            project: newProject
        });
    } catch (error) {
        console.error("Create Project Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// GET /api/projects/user/:userId
exports.getUserProjects = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const userProjects = await Project.find({
            owner: userId
        })
        .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "User projects retrieved successfully.",
            projects: userProjects
        });
    } catch (error) {
        console.error("Get User Projects Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

// PUT /api/projects/progress/:id
exports.updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress, status } = req.body;

        const project = await Project.findById(id);

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

        await project.save();

        return res.status(200).json({
            message: "Project progress updated successfully.",
            data: project
        });
    } catch (error) {
        console.error("Update Progress Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
