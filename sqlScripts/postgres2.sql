
DROP DATABASE IF EXISTS reviews2;
CREATE DATABASE reviews2;
-- ---
-- Globals
-- ---

-- SET SQL_MODE=NO_AUTO_VALUE_ON_ZERO;
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Review'
--
-- ---

\c reviews2

DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE reviews (
  id SERIAL NOT NULL UNIQUE,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date VARCHAR(32) NOT NULL,
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
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

GRANT ALL PRIVILEGES ON DATABASE reviews2 to silvergrace;
GRANT ALL PRIVILEGES ON DATABASE reviews2 to postgres;
-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE Characteristics ADD FOREIGN KEY (product_id) REFERENCES Review (product_id);
-- ALTER TABLE Characteristics-Reviews ADD FOREIGN KEY (characteristic_id) REFERENCES Characteristics (id);
-- ALTER TABLE Photos ADD FOREIGN KEY (review_id) REFERENCES Review (review_id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Review ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Characteristics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Photos ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO Review (product_id,review_id,rating,summary,recommend,response,body,date,reviewer_name,helpfulness,reported) VALUES
-- ('','','','','','','','','','','');
-- INSERT INTO Characteristics (id,product_id,name,value) VALUES
-- ('','','','');
-- INSERT INTO Photos (review_id,id,url) VALUES
-- ('','','');