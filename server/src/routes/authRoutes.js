const { Router } = require("express");
const authController = require("../controllers/authController");

const authRoute = Router();

authRoute.post("/login", authController.login);
authRoute.post("/logout", authController.logout);
authRoute.get("/verify", authController.verify);

module.exports = authRoute;