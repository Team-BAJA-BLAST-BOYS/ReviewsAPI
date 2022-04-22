
DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

\c reviews

DROP TABLE IF EXISTS reviews CASCADE;

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

-- ---
-- Table 'characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics_csv CASCADE;

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

DROP TABLE IF EXISTS characteristics_reviews;

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

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  id SERIAL NOT NULL,
  review_id INTEGER NOT NULL REFERENCES reviews (id),
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS characteristics CASCADE;

CREATE TABLE characteristics (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  characteristic_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

GRANT ALL PRIVILEGES ON DATABASE reviews to silvergrace;
GRANT ALL PRIVILEGES ON DATABASE reviews to postgres;

CREATE INDEX idx_product_id ON reviews(product_id);
CREATE INDEX idx_chara_prod_id ON characteristics(product_id);
