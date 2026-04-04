const mockNotifications = require('../utils/mockNotifications');

// GET /api/notifications/:userId
exports.getNotifications = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const userNotifications = mockNotifications.filter(n => n.userId === userId.toString());

  // Sort latest first
  userNotifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return res.status(200).json({
    message: "Notifications retrieved successfully.",
    data: userNotifications
  });
};

// PUT /api/notifications/read/:id
exports.markAsRead = (req, res) => {
  const { id } = req.params;

  const notifIndex = mockNotifications.findIndex(n => n.id.toString() === id.toString());

  if (notifIndex === -1) {
    return res.status(404).json({ message: "Notification not found." });
  }

  mockNotifications[notifIndex].isRead = true;

  return res.status(200).json({
    message: "Notification marked as read.",
    data: mockNotifications[notifIndex]
  });
};

// DELETE /api/notifications/clear/:userId
exports.clearNotifications = (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  // Remove all matching notifications by mutating original array length and filtering
  let initialLength = mockNotifications.length;
  
  // We have to filter the array in place or reassign (since it's a const array, we splice)
  for (let i = mockNotifications.length - 1; i >= 0; i--) {
      if (mockNotifications[i].userId === userId.toString()) {
          mockNotifications.splice(i, 1);
      }
  }

  let finalLength = mockNotifications.length;

  if (initialLength === finalLength) {
    return res.status(200).json({ message: "No notifications to clear." });
  }

  return res.status(200).json({
    message: "Notifications cleared successfully."
  });
};
