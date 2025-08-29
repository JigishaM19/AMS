// src/routes/hodRoutes.js
const express = require('express');
const router = express.Router();

router.get('/dashboard/hod/:id', (req, res) => {
  res.json({ message: `HOD dashboard for id ${req.params.id}` });
});



module.exports = router;
