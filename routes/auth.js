const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

// Public
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);

// Protected
router.get('/protected', protect, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

module.exports = router;
