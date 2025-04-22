// authController.js

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('../models/User');
const Account = require('../models/Account'); // Model for accounts
const AccountController = require('./AccountController'); // In case needed

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { credential, username: requestedUsername } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    const username = requestedUsername || email.split('@')[0];

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        username,
        email,
        name,
        avatar: picture,
        provider: 'google',
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
        name: user.name,
      },
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

exports.localAuth = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Local Login attempt:", { username });

    const user = await User.findOne({ username });
    console.log("User found in database:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or user not found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials or user not found',
      });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
      },
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error('Local auth error:', error);
    res.status(500).json({ success: false, message: 'Authentication failed' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    console.log('Registration attempt with:', { username, email });

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log('New user created:', newUser);

    // Create a default account
    const defaultAccount = new Account({
      userId: newUser._id,
      username: newUser.username,
      platform: 'default',
      isConnected: false,
    });

    await defaultAccount.save();

    res.status(201).json({
      success: true,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      redirect: "/dashboard",
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
    });
  }
};
