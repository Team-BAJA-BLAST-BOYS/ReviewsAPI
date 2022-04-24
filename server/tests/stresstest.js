import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 25 }, // below normal load
    { duration: '10s', target: 25 },
    { duration: '20s', target: 25 }, // normal load
    { duration: '20s', target: 50 },
    { duration: '25s', target: 50 }, // around the breaking point
    { duration: '25s', target: 50 },
    { duration: '25s', target: 75 }, // beyond the breaking point
    { duration: '25s', target: 75 },
    { duration: '10s', target: 10 }, // scale down. Recovery stage.
  ],
};

export default function () {
  const BASE_URL = 'http://localhost:3003/reviews/';

  const responses = http.batch([
    ['GET', `${BASE_URL}?product_id=20`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}?product_id=21`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}?product_id=22`, null, { tags: { name: 'PublicCrocs' } }],
    ['GET', `${BASE_URL}?product_id=23`, null, { tags: { name: 'PublicCrocs' } }],
  ]);

  sleep(1);
}
