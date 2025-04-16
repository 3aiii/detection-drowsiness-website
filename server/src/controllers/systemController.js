const connector = require("../database/connector");

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
  findOne: async (req, res) => {},
  create: async (req, res) => {},
};
