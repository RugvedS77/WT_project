// Backend Routes (shareRoutes.js)
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const shareController = require('../controllers/shareController');

router.post('/', verifyToken, shareController.sharePost);
module.exports = router;