import { defineConfig } from '@playwright/test';
import { getEnv } from '../shared/utils/getEnv';

const env = getEnv();

// 🔎 LOGS DE DIAGNÓSTICO (executam no CI)
console.log('🔧 Playwright API Config');
console.log('ENV:', process.env.ENV);
console.log('API Base URL:', env.api.baseUrl);
console.log('API Timeout:', env.api.timeout);

export default defineConfig({
  testDir: './tests',

  // 🚨 IMPORTANTE: globalSetup precisa ser STRING (path)
  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: env.api.baseUrl,
    timeout: env.api.timeout,
    headless: true,

    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) ' +
        'Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
    },

    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
      },
    ],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false,
      },
    ],
  ],
});
