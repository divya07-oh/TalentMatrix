const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  message: { type: String, default: "" },
  skill: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Collaboration', collaborationSchema);
