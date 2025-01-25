const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/getAllUser", userController.getAllUsers);
router.get("/getUserById/:id", userController.getUserById);
router.get("/getUserByEmail/:email", userController.findByEmail);

router.put("/updateUser/:id", userController.updateUser);

router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
