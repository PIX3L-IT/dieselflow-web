const jwt = require('jsonwebtoken');

// Protected route
exports.getProtected = (req, res) => {
  res.render('users/dieselflow');
};

// Refresh token usando cookie
exports.refreshAccessToken = (req, res) => {
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
    return res.status(403).json({ 
      message: 'Refresh token inválido o expirado' });
  }
};

