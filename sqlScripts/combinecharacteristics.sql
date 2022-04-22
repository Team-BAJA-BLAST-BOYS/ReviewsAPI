INSERT INTO characteristics (id, product_id, name, value)
SELECT characteristics_reviews.id, characteristics_csv.product_id, characteristics_csv.name, characteristics_reviews.value
FROM characteristics_csv INNER JOIN characteristics_reviews
ON characteristics_csv.id = characteristics_reviews.characteristic_id
ORDER BY characteristics_reviews.characteristic_id;

DROP TABLE characteristics_csv CASCADE;
DROP TABLE characteristics_reviews;
