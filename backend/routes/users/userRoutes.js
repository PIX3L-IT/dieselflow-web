const express = require("express");
const router = express.Router();
const { getUsers } = require("../../controller/users/userController");

router.get("/", getUsers);

module.exports = router;

router.get("/search", async (req, res) => {
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

module.exports = router;
