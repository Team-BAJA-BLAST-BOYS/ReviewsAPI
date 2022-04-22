const { Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'reviews',
  password: '',
  port: 5432,
};

const pool = new Pool(credentials);

pool.connect();

module.exports = {
  getReviews: async (product_id) => {
    return await pool.query('SELECT id, product_id, rating, to_timestamp(date / 1000), summary, body, recommend,reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY id', [product_id]);
  },
  getMeta: async (product_id) => {
    return await pool.query("SELECT json_object_agg(averages_json.name, averages_json.value) AS characteristics FROM (SELECT name,json_build_object('value', avg) as value FROM (SELECT product_id, name, AVG(value) as avg FROM characteristics WHERE product_id=$1 GROUP BY name, characteristics.product_id ORDER BY product_id) AS averages GROUP BY name, product_id, avg) AS averages_json;", [product_id]);
  },
  postReview: () => {},
  putHelpful: () => {},
  putReport: () => {},
}
