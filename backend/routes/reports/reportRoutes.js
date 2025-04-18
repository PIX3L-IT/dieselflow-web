const express = require('express');
const router = express.Router();

const {
    getFilters,
    postReport
  } = require('../../controller/reports/reportController');


// GET
router.get('/', getFilters);

// POST /reportes/generar
router.post('/generar', postReport);

module.exports = router;