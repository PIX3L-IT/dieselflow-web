/**
 * Servidor para el sistema "DieselFlow".
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const compression = require("compression");
const cors = require('cors');
const cookieParser = require('cookie-parser');



const uploadImagesRoutes = require("./backend/routes/images/uploadImages");
const fetchImagesRoutes = require("./backend/routes/images/fetchImages");
const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Importar rutas
const authRoutes = require('./backend/routes/users/authRoutes');
app.use('/auth', authRoutes);


// Conectar a MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("Conectado a la base de datos de MongoDB"))
  .catch((error) => console.error("Error al conectar con la base de datos:", error));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "frontend-web", "views"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

// Usar las rutas para subir y obtener imágenes
app.use("/upload", uploadImagesRoutes);
app.use("/image", fetchImagesRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.render("testing/index.ejs");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: "No se encuentra el endpoint o ruta que estás buscando",
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
