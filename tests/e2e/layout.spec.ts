import { test, expect, open } from './fixtures';

test.describe('phone', () => {
  test('emergency tiles are on the first screen and open the right guides', async ({ page }) => {
    await page.goto('/');
    const tile = page.getByRole('button', { name: 'Heavy bleeding' });
    const box = await tile.boundingBox();
    expect(box!.y + box!.height).toBeLessThanOrEqual(844 - 64);

    for (const [label, title] of [
      ['Someone is following me', 'following'],
      ['Someone collapsed', 'unconscious'],
      ['Heavy bleeding', 'bleeding'],
      ['Fire', 'Fire'],
      ['Road accident', 'Accident'],
      ['Money or UPI scam', 'UPI'],
    ]) {
      await page.getByRole('button', { name: label, exact: true }).first().click();
      await expect(page.locator('h1').first(), label).toContainText(title);
      await page.getByRole('button', { name: 'Back', exact: true }).click();
    }
  });

  test('guides come before the explainer, and the map code is not loaded on the homepage', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (r) => requests.push(r.url()));
    await page.goto('/');
    const headings = await page.locator('h1, h2').allInnerTexts();
    expect(headings.indexOf('Emergency Guides')).toBeGreaterThan(-1);
    expect(headings.indexOf('How SafeIndia Works')).toBeGreaterThan(headings.indexOf('Emergency Guides'));
    expect(requests.some((u) => u.includes('HelpNearMeView'))).toBe(false);
  });

  test('bottom bar works and the floating button never covers guide text', async ({ page }) => {
    await page.goto('/');
    const bar = page.getByRole('navigation', { name: 'Quick Navigation' });
    await expect(bar).toBeVisible();
    await expect(page.getByRole('button', { name: 'Emergency Help Dial Modal' })).toBeHidden();
    expect(await page.getByRole('link', { name: 'Call 112 National Emergency' }).first().innerText()).toBe('Call 112');

    for (const [label, heading] of [
      ['Guides', 'Emergency Guides'],
      ['Near Me', 'Find Emergency Help Near Me'],
      ['Helplines', 'Emergency Numbers & Helplines'],
    ]) {
      await bar.getByRole('button', { name: label }).click();
      await expect(page.locator('h1').first()).toHaveText(heading);
      await expect(bar.getByRole('button', { name: label })).toHaveAttribute('aria-current', 'page');
    }
  });

  test('help sheet keeps focus inside, closes with Esc, and returns focus', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Quick Navigation' }).getByRole('button', { name: 'Emergency Help' }).click();
    const sheet = page.getByRole('dialog', { name: 'Emergency Assistance' });
    await expect(sheet).toBeVisible();
    await expect(sheet.locator('a[href="tel:112"]')).not.toHaveCount(0);

    for (let i = 0; i < 25; i++) await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('[role=dialog]'))).toBe(true);
    await page.keyboard.press('Escape');
    await expect(sheet).toBeHidden();
    expect(await page.evaluate(() => document.activeElement?.getAttribute('aria-label'))).toBe('Emergency Help');
  });

  test('a failed map download shows Call 112 instead of a blank page', async ({ page }) => {
    await page.route(/HelpNearMeView.*\.js/, (route) => route.abort());
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Quick Navigation' }).getByRole('button', { name: 'Near Me' }).click();
    await expect(page.getByText('Unable to load the map')).toBeVisible();
    await expect(page.locator('main a[href="tel:112"]')).toHaveCount(1);
  });
});

for (const width of [360, 1280]) {
  test(`no sideways scrolling at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ['/', '/emergencies', '/emergencies/upi-bank-fraud', '/near-me', '/awareness', '/resources', '/about']) {
      await open(page, path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, path).toBeLessThanOrEqual(0);
    }
  });
}

test.describe('desktop', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test('floating Help button shows and the bottom bar hides', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: 'Emergency Help Dial Modal' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Quick Navigation' })).toBeHidden();
  });

  test('Ctrl+K opens and closes search, and results open by keyboard', async ({ page }) => {
    await open(page, '/');
    await page.keyboard.press('Control+k');
    const search = page.getByRole('dialog');
    await expect(search).toBeVisible();
    await expect(page.getByPlaceholder(/Search by emergency/)).toBeFocused();
    await page.keyboard.press('Control+k');
    await expect(search).toBeHidden();

    await page.keyboard.press('Control+k');
    await page.keyboard.type('upi');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('h1').first()).toContainText('UPI');
  });

  test('cards and homepage sections open by keyboard', async ({ page }) => {
    await page.goto('/');
    await page.locator('main h3 a', { hasText: 'Someone is bleeding heavily' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('h1').first()).toContainText('bleeding');

    await page.goto('/');
    await page.getByRole('button', { name: 'Awareness', exact: true }).last().focus();
    await page.keyboard.press('Enter');
    await expect(page.locator('h1').first()).toContainText('Awareness');
  });

  test('awareness guides expand, collapse and tick off', async ({ page }) => {
    await open(page, '/awareness');
    const guide = page.locator('main article').first();
    await guide.getByRole('button', { name: /^Show guide/ }).click();
    const item = guide.getByRole('checkbox').first();
    await item.click();
    await expect(item).toHaveAttribute('aria-checked', 'true');
    await item.click();
    await expect(item).toHaveAttribute('aria-checked', 'false');
    await guide.getByRole('button', { name: /^Hide guide/ }).click();
    await expect(guide.getByRole('button', { name: /^Show guide/ })).toBeVisible();

    await page.getByRole('button', { name: 'Digital Safety' }).click();
    const filtered = page.locator('main article').first();
    await filtered.getByRole('button', { name: /^Hide guide/ }).click();
    await expect(filtered.getByRole('button', { name: /^Show guide/ })).toBeVisible();
  });

  test('About page has sources, privacy and accessibility sections', async ({ page }) => {
    await open(page, '/about');
    for (const id of ['sources', 'privacy', 'accessibility']) await expect(page.locator(`#${id}`)).toBeVisible();
    expect(await page.locator('#sources li').count()).toBeGreaterThanOrEqual(5);
  });
});
