const psql = require('../models/postgresDB');

module.exports = {
  getReviews: (req, res) => {
    psql.getReviews(req.query.product_id)
      .then((results) => res.send(results.rows));
  },
  getMeta: (req, res) => {
    res.end(psql.getMeta);
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
