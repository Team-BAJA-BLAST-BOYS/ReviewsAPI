INSERT INTO characteristics (product_id, characteristic_id, name, value)
SELECT characteristics_csv.product_id, characteristics_reviews.characteristic_id, characteristics_csv.name, characteristics_reviews.value
FROM characteristics_csv INNER JOIN characteristics_reviews
ON characteristics_reviews.id = characteristics_csv.id
ORDER BY characteristics_csv.id;

DROP TABLE characteristics_csv CASCADE;
DROP TABLE characteristics_reviews;





CREATE TABLE characteristics AS
SELECT x.characteristic_id, x.product_id, x.name, t.value
FROM (
  SELECT generate_series(min(id), max(id)) AS characteristic_id, product_id, name
  FROM  characteristics_csv
  GROUP BY product_id, name
) x
LEFT JOIN characteristics_reviews t
ON x.characteristic_id = t.characteristic_id
ORDER BY x.product_id;
