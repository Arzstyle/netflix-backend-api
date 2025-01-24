const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/getAllUser", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);

module.exports = router;
