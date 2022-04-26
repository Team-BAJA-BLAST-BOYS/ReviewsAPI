const express = require('express');
const Routers = require('./routes');

const app = express();

app.use(express.json());
app.use('/reviews', Routers);

module.exports = app;
