const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/createuser", userController.createUser);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/profile", isAuthenticatedUser, userController.getUser);

module.exports = router;
