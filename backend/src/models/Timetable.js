const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  semester: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // coordinator
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Timetable', timetableSchema);
