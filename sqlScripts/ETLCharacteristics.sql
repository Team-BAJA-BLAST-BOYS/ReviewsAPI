INSERT INTO characteristics(characteristic_id, product_id, name, value)
SELECT x.characteristic_id, x.product_id, x.name, t.value
FROM (
  SELECT generate_series(min(id), max(id)) AS characteristic_id, product_id, name
  FROM  characteristics_csv
  GROUP BY product_id, name
) x
LEFT JOIN characteristics_reviews t
ON x.characteristic_id = t.characteristic_id
ORDER BY x.product_id;

DROP TABLE characteristics_csv CASCADE;
DROP TABLE characteristics_reviews CASCADE;
