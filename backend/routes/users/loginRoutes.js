const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const loginController = require('../../controller/users/loginController');

// POST /login
router.post('/tablero', loginController.postLogin);

router.get('/login',loginController.getLogin);

module.exports = router;

