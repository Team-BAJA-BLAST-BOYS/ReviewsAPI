const psql = require('../models/postgresDB');

module.exports = {
  getReviews: async (req, res) => {
    const data = await psql.getReviews(req.query.product_id);
    res.send(data.rows);
  },
  getMeta: async (req, res) => {
    const data = await psql.getMeta(req.query.product_id)
    res.send(data.rows[0]);
  },
  postReview: (req, res) => {
    res.end(psql.postReview);
  },
  putHelpful: (req, res) => {
    res.end(psql.putHelpful);
  },
  putReport: (req, res) => {
    res.end(psql.putReport);
  },
};
