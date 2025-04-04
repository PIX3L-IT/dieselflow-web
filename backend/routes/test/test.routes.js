const express = require("express");
const router = express.Router();
const testController = require("../../controller/test/test.controller");

// Ruta para listar y mostrar las imágenes
router.get("/get-test", testController.getTest);

module.exports = router;