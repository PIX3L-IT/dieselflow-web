const express = require('express');
const router = express.Router();
const verifyToken = require('../../../frontend-web/utils/verifyToken');
const {
  registerUser,
  loginUser,
  getProtected,
  refreshToken
} = require('../../controller/users/authController');

// POST /api/register
router.post('/register', registerUser);

// POST /api/login
router.post('/login', loginUser);

// GET /api/protected
router.get('/protected', verifyToken, getProtected);

// POST /api/refresh
router.post('/refresh', refreshToken);

module.exports = router;

