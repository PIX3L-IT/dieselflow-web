const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/User');
const Role = require('../../models/users/Role')

// POST Login
const loginUser = async (req, res) => {
  const { email, password, tipo } = req.body;

  try {
    const user = await User.findOne({ email }).populate("idRole");
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    if (user.idRole.roleName !== tipo) {
      return res.status(403).json({ message: `Acceso denegado. Se requiere rol: ${tipo}` });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
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

    res.json({ message: 'Login exitoso', rol: tipo });

  } catch (err) {
    console.error(err);
    res.status(500).render('includes/500', {
      active: ""
    });
  }
};

// GET Login
const login = (req, res) => {
  res.render('users/login', { title: 'Login' });
};

module.exports = {
  loginUser,
  login
};
