-- inserts a new review into the reviews table
INSERT INTO reviews(
	product_id,
	rating,
	date,
	summary,
	body,
	recommend,
	reported,
	reviewer_name,
	reviewer_email,
	helpfulness,
	photos)
	VALUES(
		2,
		3,
		(extract(epoch FROM now()) * 1000)::BIGINT,
		'wow this product is so cool',
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean accumsan neque sed diam dictum, id auctor dolor accumsan. In at est arcu. Sed consectetur ut ante at faucibus. Sed eget mollis justo. Ut congue metus tortor. Maecenas orci purus, congue in dapibus ornare, facilisis sed dolor. In at magna velit. Vivamus nulla lorem, consequat a tellus quis, sagittis dignissim nunc. Nunc mollis turpis quam, non ornare nunc malesuada ac. Morbi vel nisl ultrices dolor maximus dignissim. Vestibulum aliquam mollis erat, eget ultrices neque auctor vel. Vivamus viverra dapibus risus, sollicitudin aliquam magna hendrerit sit amet. Vestibulum quis fermentum nisi.',
		true,
		false,
		'Danny',
		'danny@danny.danny',
		0,
		'[{"url":"url1.com"},{"url":"url2.com"},{"url":"url3.com"},{"url":"url4.com"}]'::JSON
	);

-- insert all the characteristics into the characteristics table
INSERT INTO characteristics(
  product_id,
  characteristic_id,
  name,
  value)
  VALUES(
    20,
    71,
    (SELECT name FROM characteristics WHERE characteristic_id=71 GROUP BY name),
    3
  );