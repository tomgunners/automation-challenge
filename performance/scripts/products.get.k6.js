import http from 'k6/http';
import { check } from 'k6';
import { options } from '../config/k6.config.js';
import { getEnv } from '../utils/env.reader.k6.js';

const env = getEnv();
const BASE_URL = env.baseUrl;

export { options };

export default function () {
  const res = http.get(`${BASE_URL}/products/1`);

  check(res, {
    'status 200': r => r.status === 200,
    'produto possui id': r => JSON.parse(r.body).id === 1,
  });
}
