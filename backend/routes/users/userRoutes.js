const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../../controller/users/userController");
const recoveryPasswordController = require("../../controller/users/recoveryPasswordController");

router.get("/users", getAllUsers);

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

router.get("/users/confirm-email", recoveryPasswordController.getConfirmEmail);

router.post("/users/confirm-email", recoveryPasswordController.postConfirmEmail);

router.get("/users/reset-password", recoveryPasswordController.getResetPassword);

router.post("/users/reset-password", recoveryPasswordController.postResetPassword);

module.exports = router;
