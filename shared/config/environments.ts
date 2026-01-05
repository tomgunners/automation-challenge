export type ApiConfig = {
  baseUrl: string;
  timeout: number;
};

export type WebConfig = {
  baseUrl: string;
};

export type Environment = {
  web: WebConfig;
  api: ApiConfig;
};

export const environments: Record<string, Environment> = {
  /**
   * 🧑‍💻 Ambiente Local (dev machine)
   */
  local: {
    web: {
      baseUrl: 'https://www.saucedemo.com',
    },
    api: {
      baseUrl: 'https://dummyjson.com',
      timeout: 5000,
    },
  },

  /**
   * 🤖 Ambiente de CI/CD (GitHub Actions, pipelines)
   * Deve ser EXPLÍCITO para evitar fallback errado
   */
  ci: {
    web: {
      baseUrl: 'https://www.saucedemo.com',
    },
    api: {
      baseUrl: 'https://dummyjson.com',
      timeout: 8000,
    },
  },
};
