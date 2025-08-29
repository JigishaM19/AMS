const User = require("../models/User");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const csvParser = require("csv-parser");
const fs = require("fs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.approveUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isApproved = true;
    await user.save();
    res.json({ message: "User approved", user });
  } catch (error) {
    res.status(500).json({ message: "Error approving user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newPassword = "ABAMS123"; // default reset password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password reset successfully", newPassword });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.bulkUploadStudents = async (req, res) => {
  try {
    const filePath = req.file.path; // CSV upload middleware needed
    const students = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => {
        students.push({
          fullName: row.fullName,
          email: row.email,
          role: "student",
        });
      })
      .on("end", async () => {
        await User.insertMany(students);
        res.json({ message: "Bulk upload successful", count: students.length });
      });
  } catch (error) {
    res.status(500).json({ message: "Error uploading students" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();

    res.json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating role" });
  }
};
