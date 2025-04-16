const express = require('express');
const router = express.Router();

const {
    getFilters,
    //postReport
  } = require('../../controller/reports/reportController');


// GET
router.get('/', getFilters);

// POST /reports/generate
//router.post('/reports/generate', postReport);

module.exports = router;