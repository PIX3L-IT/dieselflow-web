const express = require("express");
const router = express.Router();
const fetchController = require("../../controller/images/fetchController");

// Ruta para listar y mostrar las imágenes
router.get("/list_images", fetchController.listImages);

module.exports = router;
