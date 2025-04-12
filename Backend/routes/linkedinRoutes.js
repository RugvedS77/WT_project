const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const linkedinController = require('../controllers/linkedinController');

// LinkedIn authentication and posting routes
router.get('/auth', linkedinController.getLinkedInAuthUrl);
router.get('/callback', linkedinController.handleLinkedInCallback);
router.post('/post', verifyToken, linkedinController.createLinkedInPost);

module.exports = router;
