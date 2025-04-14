const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/User');
const Role = require('../../models/users/Role')

// POST Login
const loginUser = async (req, res) => {
  const { user, password, type } = req.body;

  try {
    const parts = user.trim().split(" ");
    let userLogin = null;

    if (parts.length === 2) {
      // Caso: username + lastname
      const [username, lastName] = parts;
      userLogin = await User.findOne({ username, lastName }).populate("idRole");
    } else {
      // Caso: correo o username solo
      const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user);
      userLogin = await User.findOne(
        esEmail ? { email: user } : { username: user }
      ).populate("idRole");
    }

    if (!userLogin || !(await bcrypt.compare(password, userLogin.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (userLogin.idRole.roleName !== type) {
      return res.status(403).json({
        message:
          `Acceso denegado. Se requiere rol: ${type}`
      });
    }

    const accessToken = jwt.sign(
      { id: userLogin._id, email: userLogin.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: userLogin._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
      sameSite: 'Strict',
      secure: false
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 120 * 1000,
      sameSite: 'Strict',
      secure: false
    });
    
  } catch (err) {
    console.error(err);
  }
};

// GET Login
const login = (req, res) => {
  res.render('users/login');
};

module.exports = {
  loginUser,
  login
};
