exports.getNavbar = (req, res) => {
  // Enviar la lista de URLs firmadas al cliente
  res.render("includes/navbar", { active: "" });
};

exports.getModal = (req, res) => {
  res.render("testing/modalTest");
};

exports.getSwitch = (req, res) => {
  res.render("includes/switch");
};

exports.getText = (req, res) => {
  res.render("includes/texto");
}
