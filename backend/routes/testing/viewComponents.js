const express = require("express");
const router = express.Router();
const componentController = require("../../controller/images/fetchController");

// Ruta para mostrar el componente
router.get("/navbar", componentController.navbar);

module.exports = router;