const AWS = require("aws-sdk");
const path = require("path");

AWS.config.update({
  signatureVersion: "v4",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3 = new AWS.S3();

exports.listImages = (req, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,  // Nombre de tu bucket
  };

  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Error al listar objetos en S3:", err);
      return res.status(500).send("Error al listar imágenes");
    }

    const imageFiles = data.Contents.map(item => item.Key);

    // Generar URLs firmadas para cada archivo
    const imageUrls = imageFiles.map(filename => {
      const signedUrl = s3.getSignedUrl("getObject", {
        Bucket: process.env.AWS_BUCKET,
        Key: filename,
        Expires: 60 * 5,  // La URL será válida por 5 minutos
      });
      return signedUrl;
    });

    // Enviar la lista de URLs firmadas al cliente
    res.render('testing/images', { imageUrls });
  });
};
