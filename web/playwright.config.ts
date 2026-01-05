import { defineConfig } from '@playwright/test';
import { getEnv } from '../shared/utils/getEnv';

const env = getEnv();

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,

  use: {
    viewport: { width: 1280, height: 720 },
    //baseURL: env.web.baseUrl,
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', {
        outputFolder: 'playwright-report',
        open: 'never',
        clean: true
    }],
    ['allure-playwright', {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false,
    }],
  ],

  projects: [
    {
      name: 'Google Chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
});
