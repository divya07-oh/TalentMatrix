// Simulated database for skills
const mockSkills = [
  {
    id: 1,
    userId: "s-1712156828551", // Example mock student ID
    skillName: "React.js",
    certificateFile: "uploads/sample-cert1.pdf",
    projectRepoLink: "https://github.com/alex-mit/react-dashboard",
    status: "approved"
  },
  {
    id: 2,
    userId: "s-1712156828551",
    skillName: "Node.js",
    certificateFile: "uploads/sample-cert2.pdf",
    projectRepoLink: "https://github.com/alex-mit/node-api",
    status: "pending"
  },
  {
    id: 3,
    userId: "s-1712156828552", // Another mock student ID
    skillName: "Python",
    certificateFile: "uploads/sample-cert3.pdf",
    projectRepoLink: "https://github.com/alex-mit/python-data",
    status: "rejected"
  }
];

module.exports = mockSkills;
