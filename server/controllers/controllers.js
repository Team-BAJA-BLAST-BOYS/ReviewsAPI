const psql = require('../models/postgresDB');
const validateParams = require('./validation/validateParams');

module.exports = {
  getReviews: async (req, res) => {
    const validate = validateParams(req.query);

    if (validate.status === 200) {
      const sort = {
        relevance: 'helpfulness DESC, date DESC',
        helpfulness: 'helpfulness DESC',
        newest: 'date DESC'
      };

      const query = {
        product_id: req.query.product_id,
        order: sort[req.query.sort] || sort.relevance,
        limit: req.query.count || 5,
        offset: ((req.query.count * req.query.page) - req.query.count) || 0,
        page: req.query.page
      }

      const data = await psql.getReviews(query);
      res.send(data);
    }

    res.status(validate.status).send(validate.text);
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
