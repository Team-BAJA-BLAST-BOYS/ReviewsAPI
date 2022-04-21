const { Client } = require('pg');

const credentials = {
  user: 'postgres',
  host: 'localhost',
  database: 'reviews2',
  password: '',
  port: 5432,
};

const client = new Client(credentials);

client.query('SELECT * FROM reviews WHERE product_id=2', (err, res) => {
  console.log(err, res)
  client.end()
})

module.exports = client;
