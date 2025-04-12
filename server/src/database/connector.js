const mysql = require("mysql2/promise");

const connector = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "drowsiness_project",
});

(async () => {
  try {
    const connection = await connector.getConnection();
    console.log("✅ Database connected successfully!");
    connection.release();
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

module.exports = connector;
