const { Router } = require("express");
const userController = require("../controllers/userController");

const userRoutes = Router();

userRoutes.get("/", userController.findAll);
userRoutes.get("/:id", userController.findOne);
userRoutes.post("/", userController.create);
userRoutes.put("/", userController.update);
userRoutes.delete("/", userController.remove);

module.exports = userRoutes;
