const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');

const {
    getFilters,
    postReport
  } = require('../../controller/reports/reportController');


// GET
router.get('/', verifyToken, getFilters);

// POST /reportes/generar
router.post('/generar', verifyToken, postReport);

module.exports = router;