const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { type: String, enum: ['skill', 'collaboration', 'system'], default: 'system' },
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
