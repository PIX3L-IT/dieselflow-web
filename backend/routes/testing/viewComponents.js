const express = require("express");
const router = express.Router();
const componentController = require("../../controller/testing/componentController");

// Ruta para mostrar el componente
router.get("/navbar", componentController.getNavbar);

module.exports = router;