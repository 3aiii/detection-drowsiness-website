const express = require("express");
const cors = require("cors");
const connector = require("./database/connector");
const indexRouter = require("./routes/index");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());
// app.use("/image", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});

connector.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  } else {
    console.log("Connected to the database succesfully!");
  }
});

app.use("/api", indexRouter);
