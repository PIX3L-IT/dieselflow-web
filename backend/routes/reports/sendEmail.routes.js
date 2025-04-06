const express = require("express");
const router = express.Router();
const sendEmailController = require("../../controller/reports/sendEmail.controller");

// Ruta enviar correo
router.get("/", sendEmailController.get_sendEmail);
router.post("/", sendEmailController.post_sendEmail);

module.exports = router;
