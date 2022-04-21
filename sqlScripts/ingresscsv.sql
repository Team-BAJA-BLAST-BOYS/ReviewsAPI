\c reviews2

\copy reviews FROM './SDC_CSV/reviews.csv' WITH (FORMAT CSV, HEADER);

\copy photos FROM './SDC_CSV/reviews_photos.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_csv FROM './SDC_CSV/characteristics.csv' WITH (FORMAT CSV, HEADER);

\copy characteristics_reviews FROM './SDC_CSV/characteristic_reviews.csv' WITH (FORMAT CSV, HEADER);
