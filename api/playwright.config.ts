import { defineConfig } from '@playwright/test';
import { getEnv } from '../shared/utils/getEnv';

const env = getEnv();

export default defineConfig({
  testDir: './tests',

  // 🚨 IMPORTANTE: globalSetup precisa ser STRING (path)
  globalSetup: require.resolve('./global-setup'),

  use: {
 //   baseURL: env.api.baseUrl,
    baseURL: 'https://fakestoreapi.com',
 //   timeout: env.api.timeout,

    extraHTTPHeaders: {
      'Content-Type': 'application/json',
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
