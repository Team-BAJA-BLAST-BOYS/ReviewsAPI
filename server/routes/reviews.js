const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();

module.exports = router;

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query(/*query goes here */, [id]);
  res.send(rows[0]);
});
