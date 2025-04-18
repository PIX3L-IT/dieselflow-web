const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.getOneUser(userId); // 🔁 usa método estático

    if (!user) {
      return res.status(404).render("includes/404", { active: "usuarios" });
    }

    const showModifyButton = user.idRole.roleName === "Conductor";

    res.render("users/user", {
      active: "usuarios",
      user,
      showModifyButton,
      username: req.user.username,
      lastname: req.user.lastname
    });

  } catch (error) {
    console.error("Error al consultar usuario:", error);
    res.status(500).render("includes/500", {
      active: "usuarios"
    });
  }
};
