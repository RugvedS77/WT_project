const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/google', authController.googleAuth);
router.post('/login', authController.localAuth);

module.exports = router;