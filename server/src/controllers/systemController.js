const connector = require("../database/connector");
const axios = require('axios');

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
        FROM detection_id d
          JOIN history_tbl h ON d.history_id = h.history_id
          JOIN user_tbl u ON h.user_id = u.user_id
      `);

      const totalPage = Math.ceil(countHistory[0].total / limit);

      const [history] = connector.execute(
        `      
          SELECT 
            d.*, 
            h.history_id, 
            h.user_id, 
            u.name AS user_name, 
            u.email AS user_email
          FROM detection_id d
          JOIN history_tbl h ON d.history_id = h.history_id
          JOIN user_tbl u ON h.user_id = u.user_id
          ORDER BY d.detected_at DESC
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
      return res.send({ error: error.message });
    }
  },
  findOne: async (req, res) => { },
  detection: async (req, res) => {
    const { image, userId } = req.body;
    try {
      const response = await axios.post(`${process.env.FLASK_APP}/predict`, { image });
      const result = response.data;

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

      await connector.execute(insertSql, values);

      return res.send(result);
    } catch (err) {
      console.error('Error forwarding to Flask:', err.message);
      return res.status(500).send({ error: 'Error processing image' });
    }
  },
}
