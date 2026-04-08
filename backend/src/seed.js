const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Skill = require('./models/Skill');
const Collaboration = require('./models/Collaboration');
const Project = require('./models/Project');
const Notification = require('./models/Notification');
const AdminSettings = require('./models/AdminSettings');

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // 1. Clear Database
        await User.deleteMany();
        await Skill.deleteMany();
        await Collaboration.deleteMany();
        await Project.deleteMany();
        await Notification.deleteMany();
        await AdminSettings.deleteMany();
        console.log('Database Cleared.');

        // 2. Seed Admin Settings
        await AdminSettings.create({
            collegeName: "TalentMatrix University",
            collegeDomain: "talentmatrix.edu",
            description: "A premier institution for talent and skill matching.",
            adminEmail: "admin@talentmatrix.edu"
        });

        // 3. Seed Users
        const admin = await User.create({
            name: "Main Admin",
            email: "admin@talentmatrix.edu",
            password: "adminpassword123", // In production, use hashing
            role: "admin",
            collegeId: "tm-uni"
        });

        const student1 = await User.create({
            name: "Alex Johnson",
            email: "alex@talentmatrix.edu",
            password: "password123",
            role: "student",
            collegeId: "tm-uni"
        });

        const student2 = await User.create({
            name: "Sam Smith",
            email: "sam@talentmatrix.edu",
            password: "password123",
            role: "student",
            collegeId: "tm-uni"
        });

        console.log('Users Seeded.');

        // 4. Seed Skills
        const skill1 = await Skill.create({
            userId: student1._id,
            skillName: "React.js",
            githubLink: "https://github.com/alex/react-app",
            certificate: "uploads/certs/react.pdf",
            status: "approved"
        });

        const skill2 = await Skill.create({
            userId: student1._id,
            skillName: "Node.js",
            githubLink: "https://github.com/alex/node-api",
            certificate: "uploads/certs/node.pdf",
            status: "pending"
        });

        const skill3 = await Skill.create({
            userId: student2._id,
            skillName: "Python",
            githubLink: "https://github.com/sam/python-scripts",
            certificate: "uploads/certs/python.pdf",
            status: "approved"
        });

        const skill4 = await Skill.create({
            userId: student2._id,
            skillName: "Tailwind CSS",
            githubLink: "",
            certificate: "uploads/certs/tailwind.pdf",
            status: "pending"
        });

        console.log('Skills Seeded.');

        // 5. Seed Collaborations
        await Collaboration.create({
            senderId: student1._id,
            receiverId: student2._id,
            message: "Hey Sam, let's work on a React-Python project!",
            skill: "Python",
            status: "pending"
        });

        await Collaboration.create({
            senderId: student2._id,
            receiverId: student1._id,
            message: "I need help with React styling.",
            skill: "React.js",
            status: "accepted"
        });

        console.log('Collaborations Seeded.');

        // 6. Seed Project
        await Project.create({
            projectName: "TalentMatrix Core",
            members: [student1._id, student2._id],
            progress: 45,
            status: "active"
        });

        console.log('Projects Seeded.');

        // 7. Seed Notifications
        await Notification.create({
            userId: admin._id,
            message: "System initialized with new seed data.",
            type: "system",
            role: "admin",
            read: false
        });

        await Notification.create({
            userId: student1._id,
            message: "Your React.js skill has been approved!",
            type: "skill",
            role: "student",
            read: true
        });

        console.log('Notifications Seeded.');

        console.log('Seeding Complete! 🚀');
        process.exit();
    } catch (error) {
        console.error('Seeding Error:', error);
        process.exit(1);
    }
};

seedData();
