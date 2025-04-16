const { Router } = require("express");
const systemController = require("../controllers/systemController");

const systemRoute = Router();

systemRoute.get("/", systemController.findAll);
systemRoute.get("/:id", systemController.findOne);
systemRoute.post("/detection", systemController.detection);

module.exports = systemRoute;
