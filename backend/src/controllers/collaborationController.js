const mockCollaborations = require('../utils/mockCollaborations');
const mockUsers = require('../utils/mockUsers');
const { addNotification } = require('../utils/notificationService');

// POST /api/collaboration/send
// Send a collaboration request
exports.sendRequest = (req, res) => {
  const { senderId, receiverId, message } = req.body;

  // Validate required fields
  if (!senderId || !receiverId) {
    return res.status(400).json({ message: "senderId and receiverId are required." });
  }

  // Prevent self-request
  if (senderId.toString() === receiverId.toString()) {
    return res.status(400).json({ message: "Cannot send a collaboration request to yourself." });
  }

  // Validate users exist
  const senderUser = mockUsers.find(u => u.id.toString() === senderId.toString());
  const receiverUser = mockUsers.find(u => u.id.toString() === receiverId.toString());

  if (!senderUser) {
    return res.status(404).json({ message: "Sender not found." });
  }
  if (!receiverUser) {
    return res.status(404).json({ message: "Receiver not found." });
  }

  // Prevent duplicate requests (if there is already a pending or accepted request between them)
  const existingRequest = mockCollaborations.find(collab => {
    const isMatched = (
      (collab.senderId.toString() === senderId.toString() && collab.receiverId.toString() === receiverId.toString()) ||
      (collab.senderId.toString() === receiverId.toString() && collab.receiverId.toString() === senderId.toString())
    );
    return isMatched && (collab.status === 'pending' || collab.status === 'accepted');
  });

  if (existingRequest) {
    return res.status(400).json({ message: "A collaboration request already exists between these users." });
  }

  // Create new request
  const newRequest = {
    id: mockCollaborations.length > 0 ? mockCollaborations[mockCollaborations.length - 1].id + 1 : 1,
    senderId,
    receiverId,
    message: message || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    isAdminInvite: senderUser.role === 'admin'
  };

  mockCollaborations.push(newRequest);

  // Trigger Notifications
  addNotification(1, "A new collaboration request was created", "collaboration", "admin");
  addNotification(receiverId, "You received a collaboration request", "collaboration", "student");

  return res.status(201).json({
    message: "Collaboration request sent successfully.",
    data: newRequest
  });
};

// GET /api/collaboration/user/:userId
// Return sent and received requests, sorted latest first
exports.getUserRequests = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Verify user exists (optional, but good practice)
  const user = mockUsers.find(u => u.id.toString() === userId.toString());
  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  const userRequests = mockCollaborations.filter(collab => 
    collab.senderId.toString() === userId.toString() || 
    collab.receiverId.toString() === userId.toString()
  );

  // Categorize
  const sent = userRequests.filter(req => req.senderId.toString() === userId.toString());
  const received = userRequests.filter(req => req.receiverId.toString() === userId.toString());

  // Sort by date descending (latest first)
  const sortByDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  sent.sort(sortByDate);
  received.sort(sortByDate);

  return res.status(200).json({
    message: "User collaboration requests retrieved successfully.",
    data: {
      sent,
      received
    }
  });
};

// PUT /api/collaboration/respond/:id
// Accept or reject a request
exports.respondToRequest = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['accepted', 'rejected'].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Must be 'accepted' or 'rejected'." });
  }

  const requestIndex = mockCollaborations.findIndex(collab => collab.id.toString() === id.toString());

  if (requestIndex === -1) {
    return res.status(404).json({ message: "Collaboration request not found." });
  }

  // Optional: check if already accepted/rejected
  if (mockCollaborations[requestIndex].status !== 'pending') {
    return res.status(400).json({ message: `Request has already been ${mockCollaborations[requestIndex].status}.` });
  }

  mockCollaborations[requestIndex].status = status;

  if (status === 'accepted') {
    addNotification(mockCollaborations[requestIndex].senderId, "Your collaboration request was accepted", "collaboration", "student");
  }

  return res.status(200).json({
    message: `Collaboration request ${status}.`,
    data: mockCollaborations[requestIndex]
  });
};
