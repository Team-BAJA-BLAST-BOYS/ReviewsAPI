import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 100 }, // below normal load
    { duration: '10s', target: 100 },
    { duration: '20s', target: 250 }, // normal load
    { duration: '20s', target: 500 },
    { duration: '25s', target: 500 }, // around the breaking point
    { duration: '25s', target: 750 },
    { duration: '10s', target: 1000 }, // beyond the breaking point
    { duration: '10s', target: 1000 },
    { duration: '10s', target: 300 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3003/reviews/';

  const responses = http.batch([
    ['GET', `${BASE_URL}?product_id=20&count=5&sort=helpfulness&page=1`, null, { }],
    ['GET', `${BASE_URL}?product_id=21&count=5&sort=helpfulness&page=1`, null, { }],
    ['GET', `${BASE_URL}?product_id=22&count=5&sort=helpfulness&page=1`, null, { }],
    ['GET', `${BASE_URL}?product_id=23&count=5&sort=helpfulness&page=1`, null, { }],
  ]);

  sleep(1);
}
