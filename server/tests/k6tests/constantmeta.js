import http from 'k6/http';

export const options = {
  insecureSKIPTLSVerify: true,
  noConnectionReuse: false,
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 20,
      maxVUs: 100,
    },
  },
};

export default () => {
  http.get(`http://localhost:3003/reviews/meta?product_id=${Math.floor(Math.random() * 1000000)}`);
};
