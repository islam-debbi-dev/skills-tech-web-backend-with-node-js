const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user-model');
const router = express.Router();

// Register new user
router.post('/register',
  [
    body('username').isLength({ min: 3 }),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['student', 'teacher']),
    body('fullName').notEmpty()
  ],
  async (req, res) => {
    try {
     
      const { username, password, role, fullName, studentId } = req.body;

      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      const user = await User.create({
        username,
        password,
        role,
        fullName,
        studentId: role === 'student' ? studentId : undefined
      });

      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          fullName: user.fullName
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);

// Login
router.post('/login',
  [
    body('username').notEmpty(),
    body('password').notEmpty()
  ],
  async (req, res) => {
    try {
      const { username, password } = req.body;
        console.log(username + password);
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      
      if (!user.password === password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          fullName: user.fullName
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
);


module.exports = router;