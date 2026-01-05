import http from 'k6/http';
import { check } from 'k6';
import { options } from '../config/k6.config.js';
import { buildProductPayload } from '../data/product.payload.js';
import { getEnv } from '../utils/env.reader.k6.js';

export { options };

const env = getEnv();
const BASE_URL = env.baseUrl;

export default function () {
  const payload = buildProductPayload();

  const headers = {
    'Content-Type': 'application/json',
  };

  const res = http.post(`${BASE_URL}/products`, payload, { headers });

  check(res, {
    'status 200 or 201': r => r.status === 200 || r.status === 201,
  });
}
