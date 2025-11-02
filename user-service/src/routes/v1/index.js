const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const upload = require("../../middleware/multer")

// Base paths
router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
