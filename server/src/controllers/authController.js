const connector = require("../database/connector");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.send({
          message: "Please, fill your data",
        });
      }

      const [existingUser] = await connector.execute(
        `SELECT * FROM user_tbl WHERE username = ?`,
        [username]
      );

      if (existingUser.length === 0 || existingUser[0].length === 0) {
        return res.send({
          message: "Can't find this user in database",
        });
      }

      const match = await bcrypt.compare(password, existingUser[0]?.password);

      if (!match) {
        return res.send({
          message: "Invalid email or password",
        });
      }

      const user = { ...existingUser[0] };
      delete user.password;

      const token = jwt.sign(
        {
          user_id: user?.user_id,
          firstname: user?.firstname,
          lastname: user?.lastname,
          role: user?.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3 * 60 * 60 * 1000,
      });

      return res.status(200).send({
        token,
      });
    } catch (error) {
      return res.send({
        error: error.message,
      });
    }
  },
  logout: async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
      return res.send({ message: "No token provided" });
    }

    await res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).send({ message: "Logged out successfully" });
  },
  verify: async (req, res) => {
    const { token } = req.cookies;

    if (!token) {
      return res.send({ message: "Can't find your token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded) {
        return res.send({ message: "Can't find your token" });
      }

      const userId = decoded.user_id;

      const [user] = await connector.execute(
        `SELECT user_id,username,email,firstname,lastname,role,profile_image FROM user_tbl WHERE user_id = ?`,
        [userId]
      );

      return res.status(200).send({
        user: user[0],
      });
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
};
