const validate = require('../../controllers/validation/validatePostBody');

const postBody = {
  product_id: 3,
  rating: 1,
  summary: 'I HATE THIS PRODUCT !! ! ! !',
  body: "Wow. Such a bad product, I don't only not like it but I will post photos of dogs instead to cheer up anyone who bought this item.",
  recommend: false,
  name: 'Danny',
  email: 'danny@danny.com',
  photos: ['https://i.imgur.com/5Ne6RVR.jpeg', 'https://i.imgur.com/yHLN7Se.jpeg', 'https://i.imgur.com/36BDupu.jpeg'],
  characteristics: {
    6: 1,
    7: 4,
    8: 3,
    9: 2,
  },
};

describe('validateEmail', () => {
  test('returns true if valid email is provided', () => {
    expect(validate.email('hello@world.com')).toBe(true);
  });

  test('returns false if invalid email is provided', () => {
    expect(validate.email('helloworld123')).toBe(false);
  });
});

describe('checkObj', () => {
  test('returns true if passed in object is an object', () => {
    expect(validate.obj({ key: 'key' })).toBe(true);
  });

  test('returns false if passed in object is not an object', () => {
    expect(validate.obj(['hello'])).toBe(false);
  });
});

describe('checkCharacteristicEntries', () => {
  test('returns true if all entries in characteristics conform to syntax', () => {
    expect(validate.chara(postBody.characteristics)).toBe(true);
  });

  test('returns false if values in characteristics do not conform to syntax', () => {
    expect(validate.chara({ ...postBody.characteristics, 6: 'hello' })).toBe(false);
  });

  test('returns false if keys in characteristics do not conform to syntax', () => {
    expect(validate.chara({ ...postBody.characteristics, hello: 6 })).toBe(false);
  });
});

describe('validatePostBody', () => {
  test('returns { status: 201 } for valid postBody entries', () => {
    expect(validate.postBody(postBody)).toStrictEqual({ status: 201 });
  });

  test('returns { status: 400, text: \'Error: invalid product_id provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, product_id: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid product_id provided' });
  });

  test('returns { status: 400, text: \'Error: invalid rating provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, rating: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid rating provided' });
  });

  test('returns { status: 400, text: \'Error: invalid summary provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, summary: 54 }))
      .toStrictEqual({ status: 400, text: 'Error: invalid summary provided' });
  });

  test('returns { status: 400, text: \'Error: invalid body provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, body: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid body provided' });
  });

  test('returns { status: 400, text: \'Error: invalid name provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, name: 1337 }))
      .toStrictEqual({ status: 400, text: 'Error: invalid name provided' });
  });

  test('returns { status: 400, text: \'Error: invalid email provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, email: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid email provided' });
  });

  test('returns { status: 400, text: \'Error: invalid photos provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, photos: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid photos provided' });
  });

  test('returns { status: 400, text: \'Error: invalid photos provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, photos: [1, 2, 3] }))
      .toStrictEqual({ status: 400, text: 'Error: invalid photos provided' });
  });

  test('returns { status: 400, text: \'Error: invalid characteristics provided\' } for invalid query parameters', () => {
    expect(validate.postBody({ ...postBody, characteristics: 'hello' }))
      .toStrictEqual({ status: 400, text: 'Error: invalid characteristics provided' });
  });
});
