const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Generate 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

exports.register = async (req, res) => {
  try {
    console.log("\n========== REGISTER START ==========");

    const { username, email, password } = req.body;

    console.log("Request Body:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    console.log("Checking existing user...");

    const userExists = await User.findOne({
      email: email.toLowerCase(),
    });

    if (userExists) {
      console.log("User already exists");
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    console.log("Generating OTP...");

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000;

    console.log("Creating user...");

    const user = await User.create({
      username: username.trim(),
      email: email.toLowerCase(),
      password,
      otp,
      otpExpiry,
    });

    console.log("✅ User created successfully");
    console.log("User ID:", user._id);

    console.log("\nCalling sendEmail()...");

    try {
      await sendEmail({
        email: user.email,              // ✅ use email
        subject: "Email Verification OTP",
        message: `Your OTP is ${otp}`,  // ✅ use message
      });

      console.log("✅ sendEmail() completed");
    } catch (err) {
      console.error("❌ sendEmail() failed");
      console.error(err.message);
      console.error(err.stack);
    }

    console.log("Sending API response...");
    console.log("========== REGISTER END ==========\n");

    res.status(201).json({
      message: "User registered successfully",
      userId: user._id,
      email: user.email,
    });

  } catch (err) {
    console.error("\n========== REGISTER ERROR ==========");
    console.error(err);
    console.error(err.stack);
    console.error("========== REGISTER ERROR END ==========\n");

    res.status(500).json({
      message: err.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required"
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "User already verified"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    if (Date.now() > user.otpExpiry.getTime()) {
      return res.status(400).json({
        message: "OTP expired"
      });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: "Email verified successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ 
        message: 'Please verify your email first',
        userId: user._id
      });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: 'Login successful!'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};