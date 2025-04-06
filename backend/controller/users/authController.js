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

// Login user (con cookies)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

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

  // Mandar los tokens como cookies seguras
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // solo HTTPS
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 15 // 15 minutos o lo que tengas en tu env
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días
    })
    .json({ message: 'Login exitoso' });
};


// Protected route
const getProtected = (req, res) => {
  res.json({ message: 'Acceso permitido', usuario: req.user });
};

// Refresh token
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'Token de refresco requerido' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: 'Refresh token inválido o expirado' });
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
  refreshToken,
  login
};
