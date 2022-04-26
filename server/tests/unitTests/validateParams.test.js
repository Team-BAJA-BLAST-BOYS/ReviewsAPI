const validateParams = require('../../controllers/validation/validateParams');

const query = {
  product_id: 20,
  count: 10,
  sort: 'helpfulness',
  page: 5,
};

describe('validateParams', () => {
  test('returns { status: 200 } for valid query parameters', () => {
    expect(validateParams(query)).toStrictEqual({ status: 200 });
  });

  test('returns { status: 400, text: \'Error: invalid sort provided\' } for invalid query parameters', () => {
    expect(validateParams({ ...query, product_id: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid product_id provided' });
  });

  test('returns { status: 400, text: \'Error: invalid sort provided\' } for invalid query parameters', () => {
    expect(validateParams({ ...query, sort: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid sort provided' });
  });

  test('returns { status: 400, text: \'Error: invalid count provided\' } for invalid query parameters', () => {
    expect(validateParams({ ...query, count: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid count provided' });
  });

  test('returns { status: 400, text: \'Error: invalid page provided\' } for invalid query parameters', () => {
    expect(validateParams({ ...query, page: -1 }))
      .toStrictEqual({ status: 400, text: 'Error: invalid page provided' });
  });
});
