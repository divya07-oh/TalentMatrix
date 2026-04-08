const Notification = require('../models/Notification');

// GET /api/notifications/:userId
exports.getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notifications retrieved successfully.",
      userNotifications: notifications
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ message: "Internal server error retrieving notifications." });
  }
};

// PUT /api/notifications/read/:id
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Protocol error: Target notification not found." });
    }

    res.status(200).json({
      message: "Notification status updated to read.",
      notification: updated
    });
  } catch (error) {
    console.error("Mark Notification Read Error:", error);
    res.status(500).json({ message: "Internal server error marking notification as read." });
  }
};

// DELETE /api/notifications/:id (NEW)
exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found." });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted"
    });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ message: "Internal server error deleting notification." });
  }
};

// DELETE /api/notifications/clear/:userId
exports.clearNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    await Notification.deleteMany({ userId });

    res.status(200).json({
      message: "Notification sector cleared successfully."
    });
  } catch (error) {
    console.error("Clear Notifications Error:", error);
    res.status(500).json({ message: "Internal server error clearing notifications." });
  }
};
