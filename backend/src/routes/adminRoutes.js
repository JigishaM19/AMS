const express = require('express');
const router = express.Router();
const { getAllUsers, approveUser, deleteUser, resetPassword, bulkUploadStudents } = require('../controllers/adminController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // for CSV files

// User Management
router.get('/users', getAllUsers);
router.put('/approve/:id', approveUser);
router.delete('/delete/:id', deleteUser);
router.put('/reset-password/:id', resetPassword);
router.post('/bulk-upload', upload.single('file'), bulkUploadStudents);

module.exports = router;
