const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/User');
const Role = require('../../models/users/Role');

// POST Login
exports.postLogin = async (req, res) => {
  const { user, password, type } = req.body;

  try {
    // Separar nombre y apellido si es posible
    const parts = user.trim().split(" ");
    let userLogin;

    if (parts.length === 2) {
      const [username, lastName] = parts;
      userLogin = await User.findByUsernameAndLastName(username, lastName);
    } else {
      const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user);
      userLogin = esEmail
        ? await User.findByEmail(user)
        : await User.findByUsername(user);
    }

    // Validar usuario y contraseña
    const isValidPassword = userLogin && await bcrypt.compare(password, userLogin.password);
    const isUserActive = userLogin && userLogin.userStatus;

    if (!userLogin || !isUserActive || !isValidPassword) {
      const error = 'Credenciales inválidas';
      return type === "Administrador"
        ? res.render('users/login', { error })
        : res.status(401).json({ error });
    }

    // Validar rol
    if (userLogin.idRole.roleName !== type) {
      const error = 'Credenciales inválidas';
      return type === "Administrador"
        ? res.render('users/login', { error })
        : res.status(401).json({ error });
    }

    // Crear tokens
    const accessToken = jwt.sign(
      {
        id: userLogin._id,
        email: userLogin.email,
        username: userLogin.username,
        lastname: userLogin.lastName
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      {
        id: userLogin._id,
        username: userLogin.username,
        lastname: userLogin.lastName
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    // Guardar tokens en cookies
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

    // Devolver respuesta
    if (type === "Administrador") {
      return res.render('includes/navbar', {
        active: "inicio",
        accessToken,
        refreshToken,
        username: userLogin.username,
        lastname: userLogin.lastName
      });
    }

    return res.json({ accessToken, refreshToken, error: "" });

  } catch (err) {
    console.error(err);
    const error = 'Hubo un error al procesar la solicitud';
    return type === "Administrador"
      ? res.status(500).render('users/login', { error })
      : res.status(500).json({ error });
  }
};

// GET Login
exports.getLogin = (req, res) => {
  res.render('users/login');
};
