const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
require('dotenv').config();

const app = express();


connectDB();

// Middleware
app.use(cors());                          
app.use(express.json());                  
app.use(express.urlencoded({ extended: true })); 

// Import Routes
const authRoutes = require('./src/routes/authRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const coordinatorRoutes = require('./src/routes/coordinatorRoutes');
const hodRoutes = require('./src/routes/hodRoutes');
const parentRoutes = require('./src/routes/parentRoutes');
const studentRoutes = require('./src/routes/studentRoutes');
const teacherRoutes = require('./src/routes/teacherRoutes');

// Root route (for quick check in browser)
app.get('/', (req, res) => {
  res.send('🚀 ABAMS Backend is Running!');
});

// Public routes
app.use('/api/auth', authRoutes);

// Role-based routes
app.use('/api/admin', adminRoutes);
app.use('/api/hod', hodRoutes);
app.use('/api/coordinator', coordinatorRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/parent', parentRoutes);
app.use('/api/student', studentRoutes);

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
