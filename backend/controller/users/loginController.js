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

    if (!userLogin || !userLogin.userStatus || !(await bcrypt.compare(password, userLogin.password))) {
      if (type === "Administrador") {
        return res.render('users/login', { error: 'Credenciales inválidas' });
      }
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    if (userLogin.idRole.roleName !== type) {
      if (type === "Administrador") {
        return res.render('users/login', {
          error: 'Credenciales inválidas'
        });
      }
      return res.status(401).json({ error: "Credenciales inválidas" });
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

    if (type === "Administrador") {
      return res.render('includes/navbar', {
        active: "inicio",
        accessToken: accessToken,
        refreshToken: refreshToken,
        username: userLogin.username,
        lastname: userLogin.lastName,
      });
    }

    return res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      error: ""
    });

  } catch (err) {
    console.error(err);
    if (type === "Administrador") {
      return res.status(500).render('users/login', { error: 'Hubo un error al procesar la solicitud' });
    }
    return res.status(500).json({ error: "Hubo un error al procesar la solicitud" });
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
