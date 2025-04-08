const express = require("express");
const router = express.Router();
const componentController = require("../../controller/testing/componentController");

// Ruta para mostrar navbar
router.get("/navbar", componentController.getNavbar);

// Ruta para mostrar modal
router.get("/modal", componentController.getModal);

// Ruta para mostrar switch
router.get("/switch", componentController.getSwitch);

module.exports = router;
