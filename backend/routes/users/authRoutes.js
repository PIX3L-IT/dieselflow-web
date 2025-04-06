const express = require('express');
const router = express.Router();
const verifyToken = require('../../../frontend-web/utils/verifyToken');
const {
  registerUser,
  loginUser,
  getProtected,
  refreshToken,
  login
} = require('../../controller/users/authController');

// POST /api/register
router.post('/register', registerUser);

// POST /api/login
router.post('/login', loginUser);

// GET /api/protected
router.get('/protected', verifyToken, getProtected);

// POST /api/refresh
router.post('/refresh', refreshToken);

// GET
router.get('/login', login);

module.exports = router;

