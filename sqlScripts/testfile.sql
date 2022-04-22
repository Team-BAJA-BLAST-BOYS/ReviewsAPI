
-- finds the average for each characteristic for a specified id
SELECT product_id, name, AVG(value) as avg FROM characteristics WHERE product_id=1 GROUP BY name, characteristics.product_id ORDER BY product_id;

-- creates json objects in the shape of
-- {
--   'Quality': {
--     'id': 4,
--     'value': 4
--   }
-- }
-- for each row in the characteristics table
SELECT product_id, JSON_BUILD_OBJECT(name, JSON_BUILD_OBJECT('id', id, 'value', (AVG(value)))) AS avg FROM characteristics WHERE product_id=1 GROUP BY name, id, characteristics.product_id ORDER BY product_id;

-- same as above but without the id in the inner object
SELECT product_id, JSON_BUILD_OBJECT(name, JSON_BUILD_OBJECT('value', (AVG(value)))) AS avg FROM characteristics WHERE product_id=1 GROUP BY name, id, characteristics.product_id ORDER BY product_id;

SELECT product_id,
JSON_BUILD_OBJECT(name,
JSON_BUILD_OBJECT('value',
(SELECT AVG(value)
AS avg
FROM characteristics
WHERE product_id=1
GROUP BY characteristics.product_id) avg_values))
AS avg
FROM characteristics
WHERE product_id=1
GROUP BY name, id, characteristics.product_id
ORDER BY product_id;

-- creates json objects for each row in the table created by the select function
SELECT
	product_id,
	json_build_object(
		name, json_build_object('value', avg)
	)
	FROM (SELECT
		product_id,
		name,
		AVG(value) as avg
		FROM characteristics
		WHERE product_id=1
		GROUP BY name, characteristics.product_id
		ORDER BY product_id) AS averages
	GROUP BY name, product_id, avg;

-- creates json objects for characteristics based on product id
SELECT
	json_build_object(
	'characteristic', json_object_agg(averages_json.name, averages_json.value)
	)
	FROM (
		SELECT
			name,
			json_build_object('value', avg) as value
			FROM (SELECT
				product_id,
				name,
				AVG(value) as avg
				FROM characteristics
				WHERE product_id=1
				GROUP BY name, characteristics.product_id
				ORDER BY product_id) AS averages
			GROUP BY name, product_id, avg
	) AS averages_json;

-- same as above but it's a column named characteristics
SELECT
	json_object_agg(averages_json.name, averages_json.value) as characteristics
	FROM (
		SELECT
			name,
			json_build_object('value', avg) as value
			FROM (SELECT
				product_id,
				name,
				AVG(value) as avg
				FROM characteristics
				WHERE product_id=1
				GROUP BY name, characteristics.product_id
				ORDER BY product_id) AS averages
			GROUP BY name, product_id, avg
	) AS averages_json;

-- returns a table that has rating and the # of times that rating shows up in two different columns
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
	) AS ratings_count;

-- returns ratings as a json object labeled ratings
SELECT
	json_object_agg(ratings_count.rating, ratings_count.count) as ratings
	FROM (
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
	) as ratings_count;

-- returns # of recommended as a json object labeled recommended
SELECT
	json_object_agg(recc_count.recommend, recc_count.count) as recommended
	FROM (
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
