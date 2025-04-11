exports.getNavbar = (req, res) => {
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
};

exports.getInputEmail = (req, res) => {
  res.render("includes/inputEmail", { active: "" });
};

exports.getInputPassword = (req, res) => {
  res.render("includes/inputPassword", { active: "" });
};

exports.getCard = (req, res) => {
  res.render("includes/card");
};

exports.getButton = (req, res) => {
  res.render("includes/button", { active: "" });
}