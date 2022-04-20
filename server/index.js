const express = require('express');
const { pool } = require('./db/postgresDB');

const app = express();
const port = 3003;

app.listen(port, console.log(`listening on port: ${port}`));
