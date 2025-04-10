const mysql2 = require("mysql2");

const connector = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "drowsiness_project",
});

module.exports = connector;