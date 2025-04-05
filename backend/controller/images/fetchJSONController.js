const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3 = new AWS.S3();

exports.listImagesJson = (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Error al listar objetos en S3:", err);
      return res.status(500).json({ message: "Error al listar imágenes" });
    }

    // Obtener las claves de los objetos (nombres de los archivos)
    const imageFiles = data.Contents.map(item => item.Key);

    // Generar URLs firmadas para cada archivo
    const imageUrls = imageFiles.map(filename => {
      return s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_BUCKET,
        Key: filename,
        Expires: 60 * 5, // La URL será válida por 5 minutos
      });
    });

    // Enviar la lista de URLs firmadas como respuesta JSON
    res.json({ images: imageUrls });
  });
};
