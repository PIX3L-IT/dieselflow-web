const express = require('express');
const router = express.Router();

const {
    getFilters,
    postReport
  } = require('../../controller/reports/reportController');


// GET
router.get('/', getFilters);

// POST /reports/generate
router.post('/generate', postReport);

module.exports = router;