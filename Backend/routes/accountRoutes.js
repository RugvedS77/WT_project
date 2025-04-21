const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const accountController = require('../controllers/AccountController');

// Corrected routes
router.get('/connected', verifyToken, accountController.getConnectedAccounts);
router.get('/count', verifyToken, accountController.getConnectedPlatformCount);
router.get('/dictionary', verifyToken, accountController.getPlatformDictionary);

// Keep other routes
router.get('/', verifyToken, accountController.getAccounts);
router.post('/link', verifyToken, accountController.linkAccount);
router.post('/disconnect', verifyToken, accountController.disconnectAccount);

module.exports = router;