const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  let payload = null;
  let hasToken = false;

  try {
    if (accessToken) {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      hasToken = true;
    } else if (refreshToken) {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      hasToken = true;
    }

    if (payload) {
      req.user = payload;
      return next();
    }
  } catch (err) {
    // Silenciado, pasará a renderizado abajo
  }

  // Si no hay token o falló la verificación
  return res.status(403).render("includes/404", {
    active: "",
    hasToken,
    accessToken,
    refreshToken,
    username: payload ? payload.username : null,
    lastname: payload ? payload.lastname : null
  });
};

module.exports = verifyToken;
