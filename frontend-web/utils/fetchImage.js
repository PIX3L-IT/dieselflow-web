const express = require("express");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");

const router = express.Router();
const s3 = new AWS.S3();

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

// Ruta para obtener un archivo desde S3
router.get("/get_bucket_file/:file", async (req, res) => {
  const filename = req.params.file;
  console.log(`Intentando obtener archivo: ${filename}`);

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      console.error("Error al obtener el archivo:", err);
      return res.status(500).send("Error al recuperar el archivo.");
    }

    // Guardar temporalmente el archivo para enviarlo
    const tempFilePath = path.join(__dirname, "bucket", filename);
    fs.writeFileSync(tempFilePath, data.Body);

    // Enviar archivo
    res.sendFile(tempFilePath, (err) => {
      if (err) console.error("Error enviando el archivo:", err);

      // Eliminar archivo temporal después de enviarlo
      fs.unlinkSync(tempFilePath);
    });
  });
});

module.exports = router;
