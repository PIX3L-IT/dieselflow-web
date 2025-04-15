const express = require("express");
const router = express.Router();
const userController = require("../../controller/users/userController");

router.get("/confirm-email", userController.getConfirmEmail);

router.get("/reset-password", userController.getResetPassword);

router.get("/", userController.getAllUsers);

module.exports = router;
