const Notification = require('../models/Notification');
const User = require('../models/User');

/**
 * Reusable utility to create and push a notification
 * @param {string} userId - Mongo ID or "admin" string
 * @param {string} message - Notification content
 * @param {string} type - 'skill', 'collaboration', 'system'
 * @param {string} role - 'admin', 'student'
 */
const addNotification = async (userId, message, type, role) => {
  try {
    let targetUserId = userId;

    // Resolve "admin" string to actual Admin User ID
    if (userId === "admin") {
      const adminUser = await User.findOne({ role: 'admin' });
      if (adminUser) {
        targetUserId = adminUser._id;
      } else {
        console.warn("Notification Warning: No admin user found in database to receive system alert.");
        return null; // Don't crash, but can't save without a valid ID
      }
    }

    const newNotification = new Notification({
      userId: targetUserId,
      message,
      type,
      role,
      read: false
    });

    await newNotification.save();
    return newNotification;
  } catch (error) {
    console.error("Notification Service Error:", error);
    return null;
  }
};

module.exports = {
  addNotification
};
