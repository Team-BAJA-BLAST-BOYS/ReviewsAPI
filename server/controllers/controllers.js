const psql = require('../models/postgresDB');

module.exports = {
  getReviews: async (req, res) => {
    const data = await psql.getReviews(req.query.product_id);
    res.send(data.rows);
  },
  getMeta: async (req, res) => {
    const data = await psql.getMeta(req.query.product_id)
    res.send(data.rows[0].metadata);
  },
  postReview: async (req, res) => {
    const result = await psql.postReview(req.body);
    res.status(201).send(result);
  },
  putHelpful: async (req, res) => {
    const result = await psql.putHelpful(req.params.review_id);
    res.send(result);
  },
  putReport: async (req, res) => {
    const result = await psql.putReport(req.params.review_id);
    res.send(result);
  },
};
