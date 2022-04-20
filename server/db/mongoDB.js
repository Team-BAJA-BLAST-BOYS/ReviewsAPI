
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/reviews');

const ratings = Schema({
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
});

const recommend = Schema({
  false: 0,
  true: 0,
});

const characteristics = Schema({
  Fit: 0,
  Size: 0,
  Length: 0,
  Width: 0,
  Quality: 0,
  Comfort: 0,
});

const metaDataSchema = new mongoose.Schema({
  ratings: Array<ratings>,
  recommended: Array<recommend>,
  characteristics: Array<characteristics>,
});

const reviewSchema = new mongoose.Schema({
  rating: Number,
  date: String,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number,
});

const metaData = mongoose.model('MetaData', metaDataSchema);
const reviews = mongoose.model('Reviews', reviewSchema);

module.exports = {
  metaData,
  reviews,
}