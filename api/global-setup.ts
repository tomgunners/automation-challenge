import fs from 'fs';
import path from 'path';

function cleanDir(dir: string) {
  const fullPath = path.resolve(__dirname, dir);

  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
  }
}

async function globalSetup() {
  console.log('🧹 Limpando relatórios antigos (API)...');

  cleanDir('playwright-report');
  cleanDir('allure-results');
}

export default globalSetup;
