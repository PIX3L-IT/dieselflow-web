const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const {
  loginUser,
} = require('../../controller/users/loginController');

// POST /login
router.post('/dashboard', loginUser);

module.exports = router;

