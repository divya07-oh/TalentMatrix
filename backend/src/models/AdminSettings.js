const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  collegeDomain: { type: String, required: true },
  description: { type: String, default: "" },
  adminEmail: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('AdminSettings', adminSettingsSchema);
