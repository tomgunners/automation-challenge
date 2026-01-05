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
