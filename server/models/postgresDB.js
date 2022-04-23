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
      to_timestamp(date / 1000) AS date,
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
    try {
      const result = await pool.query(`
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
      return result;
    } catch (error) {
      return error;
    }
  },
  postReview: (review) => {
    const photos = JSON.stringify(review.photos.map((url) => ({ 'url': url })));
    const queries = Object.entries(review.characteristics).map((characteristic) => {
        return new Promise((resolve, reject) => {
          resolve(pool.query(
            `INSERT INTO characteristics(
            product_id,
            characteristic_id,
            name,
            value)
            VALUES(
              $1,
              $2,
              (SELECT name FROM characteristics WHERE characteristic_id=$2 GROUP BY name),
              $3
            );`, [review.product_id, characteristic[0], characteristic[1]]));
        })
      });
      queries.push(new Promise((resolve, reject) => {
        resolve(
          pool.query(`
            INSERT INTO reviews(
              product_id,
              rating,
              date,
              summary,
              body,
              recommend,
              reported,
              reviewer_name,
              reviewer_email,
              helpfulness,
              photos)
              VALUES($1, $2, (extract(epoch FROM now()) * 1000)::BIGINT, $3, $4, $5, false, $6, $7, 0, $8);`,
                  [review.product_id, review.rating, review.summary, review.body, review.recommend, review.name, review.email, photos]));
      }));
    const results = Promise.all(queries);
    return results;
},
  putHelpful: async (review_id) => {
    try {
      await pool.query(`
        UPDATE reviews
        SET helpfulness = helpfulness + 1
        WHERE id=$1;`, [review_id]);
      return 'Helpfulness successfully updated';
    } catch (error) {
      return error;
    }
  },
    putReport: async (review_id) => {
      try {
        await pool.query(`
      UPDATE reviews
      SET reported = NOT reported
      WHERE id=$1;`, [review_id]);
        return 'Review successfully reported';
      } catch (error) {
        return error;
      }
    },
}
