const express = require("express");
const router = express.Router();
const ardunioController = require("../controllers/arduinoController");
// 재생
router.get("/:id", ardunioController.controllMusicController);
module.exports = router;
