import { test } from '../fixtures/test-fixtures';
import { retry } from '@shared/utils/retry.helper';

    test('Login com sucesso', async ({ loginPage }) => {
        await retry(async () => {
        await loginPage.open();
        await loginPage.loginStandardUser();
        await loginPage.assertLoginSuccess();
    });
});
    test('Login com usuário bloqueado', async ({ loginPage }) => {
        await retry(async () => {
        await loginPage.open();
        await loginPage.loginLockedUser();
        await loginPage.assertUserIsLocked();
    });
});
