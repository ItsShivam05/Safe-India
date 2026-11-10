import { test, expect, open, pathOf, SITE } from './fixtures';

const guides: Array<[string, string]> = [
  ['someone-following', 'Someone is following me'],
  ['unsafe-cab', 'Unsafe cab'],
  ['unconscious-person', 'unconscious'],
  ['severe-bleeding', 'bleeding'],
  ['building-fire', 'Fire'],
  ['lpg-gas-leak', 'LPG'],
  ['road-accident', 'Accident'],
  ['upi-bank-fraud', 'UPI'],
  ['phone-stolen', 'Phone'],
  ['snake-bite', 'Snake'],
  ['dog-attack', 'Dog'],
];
const awareness = ['personal-situational-awareness', 'digital-scam-prevention', 'home-fire-gas-safety', 'disaster-kit-earthquake-flood'];

test('every guide opens from its own address, with dialable call links', async ({ page }) => {
  for (const [id, title] of guides) {
    await open(page, `/emergencies/${id}`);
    await expect(page.locator('h1').first(), id).toContainText(title);
    await expect(page).toHaveTitle(new RegExp(title));
    const calls = await page.locator('main a[href^="tel:"]').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    expect(calls.length, id).toBeGreaterThan(0);
    for (const href of calls) expect(href, id).toMatch(/^tel:\d+$/);
    await expect(page.getByRole('link', { name: 'Report a mistake' })).toHaveAttribute('href', /github\.com\/ItsShivam05\/Safe-India\/issues\/new/);
  }
});

test('Call on a guide card dials instead of opening the guide', async ({ page }) => {
  await open(page, '/emergencies');
  const call = page.locator('main .group').first().locator('a[href^="tel:"]');
  await expect(call).toHaveAttribute('href', 'tel:112');
  await call.evaluate((a) => a.addEventListener('click', (e) => e.preventDefault()));
  await call.click();
  await expect(page).toHaveURL(/\/emergencies$/);
});

test('WhatsApp message has the key steps and the live guide address, and nothing personal', async ({ page }) => {
  await open(page, '/emergencies/snake-bite');
  const whatsapp = page.getByRole('link', { name: 'Share on WhatsApp' });
  await expect(whatsapp).toHaveCount(2);

  const href = (await whatsapp.first().getAttribute('href')) ?? '';
  expect(href.startsWith('https://wa.me/?text=')).toBe(true);
  const message = decodeURIComponent(href.split('text=')[1]);
  expect(message).toContain('Snake Encounter or Snake Bite');
  expect(message).toContain('Call 108');
  expect(message).toContain('3. ');
  expect(message).toContain(`${SITE}/emergencies/snake-bite`);
  expect(message).not.toMatch(/\d{2}\.\d{3,}/);
  await expect(whatsapp.first()).toHaveAttribute('target', '_blank');
});

test.describe('copy link', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('copies the guide address, not the homepage', async ({ page }) => {
    await open(page, '/emergencies/snake-bite');
    await page.getByRole('button', { name: 'Copy link' }).first().click();
    await expect(page.getByText('Copied!').first()).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(`${SITE}/emergencies/snake-bite`);
  });
});

test.describe('phone share menu', () => {
  test.use({ hasTouch: true, isMobile: true });

  test('phones share the guide message through the system menu', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { shared: unknown[] }).shared = [];
      navigator.share = async (data) => {
        (window as unknown as { shared: unknown[] }).shared.push(data);
      };
    });
    await open(page, '/emergencies/snake-bite');
    await page.getByRole('button', { name: 'Share Guide' }).first().tap();
    const shared = await page.evaluate(() => (window as unknown as { shared: Array<{ text: string }> }).shared);
    expect(shared).toHaveLength(1);
    expect(shared[0].text).toContain(`${SITE}/emergencies/snake-bite`);
  });
});

test('Back from a shared link goes to the guide list', async ({ page }) => {
  await open(page, '/emergencies/dog-attack');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page).toHaveURL(/\/emergencies$/);
});

test('browser Back, Forward and refresh work, and Back keeps the scroll position', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Quick Navigation' }).getByRole('button', { name: 'Guides' }).click();
  await expect(page).toHaveURL(/\/emergencies$/);

  const card = page.locator('main h3 a', { hasText: 'Dog Attack' });
  await expect(card).toHaveAttribute('href', '/emergencies/dog-attack');
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  const before = await page.evaluate(() => window.scrollY);

  await card.click();
  await expect(page.locator('h1').first()).toContainText('Dog');
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.getByRole('navigation', { name: 'Quick Navigation' }).getByRole('button', { name: 'Guides' })).toHaveAttribute('aria-current', 'page');

  await page.goBack();
  await expect(page).toHaveURL(/\/emergencies$/);
  await page.waitForTimeout(700);
  expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(80);

  await page.goForward();
  await expect(page.locator('h1').first()).toContainText('Dog');
  await page.reload();
  await expect(page.locator('h1').first()).toContainText('Dog');
});

test('unknown addresses show Page not found with 112', async ({ page }) => {
  for (const bad of ['/emergencies/not-a-guide', '/awareness/not-a-guide', '/nonsense/page']) {
    await page.goto(bad);
    await expect(page.locator('h1')).toHaveText('Page not found');
    await expect(page.locator('main a[href="tel:112"]')).toHaveCount(1);
  }
  await page.getByRole('link', { name: 'Emergency Guides' }).click();
  expect(pathOf(page)).toBe('/emergencies');
});

test('awareness guides open from their own address and share it', async ({ page }) => {
  for (const id of awareness) {
    await open(page, `/awareness/${id}`);
    const guide = page.locator(`#guide-${id}`);
    await expect(guide.getByRole('button', { name: /^Hide guide/ })).toBeVisible();
    await page.waitForTimeout(500);
    const top = await guide.evaluate((el) => el.getBoundingClientRect().top);
    expect(top, id).toBeGreaterThanOrEqual(0);
    expect(top, id).toBeLessThan(300);
    const href = (await guide.getByRole('link', { name: 'Share on WhatsApp' }).getAttribute('href')) ?? '';
    expect(decodeURIComponent(href)).toContain(`${SITE}/awareness/${id}`);
  }
});

test('search opens the exact awareness guide', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Search emergency guides & helplines' }).first().click();
  await page.getByPlaceholder(/Search by emergency/).fill('earthquake');
  await page.getByRole('dialog').locator('h4 button', { hasText: 'Earthquake & Flood Survival Preparation' }).click();
  await expect(page).toHaveURL(/\/awareness\/disaster-kit-earthquake-flood$/);
  await expect(page.locator('#guide-disaster-kit-earthquake-flood').getByRole('button', { name: /^Hide guide/ })).toBeVisible();
});

test('every helpline can be shared on WhatsApp', async ({ page }) => {
  await open(page, '/resources');
  const share = page.getByRole('link', { name: /^Share on WhatsApp:/ });
  await expect(share).toHaveCount(11);
  expect(decodeURIComponent((await share.first().getAttribute('href')) ?? '')).toContain('112');
});

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('footer links jump to the right About section', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer').getByRole('link', { name: 'Accessibility' }).click();
    await expect(page).toHaveURL(/\/about#accessibility$/);
    await page.waitForTimeout(700);
    const top = await page.locator('#accessibility').evaluate((el) => el.getBoundingClientRect().top);
    expect(top).toBeGreaterThanOrEqual(0);
    expect(top).toBeLessThan(400);
  });

  test('navbar items change the address', async ({ page }) => {
    await page.goto('/');
    for (const [name, path] of [
      ['Emergencies', '/emergencies'],
      ['Get Help Near Me', '/near-me'],
      ['Awareness', '/awareness'],
      ['Resources', '/resources'],
      ['About', '/about'],
    ]) {
      await page.getByRole('navigation', { name: 'Main Navigation' }).getByRole('button', { name, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${path}$`));
    }
  });
});
