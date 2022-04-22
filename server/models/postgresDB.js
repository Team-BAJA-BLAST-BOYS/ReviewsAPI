const { Pool } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'reviews2',
  password: '',
  port: 5432,
};

const pool = new Pool(credentials);

pool.connect();

module.exports = {
  getReviews: (product_id) => {
    return new Promise((resolve, reject) => {
      pool.query(`SELECT id, product_id, rating, date, summary, body, recommend,reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=${product_id} AND reported=false ORDER BY id`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });;
    })
  },
  getMeta: () => {},
  postReview: () => {},
  putHelpful: () => {},
  putReport: () => {},
}
