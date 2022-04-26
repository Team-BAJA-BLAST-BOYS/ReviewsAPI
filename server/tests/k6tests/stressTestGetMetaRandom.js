import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 250 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '10s', target: 250 },
  ],
};

export default function () {
  const res = http.get(`http://localhost:3003/reviews?product_id=${Math.floor(Math.random() * 1000000)}`);
  check(res, { 'status was 200': (r) => r.status === 200 });
  sleep(1);
};
