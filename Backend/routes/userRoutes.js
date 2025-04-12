// Backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const userController = require('../controllers/userController');

router.get('/userData', verifyToken, userController.getUserData);
router.put('/userData', verifyToken, userController.updateUserData);
router.post('/uploadPhoto', verifyToken, userController.uploadPhoto);

// Fetch current password
router.get('/currentPassword', verifyToken, userController.getCurrentPassword);

// Change password
router.put('/changePassword', verifyToken, userController.changePassword);

// Preferences routes
router.get('/preferences', verifyToken, userController.getPreferences);
router.put('/preferences', verifyToken, userController.updatePreferences);

module.exports = router;