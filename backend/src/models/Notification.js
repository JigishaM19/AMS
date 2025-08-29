const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  role: { type: String, enum: ['admin', 'hod', 'coordinator', 'subTeacher', 'student', 'parent'], required: true },
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  sentAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
