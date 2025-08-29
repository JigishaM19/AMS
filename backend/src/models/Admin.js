const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  adminLevel: { type: String, enum: ["super_admin", "admin"], default: "admin" },
  permissions: [{ type: String }],
  department: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
