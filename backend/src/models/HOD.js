const mongoose = require("mongoose");

const hodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" }
}, { timestamps: true });

module.exports = mongoose.model("HOD", hodSchema);
