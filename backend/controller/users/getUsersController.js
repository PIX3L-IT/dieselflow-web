const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('idRole').exec();
    return res.status(200).render('users/users', { users: users });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return res.status(500).render('includes/500', {
      active: ""
    });
  }
}

