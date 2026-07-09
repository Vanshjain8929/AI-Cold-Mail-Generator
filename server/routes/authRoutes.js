const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//Register new user
router.post('/register', authController.register);


//Login user
router.post('/login', authController.login);

//verify otp
router.post('/verify-otp', authController.verifyOtp);

module.exports = router;
