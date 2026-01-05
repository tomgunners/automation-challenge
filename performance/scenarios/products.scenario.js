import list from '../scripts/products.list.k6.js';
import get from '../scripts/products.get.k6.js';
import create from '../scripts/products.create.k6.js';
//import { options } from '../config/k6.config.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

// Exporta opções
//export { options };

// Cenário principal
export default function () {
  list();
  get();
  create();
}

/**
 * ⚠ handleSummary PRECISA ser defensivo
 */
export function handleSummary(data) {
  if (!data) {
    console.error('❌ handleSummary recebeu data undefined');
    return {};
  }

  return {
    'results/report.html': htmlReport(data),
    stdout: JSON.stringify(
      {
        checks: data.root_group?.checks,
        http_reqs: data.metrics?.http_reqs?.values?.count,
      },
      null,
      2
    ),
  };
}
