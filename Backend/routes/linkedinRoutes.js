const express = require('express');
const router = express.Router();
const linkedinController = require('../controllers/linkedinController');

router.get('/auth', linkedinController.getLinkedInAuthUrl);
router.post('/callback', linkedinController.handleCallback);

module.exports = router;
