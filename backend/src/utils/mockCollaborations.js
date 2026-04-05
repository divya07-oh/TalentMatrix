// Simulated database for collaboration requests
// Fields: id, senderId, receiverId, message, status (pending/accepted/rejected), createdAt, isAdminInvite
const mockCollaborations = [
  {
    id: 1,
    senderId: "s-1712156828551", // Alex
    receiverId: "s-1712156828552", // Sam
    message: "I'm looking for a partner for the architectural design competition. Interested?",
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    isAdminInvite: false
  },
  {
    id: 2,
    senderId: "s-1712156828552", // Sam
    receiverId: "s-1712156828551", // Alex
    message: "Hey, I saw your profile and thought we could collaborate on the urban planning project.",
    status: 'accepted',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    isAdminInvite: false
  },
  {
    id: 3,
    senderId: 1, // Admin
    receiverId: "s-1712156828551", // Alex
    message: "We'd like to invite you to join the official TalentMatrix ambassador program.",
    status: 'pending',
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    isAdminInvite: true
  }
];

module.exports = mockCollaborations;

