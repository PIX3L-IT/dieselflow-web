const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");

const router = express.Router();
const s3 = new AWS.S3();

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

// Configuración de almacenamiento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./bucket/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// Configuración de almacenamiento en S3 con Multer
const storageS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, file.originalname),
  }),
});

// Ruta para subir archivo a servidor local y luego enviarlo a S3
router.post("/upload_file_s3_sdk", (req, res) => {
  console.log("Cargando el archivo");
  const upload = multer({ storage }).array("file", 1);

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al subir el archivo.");
    }

    const filePath = path.join(__dirname, "./bucket", req.files[0].filename);
    fs.readFile(filePath, (err, data) => {
      if (err) throw err;

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.files[0].filename,
        Body: data,
      };

      s3.upload(params, (s3Err, data) => {
        if (s3Err) throw s3Err;
        console.log(`Archivo subido exitosamente: ${data.Location}`);

        // Eliminar archivo local después de subirlo a S3
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) console.error(unlinkErr);
          res.status(200).json({ code: 200, msg: "Ok" });
        });
      });
    });
  });
});

// Ruta para subir archivo directamente a S3 usando Multer
router.post("/upload_file_s3_multer", (req, res) => {
  console.log("Cargando el archivo");
  const upload = storageS3.array("file", 1);

  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al subir el archivo.");
    }
    res.status(200).json({ code: 200, msg: "Ok" });
  });
});

module.exports = router;
