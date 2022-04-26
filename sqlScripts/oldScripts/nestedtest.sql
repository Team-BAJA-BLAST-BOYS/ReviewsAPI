-- this does NOT work
SELECT
	  json_object_agg(ratings_count.rating, b.ratings_count) as ratings,
    json_object_agg(b.recommend, b.recommend_count) as recommended,
    json_object_agg(b.char_name, b.char_val) as characteristics
	FROM (
		SELECT
      product_id,
			char_name,
			json_build_object('value', char_avg) as char_val,
      rating,
      rating_count,
      recommend,
      recommend_count
			FROM (SELECT
        product_id,
				char_name,
				AVG(value) as char_avg,
        rating,
        count(rating) as rating_count,
        recommend,
        count(recommend) as recommend_count,
				FROM characteristics, reviews
				WHERE product_id=2
				GROUP BY char_name, rating, recommend) AS a
			GROUP BY product_id
	) AS b,

-- returns correct information but it's duplicated
SELECT
    json_object_agg(ratings_count.rating, ratings_count.count) as ratings,
    json_object_agg(recc_count.recommend, recc_count.count) as recommended,
    json_object_agg(averages_json.name, averages_json.value) as characteristics
	FROM (
		SELECT
			name,
			json_build_object('value', avg) as value
			FROM (SELECT
				name,
				AVG(value) as avg
				FROM characteristics
				WHERE product_id=2
				GROUP BY name) AS averages
			GROUP BY name, avg
	) AS averages_json,
	(
		SELECT
			rating,
			count
			FROM (
				SELECT
					rating,
					count(rating) AS count
				FROM reviews
				WHERE product_id=2
				GROUP BY rating
			) a
	) as ratings_count,
	(
		SELECT
			recommend,
			count
			FROM (
				SELECT
					recommend,
					count(recommend) AS count
				FROM reviews
				WHERE product_id=2
				GROUP BY recommend
			) a
	) as recc_count;

SELECT
*
--     json_build_object(
--       'ratings', json_object_agg(ratings_count.rating, ratings_count.count),
--       'recommended', json_object_agg(recc_count.recommend, recc_count.count),
--       'characteristics', json_object_agg(averages_json.name, averages_json.value)
--     )
	FROM (
		SELECT
			name,
			json_build_object('id', characteristic_id, 'value', avg) as value
			FROM (SELECT
				name,
				characteristic_id,
				AVG(value) as avg
				FROM characteristics
				WHERE product_id=2
				GROUP BY name, characteristic_id) AS averages
			GROUP BY name, avg, characteristic_id
	) AS averages_json,
	(
		SELECT
			rating,
			count
			FROM (
				SELECT
					rating,
					count(rating) AS count
				FROM reviews
				WHERE product_id=2
				GROUP BY rating
			) a
	) as ratings_count,
	(
		SELECT
			recommend,
			count
			FROM (
				SELECT
					recommend,
					count(recommend) AS count
				FROM reviews
				WHERE product_id=2
				GROUP BY recommend
			) a
	) as recc_count;

-- bIG NESTED THING THAT GIVES ME META DATA
SELECT
     json_build_object(
       'ratings', (SELECT json_object_agg(rating, count) FROM (
		   SELECT
				rating,
				count
				FROM (
					SELECT
						rating,
						count(rating) AS count
					FROM reviews
					WHERE product_id=2
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
						WHERE product_id=2
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
						WHERE product_id=2
						GROUP BY name, characteristic_id) AS averages
					GROUP BY name, characteristic_id, avg
				) as char_averages));

-- this one has an extra query for the product_id

SELECT
     json_build_object(
	   'product_id', (SELECT product_id FROM reviews WHERE product_id=2 GROUP BY product_id),
       'ratings', (SELECT json_object_agg(rating, count) FROM (
		   SELECT
				rating,
				count
				FROM (
					SELECT
						rating,
						count(rating) AS count
					FROM reviews
					WHERE product_id=2
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
						WHERE product_id=2
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
						WHERE product_id=2
						GROUP BY name, characteristic_id) AS averages
					GROUP BY name, characteristic_id, avg
          ORDER BY characteristic_id
				) as char_averages)) AS metadata;
