const express = require('express');
const router = express.Router();
const controller = require('../../controller/users/statisticsDriverController');
const verifyToken = require('../../utils/verifyToken'); 

router.get('/:id', verifyToken, controller.getDriver);
router.get('/page/:id/reports', verifyToken, controller.getPaginated);

module.exports = router;
