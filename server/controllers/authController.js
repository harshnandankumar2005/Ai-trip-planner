import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { getMongoStatus } from '../config/db.js';
import { fileDb } from '../services/storageService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tripwise_jwt_secret_key_987654321_secure';

const generateToken = (userId, email, name) => {
  return jwt.sign({ id: userId, email, name }, JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (getMongoStatus()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }
      const newUser = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      const token = generateToken(newUser._id.toString(), newUser.email, newUser.name);
      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser._id.toString(), name: newUser.name, email: newUser.email },
      });
    } else {
      const existing = fileDb.findUserByEmail(email);
      if (existing) {
        return res.status(400).json({ success: false, message: 'User with this email already exists.' });
      }
      const newUser = fileDb.createUser({
        name,
        email,
        password: hashedPassword,
      });
      const token = generateToken(newUser._id, newUser.email, newUser.name);
      return res.status(201).json({
        success: true,
        token,
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    let user;
    if (getMongoStatus()) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = fileDb.findUserByEmail(email);
    }

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const id = user._id ? user._id.toString() : user.id;
    const token = generateToken(id, user.email, user.name);

    res.json({
      success: true,
      token,
      user: { id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
};

export const getMe = async (req, res) => {
  try {
    let user;
    if (getMongoStatus()) {
      user = await User.findById(req.user.id).select('-password');
    } else {
      user = fileDb.findUserById(req.user.id);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const id = user._id ? user._id.toString() : user.id;
    res.json({
      success: true,
      user: { id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve profile.' });
  }
};
