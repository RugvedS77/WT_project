// routes/welcomeRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const welcomeController = require('../controllers/welcomeController');

// Define the route for fetching welcome data
router.get('/', verifyToken, welcomeController.getWelcomeData);

module.exports = router;