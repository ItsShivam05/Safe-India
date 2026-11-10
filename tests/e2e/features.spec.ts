import type { BrowserContext, Page, Route } from '@playwright/test';
import { test, expect, open } from './fixtures';

const DELHI = { latitude: 28.6315, longitude: 77.2167, accuracy: 20 };
const json = (route: Route, body: unknown) =>
  route.fulfill({ status: 200, headers: { 'access-control-allow-origin': '*' }, contentType: 'application/json', body: JSON.stringify(body) });

async function allowLocation(context: BrowserContext) {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation(DELHI);
}

// ---------- Hindi ----------
test.describe('Hindi', () => {
  test('switches the whole site to Hindi, remembers it, and switches back', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Switch to Hindi/ }).click();
    await expect(page.locator('h1')).toHaveText('जब हर मिनट कीमती हो, तब साफ़ कदम और मदद पाने के आसान तरीके।');
    await expect(page.locator('html')).toHaveAttribute('lang', 'hi');
    await expect(page.getByRole('navigation', { name: 'त्वरित मेन्यू' })).toContainText('गाइड');

    await page.reload();
    await expect(page.locator('h1')).toContainText('जब हर मिनट कीमती हो');

    await page.goto('/emergencies/snake-bite');
    await expect(page.locator('h1')).toContainText('सांप');
    await expect(page.getByText('अभी क्या करें')).toBeVisible();

    await page.getByRole('button', { name: /Switch to English|अंग्रेज़ी/ }).click();
    await expect(page.locator('h1')).toContainText('Snake');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('every page shows Hindi text and nothing is missing', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('safeindia-language', 'hi'));
    for (const path of ['/', '/emergencies', '/emergencies/road-accident', '/near-me', '/awareness', '/resources', '/about', '/tools', '/sos', '/where-am-i', '/tools/alarm', '/tools/medical-id', '/tools/complaint', '/no-such-page']) {
      await open(page, path);
      const text = await page.locator('body').innerText();
      expect(text, path).toMatch(/[ऀ-ॿ]/);
      expect(text, path).not.toContain('undefined');
      expect(text, path).not.toMatch(/\{[a-zA-Z]+\}/);
    }
  });

  test('WhatsApp message follows the chosen language', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('safeindia-language', 'hi'));
    await open(page, '/emergencies/snake-bite');
    const href = (await page.getByRole('link', { name: 'WhatsApp पर शेयर करें' }).first().getAttribute('href')) ?? '';
    const message = decodeURIComponent(href.split('text=')[1]);
    expect(message).toContain('क्या करें');
    expect(message).toContain('पूरी गाइड: https://safe-india.vercel.app/emergencies/snake-bite');
  });
});

// ---------- Guide reading tools ----------
test.describe('guide reading tools', () => {
  test('one step at a time, in large text', async ({ page }) => {
    await open(page, '/emergencies/severe-bleeding');
    await page.getByRole('button', { name: 'One step at a time' }).click();
    const step = page.getByTestId('current-step');
    await expect(step).toContainText('Dial 108 or 112');
    await expect(page.getByText('Step 1 of 5')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Previous' })).toBeDisabled();

    for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Next' }).click();
    await expect(page.getByText('Step 5 of 5')).toBeVisible();
    await expect(page.getByText('Done. Now see what NOT to do below.')).toBeVisible();
    await page.getByRole('button', { name: 'Previous' }).click();
    await expect(page.getByText('Step 4 of 5')).toBeVisible();

    await page.getByRole('button', { name: 'Show all steps' }).click();
    await expect(page.locator('ol li')).not.toHaveCount(0);
  });

  test('read aloud speaks the guide in the chosen language and can be stopped', async ({ page }) => {
    await page.addInitScript(() => {
      const w = window as unknown as { spoken: Array<{ text: string; lang: string }> };
      w.spoken = [];
      Object.defineProperty(window, 'speechSynthesis', {
        value: {
          speak: (u: SpeechSynthesisUtterance) => w.spoken.push({ text: u.text, lang: u.lang }),
          cancel: () => {},
        },
      });
    });
    await open(page, '/emergencies/severe-bleeding');
    await page.getByRole('button', { name: 'Read aloud' }).click();
    await expect(page.getByRole('button', { name: 'Stop reading' })).toBeVisible();
    const spoken = await page.evaluate(() => (window as unknown as { spoken: Array<{ text: string; lang: string }> }).spoken);
    expect(spoken[0].text).toContain('bleeding');
    expect(spoken.some((s) => s.text.startsWith('1. Dial 108'))).toBe(true);
    expect(spoken[0].lang).toBe('en-IN');
    await page.getByRole('button', { name: 'Stop reading' }).click();
    await expect(page.getByRole('button', { name: 'Read aloud' })).toBeVisible();
  });

  test('medical guides show what to tell 112; scam guides do not', async ({ page }) => {
    await open(page, '/emergencies/road-accident');
    await expect(page.getByRole('heading', { name: 'What to tell the 112 operator' })).toBeVisible();
    await page.getByRole('link', { name: 'Find my exact location to tell them' }).click();
    await expect(page).toHaveURL(/\/where-am-i$/);
    await open(page, '/emergencies/upi-bank-fraud');
    await expect(page.getByRole('heading', { name: 'What to tell the 112 operator' })).toHaveCount(0);
  });

  test('stolen phone guide no longer shows an unreliable call button', async ({ page }) => {
    await open(page, '/emergencies/phone-stolen');
    await expect(page.locator('a[href="tel:14422"]')).toHaveCount(0);
  });
});

// ---------- Safety tools ----------
test('tools page links to every tool', async ({ page }) => {
  await open(page, '/tools');
  for (const [name, path] of [
    ['SOS to your contacts', '/sos'],
    ['Where am I?', '/where-am-i'],
    ['Loud alarm', '/tools/alarm'],
    ['Medical ID', '/tools/medical-id'],
    ['Complaint drafts', '/tools/complaint'],
  ]) {
    await expect(page.getByRole('link', { name: new RegExp(name.replace('?', '\\?')) })).toHaveAttribute('href', path);
  }
});

test.describe('SOS', () => {
  test('checks numbers, saves contacts, and prepares WhatsApp and SMS with the location', async ({ page, context }) => {
    await allowLocation(context);
    await open(page, '/sos');
    await expect(page.locator('main a[href="tel:112"]')).toHaveCount(1);

    const names = page.getByLabel('Name');
    const phones = page.getByLabel('Mobile number');
    await names.nth(0).fill('Asha');
    await phones.nth(0).fill('12345');
    await names.nth(1).fill('Ravi');
    await phones.nth(1).fill('+91 91234 56789');
    await page.getByRole('button', { name: 'Save contacts' }).click();
    await expect(page.getByText('Enter a valid mobile number')).toHaveCount(1);

    await phones.nth(0).fill('098765 43210');
    await page.getByRole('button', { name: 'Save contacts' }).click();
    await page.getByRole('button', { name: 'Get my location and prepare SOS' }).click();

    const message = page.getByTestId('sos-message');
    await expect(message).toContainText('SOS! I need help urgently.');
    await expect(message).toContainText('https://maps.google.com/?q=28.631500,77.216700');
    await expect(message).toContainText('accurate to about 20 m');

    const asha = page.getByRole('link', { name: 'WhatsApp Asha' });
    expect(await asha.getAttribute('href')).toMatch(/^https:\/\/wa\.me\/919876543210\?text=/);
    expect(decodeURIComponent((await asha.getAttribute('href')) ?? '')).toContain('maps.google.com');
    await expect(page.getByRole('link', { name: 'WhatsApp Ravi' })).toHaveAttribute('href', /^https:\/\/wa\.me\/919123456789\?text=/);
    await expect(page.getByRole('link', { name: 'Send SMS to both' })).toHaveAttribute('href', /^sms:\+919876543210,\+919123456789\?body=/);

    // Saved on this phone only, so they are still there next time
    await page.reload();
    await expect(page.getByRole('button', { name: 'Get my location and prepare SOS' })).toBeVisible();
    await page.getByRole('button', { name: 'Remove contacts' }).click();
    await expect(page.getByRole('heading', { name: 'Add your 2 emergency contacts' })).toBeVisible();
  });

  test('still prepares the message when location is blocked', async ({ page }) => {
    await page.addInitScript(() =>
      localStorage.setItem('safeindia-sos-contacts', JSON.stringify([{ name: 'Asha', phone: '+919876543210' }, { name: 'Ravi', phone: '+919123456789' }]))
    );
    await open(page, '/sos');
    await page.getByRole('button', { name: 'Get my location and prepare SOS' }).click();
    await expect(page.getByTestId('sos-message')).toContainText('I could not share my location. Please call me now.');
    await expect(page.getByText('We could not get your location')).toBeVisible();
  });
});

test('Where am I shows the address and coordinates to read out', async ({ page, context }) => {
  await allowLocation(context);
  await page.route(/nominatim\.openstreetmap\.org\/reverse/, (route) => json(route, { display_name: 'Janpath, Connaught Place, New Delhi, 110001' }));
  await open(page, '/where-am-i');
  await page.getByRole('button', { name: 'Show my location' }).click();
  await expect(page.getByTestId('address')).toHaveText('Janpath, Connaught Place, New Delhi, 110001');
  await expect(page.getByTestId('coordinates')).toHaveText('28.63150, 77.21670');
  const share = decodeURIComponent((await page.getByRole('link', { name: 'Send my location on WhatsApp' }).getAttribute('href')) ?? '');
  expect(share).toContain('Janpath');
  expect(share).toContain('28.63150, 77.21670');
});

test('loud alarm starts and stops', async ({ page }) => {
  await open(page, '/tools/alarm');
  await page.getByRole('button', { name: 'Start alarm' }).click();
  await expect(page.getByRole('status')).toHaveText('Alarm is sounding');
  await page.getByRole('button', { name: 'Stop alarm' }).click();
  await expect(page.getByRole('button', { name: 'Start alarm' })).toBeVisible();
});

test('medical ID is saved on the phone and shown large to a responder', async ({ page }) => {
  await open(page, '/tools/medical-id');
  await expect(page.getByRole('button', { name: 'Show to a responder' })).toBeDisabled();
  await page.getByLabel('Full name').fill('Asha Verma');
  await page.getByLabel('Blood group').selectOption('O+');
  await page.getByLabel('Allergies').fill('Penicillin');
  await page.getByRole('button', { name: 'Save on this phone' }).click();
  await expect(page.getByRole('button', { name: 'Saved on this phone' })).toBeVisible();

  await page.reload();
  await expect(page.getByLabel('Full name')).toHaveValue('Asha Verma');
  await page.getByRole('button', { name: 'Show to a responder' }).click();
  const card = page.getByRole('dialog', { name: 'Medical information' });
  await expect(card).toContainText('O+');
  await expect(card).toContainText('Penicillin');
  await card.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Delete my medical ID' }).click();
  await expect(page.getByLabel('Full name')).toHaveValue('');
});

test.describe('complaint drafts', () => {
  test.use({ permissions: ['clipboard-read', 'clipboard-write'] });

  test('fills in the complaint text and copies it', async ({ page }) => {
    await open(page, '/tools/complaint');
    await page.getByLabel('Amount lost (₹)').fill('25000');
    await page.getByLabel('Transaction ID / UTR number').fill('UTR123456');
    const text = page.getByTestId('complaint-text');
    await expect(text).toContainText('Amount lost: ₹25000');
    await expect(text).toContainText('UTR123456');
    await expect(text).toContainText('[not given]');
    await page.getByRole('button', { name: 'Copy text' }).click();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('UTR123456');

    await page.getByRole('button', { name: 'Lost or stolen phone' }).click();
    await page.getByLabel('IMEI number (on the box or bill)').fill('356938035643809');
    await expect(text).toContainText('IMEI number: 356938035643809');
  });
});

// ---------- Near Me improvements ----------
test.describe('Near Me', () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  const places = {
    elements: [
      { type: 'node', id: 1, lat: 28.633, lon: 77.217, tags: { amenity: 'police', name: 'Near Police', phone: '011 2334 5678' } },
      { type: 'way', id: 2, center: { lat: 28.636, lon: 77.218 }, tags: { amenity: 'hospital', name: 'Near Hospital', emergency: 'yes' } },
      { type: 'node', id: 3, lat: 28.64, lon: 77.22, tags: { amenity: 'fire_station', name: 'Near Fire' } },
    ],
  };

  async function blankTiles(page: Page) {
    await page.route(/tile\.openstreetmap\.org/, (route) => route.fulfill({ status: 200, contentType: 'image/png', body: Buffer.alloc(0) }));
  }

  test('finds help automatically when location is allowed, with the nearest of each type', async ({ page, context }) => {
    await allowLocation(context);
    await blankTiles(page);
    await page.route(/interpreter/, (route) => json(route, places));
    await page.goto('/near-me');

    const nearest = page.getByRole('region', { name: 'Nearest help' });
    await expect(nearest).toBeVisible();
    await expect(nearest).toContainText('Near Police');
    await expect(nearest).toContainText('Near Hospital');
    await expect(nearest).toContainText('Near Fire');
    await expect(nearest.locator('a[href^="tel:"]')).toHaveCount(1);
    await expect(page.getByText('Location accurate to about 20 m')).toBeVisible();
    await expect(page.getByText('Emergency department').first()).toBeVisible();
  });

  test('widens the search on its own when nothing is nearby', async ({ page, context }) => {
    await allowLocation(context);
    await blankTiles(page);
    await page.route(/interpreter/, async (route) => {
      const body = decodeURIComponent(route.request().postData() ?? '');
      return json(route, body.includes('around:5000') ? { elements: [] } : places);
    });
    await page.goto('/near-me');
    await expect(page.getByText('Nothing was found within 5 km, so we searched within 10 km.')).toBeVisible();
    await expect(page.getByRole('region', { name: 'Nearest help' })).toContainText('Near Police');
  });
});

// ---------- Offline ----------
test('guides, helplines and tools work offline after the first visit', async ({ page, context }) => {
  test.slow();
  await page.goto('/');
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

  await context.setOffline(true);
  for (const [path, heading] of [
    ['/emergencies/snake-bite', 'Snake'],
    ['/resources', 'Emergency Numbers'],
    ['/tools/medical-id', 'Medical ID'],
    ['/sos', 'SOS'],
  ]) {
    await page.goto(path);
    await expect(page.locator('h1').first(), path).toContainText(heading);
    await expect(page.getByText('You are offline.').first()).toBeVisible();
  }
  await page.goto('/near-me');
  await expect(page.getByText('Finding nearby places needs the internet')).toBeVisible();
  await context.setOffline(false);
});
