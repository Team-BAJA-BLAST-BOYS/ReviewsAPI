ALTER TABLE reviews ADD photos JSON DEFAULT '[]';

-- CREATE TABLE combined_photos AS SELECT review_id, STRING_TO_ARRAY(STRING_AGG(url, ','),',') AS photos FROM photos GROUP BY review_id;

-- UPDATE reviews
-- SET photos = combined_photos.photos
-- FROM (SELECT review_id, STRING_AGG(url, ',') AS photos FROM photos GROUP BY review_id) combined_photos
-- WHERE reviews.id = combined_photos.review_id;

UPDATE reviews
SET photos = combined_photos.photos
FROM (SELECT review_id, JSON_AGG(JSON_BUILD_OBJECT('url', url)) AS photos FROM photos GROUP BY review_id) combined_photos
WHERE reviews.id = combined_photos.review_id;

DROP TABLE photos;

-- SELECT review_id, JSON_AGG(JSON_BUILD_OBJECT('url', url)) FROM photos GROUP BY review_id;
