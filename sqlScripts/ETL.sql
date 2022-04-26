CREATE DATABASE reviews;

\c reviews

CREATE TABLE reviews (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(255) NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  response VARCHAR(1000) NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TEMPORARY TABLE rev_temp (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(255) NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN NOT NULL,
  reviewer_name VARCHAR(255) NOT NULL,
  reviewer_email VARCHAR(255) NOT NULL,
  response VARCHAR(1000) NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristics'
--
-- ---

CREATE TABLE characteristics_csv (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Characteristics-Reviews'
--
-- ---

CREATE TABLE characteristics_reviews (
  id SERIAL NOT NULL,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics_csv (id),
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Photos'
--
-- ---

CREATE TABLE photos (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL REFERENCES reviews (id),
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER,
  PRIMARY KEY (id)
);

CREATE INDEX idx_product_id ON reviews(product_id);
CREATE INDEX idx_chara_prod_id ON characteristics(product_id);
CREATE INDEX idx_chara_name ON characteristics(name);
CREATE INDEX idx_chara_id ON characteristics(characteristic_id);
CREATE INDEX idx_photos_rev_id ON photos(review_id);
-- speeds up the later combination script
CREATE INDEX idx_cr_temp_c_id ON characteristics_reviews(characteristic_id);
CREATE INDEX idx_c_temp_prod_id ON characteristics_csv(product_id);
CREATE INDEX idx_c_temp_name ON characteristics_csv(name);

-- -------
-- ingress csv data into tables
--
-- -------

\copy rev_temp FROM './SDC_CSV/reviews.csv' WITH (FORMAT CSV, HEADER);

-- makes sequential ordering work
INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SELECT product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM rev_temp;

\copy photos FROM './SDC_CSV/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_csv FROM './SDC_CSV/characteristics.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_reviews FROM './SDC_CSV/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);

-- --------
-- Transform block
--
-- --------

-- ---
-- turn photos into aggregated photos arrays and updates the
-- photos column if a review has photos
--
-- ---

ALTER TABLE reviews ADD photos JSON DEFAULT '[]';

UPDATE reviews
SET photos = combined_photos.photos
FROM (
  SELECT review_id, JSON_AGG(JSON_BUILD_OBJECT('url', url)) AS photos
  FROM photos
  GROUP BY review_id) combined_photos
WHERE reviews.id = combined_photos.review_id;

-- ---
-- Combines the two characteristics tables into one
--
-- ---

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

DROP TABLE rev_temp;
DROP TABLE photos;
DROP TABLE characteristics_csv CASCADE;
DROP TABLE characteristics_reviews CASCADE;