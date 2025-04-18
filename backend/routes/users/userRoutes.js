const express = require("express");
const router = express.Router();
const verifyToken = require('../../utils/verifyToken');
const { getUsers } = require("../../controller/users/getUsersController");
const { getUser } = require("../../controller/users/getUserController");

router.get("/usuarios", getUsers);

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

router.get("/usuarios/:id", getUser);

module.exports = router;
