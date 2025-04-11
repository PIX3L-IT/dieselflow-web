const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/users/User');

// Register user
const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar usuario', details: err.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
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

    // Setear ambos tokens como cookies httpOnly
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

    res.json({ message: 'Login exitoso' });

  } catch (err) {
    res.status(500).json({ message: 'Error interno al iniciar sesión', details: err.message });
  }
};


// Protected route
const getProtected = (req, res) => {
  res.render('users/dieselflow');
};


// Refresh token usando cookie
const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token requerido' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    // Guardar ambos tokens como cookies
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      maxAge: 60 * 1000,
      sameSite: 'Strict',
      secure: false
    });

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      maxAge: 120 * 1000,
      sameSite: 'Strict',
      secure: false
    });

    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });

  } catch (err) {
    return res.status(403).json({ message: 'Refresh token inválido o expirado' });
  }
};

// Login page
const login = (req, res) => {
  res.render('users/login', { title: 'Login' });
};

module.exports = {
  registerUser,
  loginUser,
  getProtected,
  refreshAccessToken,
  login
};
