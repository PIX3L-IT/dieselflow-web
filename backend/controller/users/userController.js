const User = require("../../models/users/User");

exports.getAllUsers = async (req, res) => {
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

exports.getConfirmEmail = (req, res, next) => {
  res.render("users/confirmEmail");
};

exports.getResetPassword = (req, res, next) => {
  res.render("users/resetPassword");
}
