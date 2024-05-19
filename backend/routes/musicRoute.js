const express = require("express");
const router = express.Router();
const musicController = require("../controllers/musicController");
const { upload } = require("../util/multer");

router.post("/upload", upload, musicController.uploadController);
module.exports = router;
