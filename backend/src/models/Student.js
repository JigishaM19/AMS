const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  rollNumber: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  semester: { type: Number, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
