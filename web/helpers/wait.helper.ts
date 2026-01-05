import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page) {
  await page.waitForLoadState('networkidle');
}
