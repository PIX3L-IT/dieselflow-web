const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../../controller/users/userController");

router.get("/", getAllUsers);

module.exports = router;
