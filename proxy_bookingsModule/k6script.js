const http = require('k6/http');
const { check, sleep } = require('k6');

export const options = {
  vus: 100,
  duration: '1m',
};

export default function () {
  let res = http.get(`http://localhost:3000/bookings/${Math.floor(Math.random() * 10000000) + 1}`);
  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 350,
  });
  sleep(0.1);
}
