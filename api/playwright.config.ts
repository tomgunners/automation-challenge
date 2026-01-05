import { defineConfig } from '@playwright/test';
import { getEnv } from '../shared/utils/getEnv';

const env = getEnv();

export default defineConfig({
  testDir: './tests',

  // 🚨 IMPORTANTE: globalSetup precisa ser STRING (path)
  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: env.api.baseUrl,
    timeout: env.api.timeout,

    extraHTTPHeaders: {
      'Accept': 'application/json',
      'User-Agent': 'Playwright-API-Tests'
    },

    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],

    ['allure-playwright', {
      outputFolder: 'allure-results',
      detail: true,
      suiteTitle: false,
    }],
  ],
});
