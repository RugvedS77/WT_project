const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const accountController = require('../controllers/AccountController');

router.get('/', verifyToken, accountController.getAccounts);
router.post('/link', verifyToken, accountController.linkAccount);
router.post('/connect', verifyToken, accountController.linkAccount); // Ensure this calls linkAccount
router.post('/disconnect', verifyToken, accountController.disconnectAccount); // Ensure this calls disconnectAccount
router.get('/connected', verifyToken, accountController.getConnectedAccounts);
router.get('/platform-dictionary', verifyToken, accountController.getPlatformDictionary);
router.get('/connected-count', verifyToken, accountController.getConnectedPlatformCount);

module.exports = router;
