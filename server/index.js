require('dotenv').config();
const express = require('express');
const Routers = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/reviews', Routers);

app.listen(port, console.log(`listening on port: ${port}`));
