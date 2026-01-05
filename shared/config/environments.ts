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
  local: {
    web: {
      baseUrl: 'https://www.saucedemo.com',
    },
    api: {
      baseUrl: 'https://fakestoreapi.com',
      timeout: 5000,
    },
  },

  hml: {
    web: {
      baseUrl: 'https://hml.saucedemo.com',
    },
    api: {
      baseUrl: 'https://fakestoreapi.com',
      timeout: 7000,
    },
  },
};
