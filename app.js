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

const uploadImagesRoutes = require("./backend/routes/images/uploadImages");
const fetchImagesRoutes = require("./backend/routes/images/fetchImages");
const componentRoutes = require("./backend/routes/testing/viewComponents");
const loginRoutes = require("./backend/routes/users/loginRoutes");
const authRoutes = require("./backend/routes/users/authRoutes");
const userRoutes = require("./backend/routes/users/users");

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

app.use("/login", loginRoutes);
app.use("/auth", authRoutes);
app.use("/upload", uploadImagesRoutes);
app.use("/image", fetchImagesRoutes);
app.use("/component", componentRoutes);

// Ruta de testing para obtener los usuarios
app.use("/users", userRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.render('users/login', { title: 'Login' });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).render("includes/404", { active: "" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
