import { environments } from '../config/environments.js';

export function getEnv() {
  const envName = __ENV.ENV || 'local';
  const env = environments[envName];

  if (!env) {
    throw new Error(
      `Ambiente "${envName}" não configurado. Válidos: ${Object.keys(environments).join(', ')}`
    );
  }

  return env;
}
