const express = require("express");
const router = express.Router();
const componentController = require("../../controller/testing/componentController");

// Ruta para mostrar el componente
router.get("/navbar", componentController.getNavbar);
router.get("/inputEmail",componentController.getInputEmail);
router.get("/inputPassword",componentController.getInputPassword);

module.exports = router;