const express = require("express");
const router = express.Router();
const fetchController = require("../../controller/images/fetchController");
const fetchJSONController = require("../../controller/images/fetchJSONController");

// Ruta para listar y mostrar las imágenes
router.get("/list_images", fetchController.listImages);
router.get("/list_json", fetchJSONController.listImagesJson);

module.exports = router;
