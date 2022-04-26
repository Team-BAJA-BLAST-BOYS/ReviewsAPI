INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SELECT product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM rev_temp;