const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const { upload } = require("../util/multer");

router.post("/upload", upload, musicController.uploadController);
router.get("/", musicController.getAllMusic);
router.get("/file/:uploader", musicController.getMusicByUploader);
router.get("/download", musicController.downloadMusic);

module.exports = router;
