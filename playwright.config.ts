import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';


dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './Tests', // рекомендую название файлов и папок писать в kebabc-case. Считай, что рекомендация носит ультимативный характер
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://pb4999.core-t2.profitbase.pro/new',
    video: 'off',
    launchOptions: { slowMo: 800 }, // убери слоумо, вместе можем посмотреть где падает и поправить локаьно там, а не замедлять весь тестовый проект
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 900 }
      },

    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  ],

});
