const Routers = require('express').Router();
const controllers = require('./controllers/controllers');

Routers.get('/', controllers.getReviews);
Routers.get('/meta', controllers.getMeta);
Routers.post('/', controllers.getReviews);
Routers.put('/:review_id/helpful', controllers.getReviews);
Routers.put('/:review_id/helpful', controllers.getReviews);

module.exports = Routers;