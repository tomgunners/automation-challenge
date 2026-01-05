import { environments, Environment } from '../config/environments';

export function getEnv(): Environment {
  const envName = process.env.ENV ?? 'local';

  const env = environments[envName];

  if (!env) {
    throw new Error(
      `Ambiente "${envName}" não está configurado. Ambientes válidos: ${Object.keys(environments).join(', ')}`
    );
  }

  return env;
}
