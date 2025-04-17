/**
 * Servidor para el sistema "DieselFlow".
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const compression = require("compression");
const jwt = require("jsonwebtoken");

const uploadImagesRoutes = require("./backend/routes/images/uploadImages");
const fetchImagesRoutes = require("./backend/routes/images/fetchImages");
const componentRoutes = require("./backend/routes/testing/viewComponents");
const loginRoutes = require("./backend/routes/users/loginRoutes");
const authRoutes = require("./backend/routes/users/authRoutes");
const userRoutes = require("./backend/routes/users/userRoutes");
const unitsRoutes = require("./backend/routes/units/unitRoutes");

const app = express();
app.use(cookieParser());
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

// Conectar a MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a la base de datos de MongoDB"))
  .catch((error) => console.error("Error al conectar con la base de datos:", error));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend-web", "views"));
app.use('/utils', express.static(path.join(__dirname, "frontend-web", "utils")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend-web", "public")));
app.use(express.json());
app.use(compression());

app.use("/", loginRoutes);
app.use("/", authRoutes);
app.use("/", uploadImagesRoutes);
app.use("/", fetchImagesRoutes);
app.use("/", componentRoutes);

// Ruta de testing para obtener los usuarios
app.use("/", userRoutes);

// Ruta de testing para obtener las unidades
app.use("/", unitsRoutes);

// Ruta principal
app.get("/", (req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  try {
    let payload = null;

    // Intenta verificar el accessToken
    if (accessToken) {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
    }
    // Si no hay accessToken o está expirado, intenta con refreshToken
    else if (refreshToken) {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }

    // Si uno de los tokens es válido, renderiza el navbar
    if (payload) {
      return res.render("includes/navbar", {
        active: "inicio",
        accessToken,
        refreshToken,
        username: payload.username,
        lastname: payload.lastname,
      });
    }
  } catch (err) {
    res.render("users/login", { error: null });
  }

  res.render("users/login", { error: null });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  let hasToken = false;
  let payload = null;
  
  try {
    if (accessToken) {
      payload = jwt.verify(accessToken, process.env.JWT_SECRET);
      hasToken = true;
    } else if (refreshToken) {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      hasToken = true;
    }
  } catch (err) {
    // No redirijas ni renderices aquí, solo deja que el flujo continúe sin token
  }

  res.status(404).render("includes/404", {
    active: "",
    hasToken,
    accessToken,
    refreshToken,
    username: payload ? payload.username : null,
    lastname: payload ? payload.lastname : null
  });
});


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
