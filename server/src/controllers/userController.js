const connector = require("../database/connector");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  findAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
      const [countUser] = await connector.execute(
        `SELECT COUNT(*) AS total FROM user_tbl`
      );

      const totalPage = Math.ceil(countUser[0].total / limit);

      const [users] = await connector.execute(
        `SELECT user_id,username,email,role,created_at FROM user_tbl ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        [limit, offset]
      );

      if (!users || users.length === 0) {
        return res.send({
          message: "No users found",
        });
      }

      return res.status(200).send({
        data: users,
        currentPage: page,
        totalPage: totalPage,
      });
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  findOne: async (req, res) => {
    const { id } = req.params;

    try {
      const [user] = await connector.execute(
        `SELECT username,firstname,lastname,email,profile_image,created_at FROM user_tbl WHERE user_id = ?`,
        [id]
      );

      if (!user || user.length === 0) {
        return res.send({
          message: "Can't find your user",
        });
      }
      return res.status(200).send({
        data: user[0],
      });
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
  create: async (req, res) => {
    const {
      username,
      password,
      firstname,
      lastname,
      email,
      role = "user",
    } = req.body;

    if (!username || !password || !firstname || !lastname || !email) {
      return res.send({
        message: "Please, fill your data",
      });
    }

    try {
      const [existingUser] = await connector.execute(
        `SELECT * FROM user_tbl WHERE username = ? OR email = ?`,
        [username, email]
      );

      if (existingUser.length > 0) {
        return res.send({
          message: "Your username or email already has in database",
        });
      }

      let hashPassword = await bcrypt.hash(password, saltRounds);

      const [result] = await connector.execute(
        `INSERT INTO user_tbl (username, password, firstname, lastname, email, role) VALUES (?, ?, ?, ?, ?, ?)`,
        [username, hashPassword, firstname, lastname, email, role]
      );

      return res.status(201).send({
        data: result.insertId,
        message: "Created account successfully",
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { username, password, firstname, lastname, email } = req.body;

    try {
      const [userData] = await connector.execute(
        `SELECT * FROM user_tbl WHERE user_id = ?`,
        [id]
      );

      if (userData.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }

      const current = userData[0];

      const [existingUser] = await connector.execute(
        `SELECT user_id FROM user_tbl WHERE (username = ? OR email = ?) AND user_id != ?`,
        [username, email, id]
      );

      if (existingUser.length > 0) {
        return res.send({
          message: "Your username or email already has in database",
        });
      }

      let hashPassword = password
        ? await bcrypt.hash(password, 10)
        : current.password;

      const updatedData = {
        username: username || current.username,
        password: hashPassword,
        firstname: firstname || current.firstname,
        lastname: lastname || current.lastname,
        email: email || current.email,
      };

      const [updateUser] = await connector.execute(
        `UPDATE user_tbl SET username = ?, ${hashPassword ? "password = ?," : ""
        } firstname = ?, lastname = ?, email = ? WHERE user_id = ?`,
        [
          updatedData.username,
          updatedData.password,
          updatedData.firstname,
          updatedData.lastname,
          updatedData.email,
          id,
        ]
      );

      if (!updateUser || updateUser.length === 0) {
        return res.send({ message: "User not found or no changes made" });
      }

      return res.status(200).send({
        message: "User updated successfully",
      });
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
  remove: async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const [removeUser] = await connector.execute(
        `DELETE FROM user_tbl WHERE user_id = ?`,
        [id]
      );

      if (!removeUser || removeUser.length === 0) {
        return res.send({
          message: "Can't remove or find this user",
        });
      }

      return res.status(200).send({
        message: "User has remove in database successfully",
      });
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
  image: async (req, res) => {
    const { id } = req.params;
    const { file } = req;

    try {
      const [user] = await connector.execute(
        `UPDATE user_tbl SET profile_image = ? WHERE user_id = ?`,
        [file?.filename, id]
      );

      if (!user || user.length === 0) {
        return res.send({
          message: "No user to update your image",
        });
      }

      return res.status(200).send({
        message: "update profile image successfully",
      });
    } catch (error) {
      return res.send({
        error,
      });
    }
  },
  changeSound: async (req, res) => {
    const { sound } = req.body
    const   userId = req.params.id

    try {
      const [userData] = await connector.execute(`SELECT * FROM user_tbl WHERE user_id = ?`, [userId])
      if (userData.length === 0) {
        return res.send({ message: "User not found" });
      }

      await connector.execute(`UPDATE user_tbl SET sound = ? WHERE user_id = ?`, [sound, userId])

      return res.send({
        message: "update sound successfully"
      })
    } catch (error) {
      return res.send(error.message)
    }
  }
};
