const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Student = require('../models/Student');
const Parent = require('../models/Parent');
const SubTeacher = require('../models/SubTeacher');
const Admin = require('../models/Admin');
const Coordinator = require('../models/Coordinator');

// ======================== LOGIN ========================
const login = async (req, res) => {
  try {
    const { userId, password, userType } = req.body;

    // Find user
    const user = await User.findOne({ username: userId });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let userRole = user.userType;
    let additionalData = {};

    if (user.userType === 'subteacher') {
      const teacher = await SubTeacher.findOne({ userId: user._id });
      if (teacher) {
        if (userType === 'hod' && teacher.roles.isHOD) {
          userRole = 'hod';
        } else if (userType === 'coordinator' && teacher.roles.isClassCoordinator) {
          userRole = 'coordinator';
        } else if (userType === 'subteacher' && teacher.roles.isSubjectTeacher) {
          userRole = 'subteacher';
        } else {
          return res.status(401).json({ message: 'You do not have permission for this role' });
        }
        additionalData.teacherRoles = teacher.roles;
      }
    } else {
      if (userType !== user.userType) {
        return res.status(401).json({ message: 'Invalid user type for this account' });
      }
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: userRole },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1d" }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        loginRole: userRole,
        ...additionalData,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// ======================== REGISTER ========================
const register = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      fullName,
      mobileNumber,
      userType,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      fullName,
      mobileNumber,
      userType,
    });

    const savedUser = await newUser.save();

    let specificUserRecord;
    switch (userType) {
      case 'student':
        specificUserRecord = new Student({ userId: savedUser._id, studentId: `STD${Date.now()}` });
        break;
      case 'parent':
        specificUserRecord = new Parent({ userId: savedUser._id });
        break;
      case 'subteacher':
        specificUserRecord = new SubTeacher({ userId: savedUser._id, employeeId: `EMP${Date.now()}`, roles: { isSubjectTeacher: true } });
        break;
      case 'hod':
        specificUserRecord = new SubTeacher({ userId: savedUser._id, employeeId: `EMP${Date.now()}`, roles: { isHOD: true } });
        break;
      case 'coordinator':
        specificUserRecord = new SubTeacher({ userId: savedUser._id, employeeId: `EMP${Date.now()}`, roles: { isClassCoordinator: true } });
        break;
      case 'admin':
        specificUserRecord = new Admin({ userId: savedUser._id });
        break;
    }

    if (specificUserRecord) await specificUserRecord.save();

    res.status(201).json({
      message: 'Registration successful',
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        fullName: savedUser.fullName,
        userType: savedUser.userType,
      },
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

module.exports = { login, register };
