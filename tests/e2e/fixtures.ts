import { test as base, expect, type Page } from '@playwright/test';

export const SITE = 'https://safe-india.vercel.app';

// Every test fails if the page throws, logs an error, or the security policy blocks something.
// A test that expects the app to log an error lists it in `expectedErrors`.
export const test = base.extend<{ expectedErrors: RegExp[]; pageErrors: string[] }>({
  expectedErrors: [[], { option: true }],
  pageErrors: [
    async ({ page, expectedErrors }, use) => {
      const errors: string[] = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !/net::ERR|Failed to load resource/.test(msg.text())) errors.push(msg.text());
      });
      await use(errors);
      const unexpected = errors.filter((err) => !expectedErrors.some((pattern) => pattern.test(err)));
      expect(unexpected, 'page errors or content blocked by the security policy').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

/** Opens a page and waits until its main heading has rendered. */
export async function open(page: Page, path: string) {
  await page.goto(path);
  await page.locator('h1').first().waitFor();
}

export const pathOf = (page: Page) => new URL(page.url()).pathname;
