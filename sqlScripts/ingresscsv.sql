\copy rev_temp FROM './SDC_CSV/reviews.csv' WITH (FORMAT CSV, HEADER);

INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SELECT product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM rev_temp;

\copy photos FROM './SDC_CSV/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_csv FROM './SDC_CSV/characteristics.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_reviews FROM './SDC_CSV/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);

CREATE INDEX idx_chara_name ON characteristics(name);
CREATE INDEX idx_chara_id ON characteristics(characteristic_id);
CREATE INDEX idx_photos_rev_id ON photos(review_id);