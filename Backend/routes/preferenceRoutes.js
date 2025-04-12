// Backend/routes/preferenceRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const preferenceController = require('../controllers/preferenceController');

router.get('/preferences', verifyToken, preferenceController.getUserPreferences);
router.put('/preferences', verifyToken, preferenceController.updateUserPreferences);

module.exports = router;