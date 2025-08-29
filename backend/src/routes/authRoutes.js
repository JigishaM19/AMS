const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

// Register
router.post('/register', register);

// Login
router.post('/login', login);

module.exports = router;
