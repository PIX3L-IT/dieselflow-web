const express = require("express");
const router = express.Router();
const uploadController = require("../../controller/images/uploadController");

router.post("/s3_sdk", uploadController.uploadFileS3SDK);
router.post("/s3_multer", uploadController.uploadFileS3Multer);

module.exports = router;
