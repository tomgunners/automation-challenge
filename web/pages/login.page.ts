import { Page, expect } from '@playwright/test';
import testUsers from '../data/testUsers.json';
import { logger } from '@shared/utils/logger';
import { LoginLocators } from './locators/login.locators';

export class LoginPage {
  constructor(public readonly page: Page) {}

  async open() {
    logger.info('Abrindo página de login');
    await this.page.goto('/');
  }

  async loginStandardUser() {
    logger.info('Realizando login com usuário padrão');

    await this.page.fill(LoginLocators.usernameInput, testUsers.standardUser.username);
    await this.page.fill(LoginLocators.passwordInput, testUsers.standardUser.password);
    await this.page.click(LoginLocators.loginButton);
  }

  async loginLockedUser() {
    logger.info('Tentar logar com usuário bloqueado');

    await this.page.fill(LoginLocators.usernameInput, testUsers.lockedUser.username);
    await this.page.fill(LoginLocators.passwordInput, testUsers.lockedUser.password);
    await this.page.click(LoginLocators.loginButton);
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }


async getErrorMessage(): Promise<string> {
    await expect(
      this.page.locator(LoginLocators.errorMessage)
    ).toBeVisible();

    return this.page.textContent(LoginLocators.errorMessage) as Promise<string>;
  }

  async assertUserIsLocked() {
    const message = await this.getErrorMessage();
    expect(message).toContain('Epic sadface: Sorry, this user has been locked out.');
  }
}
