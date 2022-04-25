const validatePutParams = require('../../controllers/validation/validatePutParams');

describe('validatePutParams', () => {
  test('returns { status: 200 } for valid put params', () => {
    expect(validatePutParams(200)).toStrictEqual({ status: 200 });
    expect(validatePutParams(65462642)).toStrictEqual({ status: 200 });
  });

  test('returns { status: 400, text: \'Error: invalid review_id provided\' }', () => {
    expect(validatePutParams('hello')).toStrictEqual({ status: 400, text: 'Error: invalid review_id provided' });
    expect(validatePutParams('1432dds')).toStrictEqual({ status: 400, text: 'Error: invalid review_id provided' });
  });
});
