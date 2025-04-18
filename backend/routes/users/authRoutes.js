const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const {
  getProtected,
  refreshAccessToken
} = require('../../controller/users/authController');

// GET /auth/protected
router.get('/protected', verifyToken, getProtected);

// POST /auth/refresh
router.post('/refresh', refreshAccessToken);

module.exports = router;