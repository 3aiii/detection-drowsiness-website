const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
app.use("/profile", express.static(path.join(__dirname, "images/profiles")));
app.use("/image", express.static(path.join(__dirname, "images/systems")));

app.use(
  cors({
    origin: `${process.env.VITE_APP}`,
    credentials: true,
  })
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
  console.log(`CORS is running on port ${process.env.VITE_APP}`);
});

app.use("/api", indexRouter);
