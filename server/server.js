require('dotenv').config();
const app = require('./index');

const port = process.env.PORT || 3000;

app.listen(port, console.log(`listening on port: ${port}`));
