const characteristics = {
  '71': 1,
  '72': 4,
  '73': 3,
  '74': 2
};

Object.entries(characteristics)
  .forEach((characteristic) => (
    await pool.query(`
      INSERT INTO characteristics
        product_id,
        characteristic_id,
        name,
        value)
      VALUES(
        $1, $2, (SELECT name FROM characteristics WHERE characteristic_id=$2 GROUP BY name), $3);
    `, [charateristic[0], characteristic[1]]);
  ));

  const result2 = await Object.entries(review.characteristics)
  .forEach((characteristic) => {
    pool.query(`
      INSERT INTO characteristics
        product_id,
        characteristic_id,
        name,
        value)
      VALUES(
        $1, $2, (SELECT name FROM characteristics WHERE characteristic_id=$2 GROUP BY name), $3);
    `, [review.product_id, charateristic[0], characteristic[1]]);
      });