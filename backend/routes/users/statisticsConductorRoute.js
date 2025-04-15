const express = require('express');
const router = express.Router();
const controller = require('../../controller/users/statisticsDriverController');

router.get('/:id', controller.getDriver);

router.get('/page/:id/reports', controller.getPaginated);

module.exports = router;
