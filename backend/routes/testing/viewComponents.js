const express = require("express");
const router = express.Router();
const componentController = require("../../controller/testing/componentController");

// Ruta para mostrar navbar
router.get("/navbar", componentController.getNavbar);
router.get("/inputEmail",componentController.getInputEmail);
router.get("/inputPassword",componentController.getInputPassword);

// Ruta para mostrar modal
router.get("/modal", componentController.getModal);

// Ruta para mostrar switch
router.get("/switch", componentController.getSwitch);

// Ruta para mostrar texto
router.get("/text", componentController.getText);

// Ruta para mostrar card
router.get("/card", componentController.getCard);

// Ruta para mostrar boton estándar
router.get("/button", componentController.getButton);

// Ruta para mostrar subtitulos
router.get("/subtitle", componentController.getSubtitle);

// Ruta para mostrar 404
router.get("/404", componentController.get404);
module.exports = router;
