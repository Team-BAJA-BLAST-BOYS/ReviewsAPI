const validateParams = require('../../controllers/validation/validateParams');

const goodQuery = {
  product_id: 20,
  count: 10,
  sort: 'helpfulness',
  page: 5,
}

const badId = {
  product_id: 'fds',
  count: 4,
  sort: '',
  page: 1,
}

const badSort = {
  product_id: 15,
  count: 4,
  sort: 'fkdsfd',
  page: 1,
}

const badCount = {
  product_id: 15,
  count: 'afd',
  sort: 'fkdsfd',
  page: 1,
}

const badPage = {
  product_id: 15,
  count: 4,
  sort: '',
  page: -5,
}

test('returns { status: 200 } for valid query parameters', () => {
  expect(validateParams(goodQuery)).toStrictEqual({ status: 200 });
});

test('returns { status: 422, text: \'Error: invalid sort provided\' } for invalid query parameters', () => {
  expect(validateParams(badSort)).toStrictEqual({status: 422, text: 'Error: invalid sort provided'});
});

test('returns { status: 422, text: \'Error: invalid sort provided\' } for invalid query parameters', () => {
  expect(validateParams(badSort)).toStrictEqual({status: 422, text: 'Error: invalid sort provided'});
});

test('returns { status: 422, text: \'Error: invalid count provided\' } for invalid query parameters', () => {
  expect(validateParams(badCount)).toStrictEqual({status: 422, text: 'Error: invalid count provided'});
});

test('returns { status: 422, text: \'Error: invalid page provided\' } for invalid query parameters', () => {
  expect(validateParams(badPage)).toStrictEqual({status: 422, text: 'Error: invalid page provided'});
});
