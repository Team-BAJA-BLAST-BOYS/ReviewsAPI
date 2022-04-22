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
    return await pool.query(`
    SELECT
      id,
      product_id,
      rating,
      to_timestamp(date / 1000),
      summary,
      body,
      recommend,
      reviewer_name,
      reviewer_email,
      response,
      helpfulness,
      photos
    FROM reviews
    WHERE product_id=$1 AND reported=false
    ORDER BY id`, [product_id]);
  },
  getMeta: async (product_id) => {
    return await pool.query(`
    SELECT
      json_build_object(
        'product_id', (SELECT product_id FROM reviews WHERE product_id=$1 GROUP BY product_id),
        'ratings', (SELECT json_object_agg(rating, count) FROM (
        SELECT
          rating,
          count
        FROM (
          SELECT
            rating,
            count(rating) AS count
          FROM reviews
          WHERE product_id=$1
          GROUP BY rating
        ) a
    ) as ratings_count),
      'recommended', (SELECT json_object_agg(recommend, count) FROM (
          SELECT
            recommend,
            count
          FROM (
            SELECT
              recommend,
              count(recommend) AS count
            FROM reviews
            WHERE product_id=$1
            GROUP BY recommend
          ) a
      ) as recc_count),
      'characteristics', (SELECT json_object_agg(name, value) FROM (
          SELECT
            name,
            json_build_object('id', characteristic_id, 'value', avg) as value
          FROM (SELECT
            name,
            characteristic_id,
            AVG(value) as avg
            FROM characteristics
            WHERE product_id=$1
            GROUP BY name, characteristic_id) AS averages
          GROUP BY name, characteristic_id, avg
          ORDER BY characteristic_id
        ) as char_averages)) AS metadata;`, [product_id]);
  },
  postReview: () => {},
  putHelpful: () => {},
  putReport: () => {},
}
