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
          ORDER BY characteristic_id
				) as char_averages)) AS metadata;


SELECT x.chara_id, x.product_id, x.name, t.value
FROM (
SELECT generate_series(min(id), max(id)) AS chara_id, product_id, name
FROM  characteristic_csv
) x
LEFT JOIN char_rev_csv t USING (chara_id)
ORDER BY t.id;
