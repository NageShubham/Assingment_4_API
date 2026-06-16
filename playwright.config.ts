import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 20_000,
  retries: process.env.CI ? 2 : 0,

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'https://swapi.info',
  },

  projects: [
    {
      name: 'swapi-tests',
      testMatch: ['**/swapi.spec.ts', '**/chain.spec.ts'],
      use: {
        baseURL: 'https://swapi.info',
      },
    },
    {
      name: 'aic-tests',
      testMatch: ['**/aic.spec.ts'],
      use: {
        baseURL: 'https://aic.example.com',
      },
    },
  ],
});