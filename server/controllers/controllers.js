const psql = require('../models/postgresDB');
const validateParams = require('./validation/validateParams');
const validateReviewId = require('./validation/validatePutParams');
const validatePostBody = require('./validation/validatePostBody');

module.exports = {
  getReviews: async (req, res) => {
    const validate = validateParams(req.query);

    if (validate.status === 200) {
      const sort = {
        relevance: 'helpfulness DESC, date DESC',
        helpfulness: 'helpfulness DESC',
        newest: 'date DESC',
      };

      const query = {
        product_id: req.query.product_id,
        order: sort[req.query.sort] || sort.relevance,
        limit: req.query.count || 5,
        offset: ((req.query.count * req.query.page) - req.query.count) || 0,
        page: req.query.page,
      };

      try {
        const result = await psql.getReviews(query);
        res.send(result);
      } catch (err) {
        res.status(500).send(err);
      }
    }

    res.status(validate.status).send(validate.text);
  },
  getMeta: async (req, res) => {
    const validate = validateParams(req.query);
    if (validate.status === 200) {
      try {
        const result = await psql.getMeta(req.query.product_id);
        res.send({
          product_id: Number(req.query.product_id),
          ...result,
        });
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.status(validate.status).send(validate.text);
  },
  postReview: async (req, res) => {
    const validate = validatePostBody.postBody(req.body);
    if (validate.status === 201) {
      try {
        await psql.postReview(req.body);
        res.status(201).send('Successful Post');
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.status(validate.status).send(validate.text);
  },
  putHelpful: async (req, res) => {
    const validate = validateReviewId(req.params.review_id);
    if (validate.status === 200) {
      try {
        await psql.putHelpful(req.params.review_id);
        res.send(`Successful increment of helpfulness for review #${req.params.review_id}`);
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.status(validate.status).send(validate.text);
  },
  putReport: async (req, res) => {
    const validate = validateReviewId(req.params.review_id);
    if (validate.status === 200) {
      try {
        await psql.putReport(req.params.review_id);
        res.send(`Successfully changed reported status of review #${req.params.review_id}`);
      } catch (err) {
        res.status(500).send(err);
      }
    }
    res.status(validate.status).send(validate.text);
  },
};
