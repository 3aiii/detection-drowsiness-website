const connector = require("../database/connector");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

require('dotenv').config()

module.exports = {
  findAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
      const [countHistory] = await connector.execute(`
        SELECT 
          COUNT(*) as total
        FROM detection_tbl d
      `);

      const totalPage = Math.ceil(countHistory[0].total / limit);

      const [history] = await connector.execute(
        `      
          SELECT 
            d.*, 
            u.firstname AS fname, 
            u.lastname AS lname, 
            u.email AS email
          FROM detection_tbl d
          JOIN user_tbl u ON d.user_id = u.user_id
          ORDER BY d.detection_time DESC
          LIMIT ? OFFSET ?
      `,
        [limit, offset]
      );

      if (history.length === 0) {
        return res.send({ message: "Can't find history" });
      }

      return res.status(200).send({
        data: history,
        currentPage: page,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error)
      return res.send({ error: error.message });
    }
  },
  findOne: async (req, res) => {
    const detection_id = req.params.id

    try {
      const [history] = await connector.execute(
        `      
          SELECT detection_tbl.* , user_tbl.firstname ,user_tbl.lastname ,user_tbl.email 
          FROM detection_tbl 
          JOIN user_tbl ON detection_tbl.user_id = user_tbl.user_id
          WHERE detection_id = ?
          ORDER BY detection_time DESC 
      `,
        [detection_id]
      );

      if (history.length === 0) {
        return res.send({ message: "Can't find history" });
      }

      return res.status(200).send({
        data: history[0]
      })
    } catch (error) {
      return res.send({ error: error.message });
    }
  },
  detection: async (req, res) => {
    const { image, userId } = req.body;
    try {
      const response = await axios.post(`${process.env.FLASK_APP}/predict`, { image });
      const result = response.data;

      if (result.alert_text) {
        const status = result.alert_text?.toLowerCase().includes('microsleep') || result.alert_text?.toLowerCase().includes('prolonged')
          ? 'Alert'
          : 'Non-Alert';

        const detection_time = new Date();

        const checkSql = `
        SELECT * FROM detection_tbl
        WHERE user_id = ? AND yawns = ? AND blinks = ? AND microsleeps = ? AND yawn_duration = ? AND status = ?
        ORDER BY detection_time DESC
        LIMIT 1
      `;

        const [rows] = await connector.execute(checkSql, [
          userId || 0,
          result.yawns,
          result.blinks,
          result.microsleeps,
          result.yawn_duration,
          status
        ]);

        if (rows.length > 0) {
          return res.send({ ...result, note: "Skipped duplicate detection" });
        }

        const insertSql = `
        INSERT INTO detection_tbl (
          user_id,
          yawns,
          blinks,
          microsleeps,
          yawn_duration,
          status,
          detection_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

        const values = [
          userId || 0,
          result.yawns,
          result.blinks,
          result.microsleeps,
          result.yawn_duration,
          status,
          detection_time,
        ];

        const [detectionLog] = await connector.execute(insertSql, values);

        const saveImagePath = path.join(__dirname, '..', 'images', 'systems');

        if (!fs.existsSync(saveImagePath)) {
          fs.mkdirSync(saveImagePath, { recursive: true });
        }

        if (image?.startsWith("data:image")) {
          const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
          const buffer = Buffer.from(base64Data, 'base64');

          const ext = image.includes('image/png') ? 'png' : 'jpg';
          const filename = `user_${userId || 0}_${Date.now()}.${ext}`;
          const filePath = path.join(saveImagePath, filename);

          fs.writeFileSync(filePath, buffer);

          await connector.execute(`UPDATE detection_tbl SET image = ? WHERE detection_id = ?`, [filename, detectionLog?.insertId])
        }
      }

      return res.send(result);
    } catch (err) {
      console.error('Error forwarding to Flask:', err.message);
      return res.status(500).send({ error: 'Error processing image' });
    }
  },
  findById: async (req, res) => {
    const userId = req.params.id

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    if (!userId) {
      return res.send({ message: "Please, send userId" })
    }

    try {
      const [countHistory] = await connector.execute(`
        SELECT 
          COUNT(*) as total
        FROM detection_tbl 
        WHERE user_id = ?
      `, [userId]);

      const totalPage = Math.ceil(countHistory[0].total / limit);

      const [result] = await connector.execute(`SELECT * FROM detection_tbl WHERE user_id = ? ORDER BY detection_time DESC LIMIT ? OFFSET ?`, [userId, limit, offset])

      if (result.length === 0) {
        return res.send({ message: "Can't find your history used" })
      }

      return res.status(200).send({
        result,
        currentPage: page,
        totalPage: totalPage,
      })
    } catch (error) {
      return res.send(error.message)
    }
  }
}
