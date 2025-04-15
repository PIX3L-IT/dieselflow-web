const User = require("../../models/users/User");
const Role = require("../../models/users/Role");

exports.getUsers = async (req, res) => {
  try {

    const {role, search } = req.query;
    const filter = {};
    
    if (search) {
      filter['username'] = { $regex: search, $options: 'i' };
    }

    
    const users = await User.find(filter).populate('idRole').exec();
    
    const filteredUsers = role
    ? users.filter(user => user.idRole && user.idRole.roleName === role)
    : users;  

    res.render('users/users', { users: filteredUsers, role });

  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).render('includes/500',{
      active: ""  
    });
  }
}

