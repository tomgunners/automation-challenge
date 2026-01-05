export const options = {
  scenarios: {
    products_performance_validation: {
      executor: 'ramping-vus',

      startVUs: 0,
      stages: [
        { duration: '30s', target: 5 },   // ramp-up inicial
        { duration: '1m', target: 5 },    // carga sustentada
        { duration: '30s', target: 10 },  // aumento de pressão
        { duration: '1m', target: 10 },   // validação de SLA
        { duration: '30s', target: 0 },   // ramp-down
      ],

      gracefulRampDown: '10s',
      gracefulStop: '30s',

      // Tags (Grafana / Reports)
      tags: {
        test_type: 'performance_validation',
        test_level: 'api',
        domain: 'products',
        owner: 'qa',
        execution: 'pre-release',
      },
    },
  },

  // 🎯 CONTRATOS DE PERFORMANCE (SLA)
  thresholds: {
    // Tempo de resposta (API)
    http_req_duration: [
      'p(95)<800',     // SLA principal
      'p(99)<1200',    // tolerância máxima
      'avg<500',
    ],

    // Taxa de erro
    http_req_failed: [
      'rate<0.01',     // < 1%
    ],

    // Throughput mínimo esperado
    http_reqs: [
      'rate>10',       // garante carga mínima
    ],

    // Checks funcionais
    checks: [
      'rate>0.99',     // 99% de sucesso funcional
    ],
  },

  // 📊 Métricas para análise
  summaryTrendStats: [
    'avg',
    'min',
    'med',
    'max',
    'p(90)',
    'p(95)',
    'p(99)',
  ],

  // ⚙️ Configurações globais
  noConnectionReuse: false,
  userAgent: 'k6-qa-performance-validation',

  // 🔐 Segurança e diagnóstico
  discardResponseBodies: false,
};
