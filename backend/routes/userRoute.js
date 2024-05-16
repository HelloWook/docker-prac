const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/:id", userController.getUserById);

router.post("/join", userController.JoinController);

router.post("/login", userController.loginController);
module.exports = router;
