const express = require("express");
const router = express.Router();
const userController = require("../../controller/users/userController");
const recoveryPasswordController = require("../../controller/users/recoveryPasswordController");

router.get("/confirm-email", recoveryPasswordController.getConfirmEmail);

router.post("/confirm-email", recoveryPasswordController.postConfirmEmail);

router.get("/reset-password", recoveryPasswordController.getResetPassword);

router.post("/reset-password", recoveryPasswordController.postResetPassword);

router.get("/", userController.getAllUsers);

module.exports = router;
