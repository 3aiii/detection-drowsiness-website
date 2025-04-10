const { Router } = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const systemRoutes = require("./systemRoutes");

const indexRouter = Router();

indexRouter.use("/user", userRoutes);
indexRouter.use("/auth", authRoutes);
indexRouter.use("/system", systemRoutes);

module.exports = indexRouter;
