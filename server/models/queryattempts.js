// const sql = 'SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY $2 DESC LIMIT $3 OFFSET $4'

    // const values = [query.product_id, sort[query.sort], query.count];

    // const queryLiterals = `
    //   SELECT
    //     id,
    //     product_id,
    //     rating,
    //     to_timestamp(date / 1000) AS date,
    //     summary,
    //     body,
    //     recommend,
    //     reviewer_name,
    //     reviewer_email,
    //     response,
    //     helpfulness,
    //     photos
    //   FROM reviews
    //   WHERE product_id=${query.product_id} AND reported=false
    //   ORDER BY ${sort[query.sort]}
    //   LIMIT ${query.count}`


          // const result = await pool.query('SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY $2 LIMIT $3', [query.product_id, sort[query.sort], query.count || 5])
      // const result = await pool.query('SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=20 AND reported=false ORDER BY $1 LIMIT 5', [sort[query.sort]])
      // const result = await pool.query(sort[query.sort] ,values);
      // const result = await pool.query(sql, values);
      // const result = await pool.query(queryLiterals);

          // const sort = {
    //   relevance: 'SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY helpfulness DESC, date DESC LIMIT $2',
    //   helpfulness: 'SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY helpfulness DESC LIMIT $2',
    //   newest: 'SELECT id, product_id, rating, to_timestamp(date / 1000) AS date, summary, body, recommend, reviewer_name, reviewer_email, response, helpfulness, photos FROM reviews WHERE product_id=$1 AND reported=false ORDER BY date DESC LIMIT $2'
    // };
