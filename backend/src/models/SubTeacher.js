const mongoose = require("mongoose");

const subTeacherSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }]
}, { timestamps: true });

module.exports = mongoose.model("SubTeacher", subTeacherSchema);
