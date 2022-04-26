const request = require('supertest');
const app = require('../../index');

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

describe('GET /reviews', () => {
  describe('on successful GET', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/reviews?product_id=20');
      expect(response.statusCode).toEqual(200);
    });
    test('should specify json in the content type header', async () => {
      const response = await request(app).get('/reviews?product_id=20');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
  describe('on failed GET', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).get('/reviews?product_id="hello"');
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('GET /reviews/meta', () => {
  describe('on successful GET', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get('/reviews/meta?product_id=20');
      expect(response.statusCode).toEqual(200);
    });
    test('should specify json in the content type header', async () => {
      const response = await request(app).get('/reviews/meta?product_id=20');
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
  });
  describe('on failed GET', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).get('/reviews/meta?product_id="hello"');
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('POST /reviews', () => {
  describe('on successful GET', () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post('/reviews').send(postBody);
      expect(response.statusCode).toEqual(201);
    });
  });
  describe('on failed POST', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).post('/reviews').send('hehe');
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('PUT /reviews/:review_id/helpful', () => {
  describe('on successful PUT', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).put('/reviews/5774954/helpful');
      expect(response.statusCode).toEqual(200);
    });
  });
  describe('on failed PUT', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).put('/reviews/hehe/helpful');
      expect(response.statusCode).toBe(400);
    });
  });
});

describe('PUT /reviews/:review_id/report', () => {
  describe('on successful PUT', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).put('/reviews/5774954/report');
      expect(response.statusCode).toEqual(200);
    });
  });
  describe('on failed PUT', () => {
    test('should respond with a 400 status code', async () => {
      const response = await request(app).put('/reviews/hehe/report');
      expect(response.statusCode).toBe(400);
    });
  });
});
