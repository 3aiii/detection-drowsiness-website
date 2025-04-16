const { Router } = require("express");
const userController = require("../controllers/userController");
const uploadProfile = require("../middlewares/uploadProfile");

const userRoutes = Router();

userRoutes.get("/", userController.findAll);
userRoutes.get("/:id", userController.findOne);
userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);
userRoutes.put("/change-sound/:id", userController.changeSound)
userRoutes.delete("/:id", userController.remove);
userRoutes.post("/image/:id", uploadProfile, userController.image);

module.exports = userRoutes;