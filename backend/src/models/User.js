const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
  },
  password: { type: String, required: true, minlength: 6 },
  fullName: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, match: [/^\d{10}$/, "Must be 10 digits"] },
  userType: { 
    type: String, 
    required: true, 
    enum: ["student", "parent", "subteacher", "hod", "coordinator", "admin"] 
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
