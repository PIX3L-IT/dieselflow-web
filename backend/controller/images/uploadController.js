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

// Configuración de Multer para almacenamiento en S3
const s3Storage = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => cb(null, file.originalname),
  }),
});

exports.uploadFileS3Multer = (req, res) => {
  console.log("Cargando el archivo");
  const upload = s3Storage.array("file", 1);

  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Error subiendo el archivo", error: err });

    res.status(200).json({ code: 200, msg: "Ok" });
  });
};
