const User = require("../../models/users/User");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).render('includes/500',{
      active: "" 
    });
  }
}

module.exports = { getAllUsers };
