const express = require("express");
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const { getUsers } = require("../../controller/users/getUsersController");
const recoveryPasswordController = require("../../controller/users/recoveryPasswordController");

router.get("/usuarios", verifyToken, getUsers);

router.get("/users/search", async (req, res) => {
  const normalizeText = (str) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const q = normalizeText(req.query.q || "");
  
  const mockUsers = [
    { name: "Mónica Martínez"},
    { name: "Rommel Torres"},
    { name: "Gabriel Delfín"},
    { name: "Gabriel Juan"},
    { name: "Ethan Luna"},
  ];
  
  const results = mockUsers.filter(
    (user) =>
      normalizeText(user.name).startsWith(q)
  );
  
  res.json({ results });
});  

router.get("/usuarios/confirmar-email", recoveryPasswordController.getConfirmEmail);

router.post("/usuarios/confirmar-email", recoveryPasswordController.postConfirmEmail);

router.get("/usuarios/restablecer-contrasenia", recoveryPasswordController.getResetPassword);

router.post("/usuarios/restablecer-contrasenia", recoveryPasswordController.postResetPassword);

module.exports = router;
