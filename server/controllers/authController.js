const User = require('../models/User');
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
}

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    const displayName = username || name;
    const normalizedEmail = email?.trim().toLowerCase();

    if (!displayName || !normalizedEmail || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    if (normalizedEmail && !normalizedEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    if (displayName.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters long' });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const otp = generateOtp();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    const user = await User.create({
      username: displayName.trim(),
      email: normalizedEmail,
      password,
      otp,
      otpExpiry
    });

    // OTP Sending logic
    try {
      await sendEmail({
        to: normalizedEmail,
        subject: 'Your OTP Code for AI COLD MAIL GENERATOR',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`
      })
    } catch (error) {
      await User.findByIdAndDelete(user._id);
      console.error({ message: 'Error sending OTP email:', error: error.message });
      return res.status(500).json({
        message: 'We could not send your OTP email. Please check the email service configuration and try again.',
        error: error.message,
      });
    }

    res.status(201).json({
      message: 'User registered successfully',
      userId: user._id,
      user: { username: user.username, email: user.email },
    });

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Please provide both email and OTP' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
      message: 'Email verified successfully',
    });

  } catch (error) {
    return res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};


exports.login = async (req, res) => {
  try {

    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(401).json({ success: false, message: "Please verify your email first" });
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