const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

exports.getUsers = async (req, res) => {
  try {

    const {role, search } = req.query;

    // Filtro por rol
    const filter = {};

    if (search) {
      filter['username'] = { $regex: search, $options: 'i' };
    }

    
    const users = await User.find(filter).populate('idRole').exec();
    
    // Si se proporciona un rol, filtrar los usuarios por el nombre del rol
    const filteredUsers = role
    ? users.filter(user => user.idRole && user.idRole.roleName === role)
    : users;  

    // res.status(200).json(filteredUsers); 
    res.render('users/users');

  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).render('includes/500',{
      active: ""  
    });
  }
}

