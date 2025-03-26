  /**
 * Servidor para el sistema "DieselFlow".
 */

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_URI;

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

const compression = require("compression");
app.use(compression());

// Conectar a la base de datos usando variables de entorno
mongoose
  .connect(uri)

  .then(() => {
    console.log("Conectado a la base de datos de MongoDB en AWS EC2");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

app.use((request, response) => {
    response.status(404).json({
      message: "No se encuentra el endpoint o ruta que estas buscando",
    });
  });
  
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });