const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true },
  hodId: { type: mongoose.Schema.Types.ObjectId, ref: "HOD" }
}, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);
