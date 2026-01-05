import fs from 'fs';
import path from 'path';

const resultsDir = path.resolve('allure-results');
const reportDir = path.resolve('allure-report');
const historyFrom = path.join(reportDir, 'history');
const historyTo = path.join(resultsDir, 'history');

/**
 * Ensure directory exists
 */
function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

/**
 * ENVIRONMENT
 */
function createEnvironmentFile() {
  const content = `
Browser=Chrome
Browser.Version=Latest
OS=${process.platform}
Node.Version=${process.version}
Playwright.Version=1.57.0
Environment=Local
Base.URL=https://www.saucedemo.com
Execution.Type=Local
`.trim();

  fs.writeFileSync(
    path.join(resultsDir, 'environment.properties'),
    content
  );
}

/**
 * EXECUTOR
 */
function createExecutorFile() {
  const executor = {
    name: 'Local Execution',
    type: 'local',
    buildName: 'automation-challenge-web',
    buildOrder: new Date().getTime(),
    reportUrl: 'http://localhost/allure-report'
  };

  fs.writeFileSync(
    path.join(resultsDir, 'executor.json'),
    JSON.stringify(executor, null, 2)
  );
}

/**
 * CATEGORIES
 */
function createCategoriesFile() {
  const categories = [
    {
      name: 'Erro de Autenticação',
      matchedStatuses: ['failed'],
      messageRegex: '.*login.*|.*senha.*|.*password.*'
    },
    {
      name: 'Erro de Timeout',
      matchedStatuses: ['broken'],
      messageRegex: '.*Timeout.*'
    },
    {
      name: 'Erro de Aplicação',
      matchedStatuses: ['failed'],
      traceRegex: '.*AssertionError.*'
    }
  ];

  fs.writeFileSync(
    path.join(resultsDir, 'categories.json'),
    JSON.stringify(categories, null, 2)
  );
}

/**
 * HISTORY (TREND)
 */
function restoreHistory() {
  if (fs.existsSync(historyFrom)) {
    ensureDir(historyTo);
    fs.cpSync(historyFrom, historyTo, { recursive: true });
  }
}

/**
 * RUN SETUP
 */
(function setupAllure() {
  console.log('🔧 Setting up Allure metadata...');
  ensureDir(resultsDir);
  restoreHistory();
  createEnvironmentFile();
  createExecutorFile();
  createCategoriesFile();
  console.log('✅ Allure setup completed');
})();
