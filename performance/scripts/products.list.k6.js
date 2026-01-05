import http from 'k6/http';
import { check } from 'k6';
import { options } from '../config/k6.config.js';
import { getEnv } from '../utils/env.reader.k6.js';

export { options };

const env = getEnv();
const BASE_URL = env.baseUrl;

export default function () {
  const res = http.get(`${BASE_URL}/products`);

  check(res, {
    'status 200': r => r.status === 200,
    'response time < 800ms': r => r.timings.duration < 800,
  });
}


