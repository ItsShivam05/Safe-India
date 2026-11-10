import { defineConfig } from '@playwright/test';

// Run `npm run build` first; these tests check the built site, the same files Vercel serves.
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    // Set PW_CHANNEL=chrome to use an installed Chrome instead of downloading a test browser
    channel: process.env.PW_CHANNEL,
    viewport: { width: 390, height: 844 },
  },
  webServer: {
    command: 'node tests/e2e/serve-dist.mjs',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
