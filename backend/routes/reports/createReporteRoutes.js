const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const reportController = require('../../controller/reports/registerController');

// POST /login
router.post('/report', verifyToken, reportController.createReport);

module.exports = router;