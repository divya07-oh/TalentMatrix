// Simulated database for project workspaces
// Fields: id, projectName, members (array of userIds), progress (number %), status (active/completed)
const mockProjects = [
  {
    id: 1,
    projectName: "TalentMatrix Frontend Refactor",
    members: ["s-1712156828551"], // Example existing user
    progress: 45,
    status: "active"
  }
];

module.exports = mockProjects;
