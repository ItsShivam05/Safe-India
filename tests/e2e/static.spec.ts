import { test, expect, SITE } from './fixtures';

// What WhatsApp, Google and very slow phones receive before any JavaScript runs.
const guideIds = [
  'someone-following', 'unsafe-cab', 'unconscious-person', 'severe-bleeding', 'building-fire', 'lpg-gas-leak',
  'road-accident', 'upi-bank-fraud', 'phone-stolen', 'snake-bite', 'dog-attack',
];

test('each guide has its own title, preview tags and steps in plain HTML', async ({ request }) => {
  const snake = await (await request.get('/emergencies/snake-bite')).text();
  expect(snake).toContain('<title>Snake Encounter or Snake Bite: what to do | SafeIndia</title>');
  expect(snake).toContain('property="og:title" content="Snake Encounter or Snake Bite: what to do | SafeIndia"');
  expect(snake).toContain(`property="og:image" content="${SITE}/og-image.jpg"`);
  expect(snake).toContain(`property="og:url" content="${SITE}/emergencies/snake-bite"`);
  expect(snake).toContain('href="tel:108"');
  expect(snake.match(/<title>/g)).toHaveLength(1);

  for (const id of guideIds) {
    const html = await (await request.get(`/emergencies/${id}`)).text();
    expect(html, id).toContain('og:title');
    expect(html, id).toContain('What to Do Right Now');
  }
});

test('homepage keeps an empty body, because it is also the fallback page', async ({ request }) => {
  const html = await (await request.get('/')).text();
  expect(html).toContain('<div id="root"></div>');
  expect(html).toContain('og:title');
});

test('sitemap, robots.txt and preview image are in place', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(21);
  expect(await (await request.get('/robots.txt')).text()).toContain(`Sitemap: ${SITE}/sitemap.xml`);
  const image = await request.get('/og-image.jpg');
  expect(image.ok()).toBe(true);
  expect((await image.body()).length).toBeLessThan(300 * 1024);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('guide steps can still be read and the call link still works', async ({ page }) => {
    await page.goto('/emergencies/severe-bleeding');
    await expect(page.locator('h1')).toContainText('bleeding');
    expect(await page.locator('ol li').count()).toBeGreaterThanOrEqual(3);
    await expect(page.locator('a[href="tel:108"]')).toBeVisible();
  });
});
