const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  occupation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Parent", parentSchema);
