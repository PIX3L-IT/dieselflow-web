const express = require("express");
const router = express.Router();
const componentController = require("../../controller/testing/componentController");

// Ruta para mostrar navbar
router.get("/navbar", componentController.getNavbar);
router.get("/inputEmail",componentController.getInputEmail);
router.get("/inputPassword",componentController.getInputPassword);

// Ruta para mostrar tablas
router.get('/simple-table', componentController.renderUnitsClassic);
router.get('/data-table', componentController.renderUsersDatatable);

// Ruta para mostrar modal
router.get("/modal", componentController.getModal);

// Ruta para mostrar switch
router.get("/switch", componentController.getSwitch);

// Ruta para mostrar texto
router.get("/text", componentController.getText);

// Ruta para mostrar card
router.get("/card", componentController.getCard);

//Ruta para mostrar L=loader
router.get("/loader", componentController.getLoader);

//Ruta para mostrar index
router.get("/index", componentController.getIndex);

// Ruta para mostrar boton estándar
router.get("/button", componentController.getButton);

// Ruta para mostrar subtitulos
router.get("/subtitle", componentController.getSubtitle);

// Ruta para mostrar el botón de estadísticas
router.get("/statsButton", componentController.getStatsButton);

// Ruta para mostrar 404
router.get("/404", componentController.get404);

// Ruta para mostrar backArrow
router.get("/backArrow", componentController.getBackArrow);

// Ruta para mostrar searchbar
router.get("/searchbar-users", componentController.getSearchbarUsers);
router.get("/searchbar-units", componentController.getSearchbarUnits);

// Ruta para mostrar texto input
router.get("/input", componentController.getInput);

// Ruta para mostrar no data banner
router.get("/noDataBanner",componentController.getNoDataBanner);

// Ruta para mostrar el header
router.get("/header", componentController.getHeader);

module.exports = router;