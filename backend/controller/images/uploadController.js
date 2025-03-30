const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const fs = require("fs");
const path = require("path");

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3 = new AWS.S3();

// Configuración de Multer para almacenamiento en disco
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./bucket/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

// Configuración de Multer para almacenamiento en S3
const s3Storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, file.originalname),
  }),
});

exports.uploadFileS3SDK = (req, res) => {
  console.log("Cargando el archivo");
  const upload = multer({ storage: diskStorage }).array("file", 1);

  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Error subiendo el archivo", error: err });

    fs.readFile(`./bucket/${req.files[0].filename}`, (err, data) => {
      if (err) return res.status(500).json({ message: "Error leyendo el archivo", error: err });

      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.files[0].filename,
        Body: data,
      };

      s3.upload(params, (s3Err, data) => {
        if (s3Err) return res.status(500).json({ message: "Error subiendo a S3", error: s3Err });

        console.log(`Archivo subido con éxito a ${data.Location}`);
        fs.unlink(`./bucket/${req.files[0].filename}`, (unlinkErr) => {
          if (unlinkErr) console.error("Error eliminando archivo local:", unlinkErr);
          res.status(200).json({ code: 200, msg: "Ok" });
        });
      });
    });
  });
};

exports.uploadFileS3Multer = (req, res) => {
  console.log("Cargando el archivo");
  const upload = s3Storage.array("file", 1);

  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Error subiendo el archivo", error: err });

    res.status(200).json({ code: 200, msg: "Ok" });
  });
};
