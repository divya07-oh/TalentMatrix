const mockNotifications = require('./mockNotifications');

/**
 * Reusable utility to create and push a notification
 * @param {number|string} userId - ID of the user receiving the notification
 * @param {string} message - Notification content
 * @param {string} type - 'skill', 'collaboration', 'system'
 * @param {string} role - 'admin', 'student'
 */
const addNotification = (userId, message, type, role) => {
  const newNotification = {
    id: mockNotifications.length > 0 ? mockNotifications[mockNotifications.length - 1].id + 1 : 1,
    userId: userId.toString(), 
    message,
    type,
    role,
    isRead: false,
    createdAt: new Date().toISOString()
  };

  mockNotifications.push(newNotification);
  return newNotification;
};

module.exports = {
  addNotification
};
