DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;
-- ---
-- Globals
-- ---

-- SET SQL_MODE=NO_AUTO_VALUE_ON_ZERO;
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Review'
--
-- ---

DROP TABLE IF EXISTS review CASCADE;

CREATE TABLE review (
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
  response VARCHAR(1000) NOT NULL,
  helpfulness INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Characteristics'
--
-- ---

DROP TABLE IF EXISTS characteristics CASCADE;

CREATE TABLE characteristics (
  id SERIAL NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS photos;

CREATE TABLE photos (
  review_id INTEGER NOT NULL,
  id SERIAL NOT NULL,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES review (product_id);
ALTER TABLE photos ADD FOREIGN KEY (review_id) REFERENCES review (review_id);

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
-- INSERT INTO public.review (product_id,review_id,rating,summary,recommend,response,body,date,reviewer_name,helpfulness,reported) VALUES
-- ('1','2','3','asdf',false,'dsadsa','dsadsa','2016-06-22 19:10:25-07','danny','5', false);