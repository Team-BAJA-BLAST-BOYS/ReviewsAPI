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

\copy rev_temp FROM './SDC_CSV/reviews.csv' WITH (FORMAT CSV, HEADER);

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

INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
SELECT product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM rev_temp;

DROP rev_temp;

ALTER TABLE reviews ADD photos JSON DEFAULT '[]';

CREATE TEMPORARY TABLE photos_temp (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL REFERENCES reviews (id),
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

\copy photos_temp FROM './SDC_CSV/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

UPDATE reviews
SET photos = combined_photos.photos
FROM (SELECT review_id, JSON_AGG(JSON_BUILD_OBJECT('url', url)) AS photos FROM photos_temp GROUP BY review_id) combined_photos
WHERE reviews.id = combined_photos.review_id;

DROP TABLE photos_temp;

CREATE TEMPORARY TABLE characteristics_temp (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

\copy characteristics_temp FROM './SDC_CSV/characteristics.csv' WITH (FORMAT CSV, HEADER);

CREATE TEMPORARY TABLE characteristics_reviews_temp (
  id SERIAL NOT NULL,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics_temp (id),
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

\copy characteristics_reviews_temp FROM './SDC_CSV/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);

CREATE TABLE characteristics (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO characteristics (product_id, characteristic_id, name, value)
SELECT characteristics_temp.product_id, characteristics_reviews_temp.characteristic_id, characteristics_temp.name, characteristics_reviews_temp.value
FROM characteristics_temp INNER JOIN characteristics_reviews_temp
ON characteristics_temp.id = characteristics_reviews_temp.characteristic_id;

CREATE INDEX idx_product_id ON reviews(product_id);
CREATE INDEX idx_chara_prod_id ON characteristics(product_id);
