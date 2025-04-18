const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("idRole");

    if (!user) {
      return res.status(404).render("includes/404", { active: "usuarios" });
    }

    const showModifyButton = user.idRole.roleName === "Conductor";

    res.render("users/user", {
      active: "usuarios",
      user,
      showModifyButton,
    });

  } catch (error) {
    console.error("Error al consultar usuario:", error);
    res.status(500).send("Error del servidor");
  }
};

module.exports = { getUser };

