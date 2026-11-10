import type { Page, Route } from '@playwright/test';
import { test, expect } from './fixtures';

// The real map servers are never called here, so results don't depend on how busy they are.
const json = (route: Route, body: unknown) =>
  route.fulfill({ status: 200, headers: { 'access-control-allow-origin': '*' }, contentType: 'application/json', body: JSON.stringify(body) });

const BLANK_TILE = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=', 'base64');

const overpassPlaces = {
  elements: [
    { type: 'node', id: 1, lat: 28.632, lon: 77.217, tags: { amenity: 'police', name: 'Test Police' } },
    { type: 'way', id: 2, center: { lat: 28.633, lon: 77.218 }, tags: { amenity: 'hospital', name: 'Test Way Hospital' } },
    { type: 'relation', id: 3, center: { lat: 28.634, lon: 77.219 }, tags: { amenity: 'hospital', name: 'Test Relation Hospital' } },
    { type: 'node', id: 4, lat: 28.635, lon: 77.22, tags: { amenity: 'clinic', name: 'Test Clinic' } },
    { type: 'way', id: 5, center: { lat: 28.636, lon: 77.221 }, tags: { amenity: 'fire_station', name: 'Test Fire' } },
  ],
};

const backupItem = (id: number, cls: string, type: string, name: string, display: string) => ({
  osm_type: 'node', osm_id: id, lat: '28.632', lon: '77.217', class: cls, type, name, display_name: display,
});
const backupPlaces = [
  backupItem(10, 'highway', 'secondary', 'Police Line Road', 'Police Line Road, New Delhi'),
  backupItem(11, 'amenity', 'police', 'Backup Police', 'Backup Police, New Delhi'),
  backupItem(12, 'amenity', 'clinic', 'Backup Clinic', 'Backup Clinic, New Delhi'),
  backupItem(13, 'amenity', 'fire_station', '', 'Some Station Road, New Delhi'),
  backupItem(14, 'shop', 'chemist', 'Hospital Road Chemist', 'Hospital Road Chemist, New Delhi'),
];

test.use({ viewport: { width: 1280, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.route(/tile\.openstreetmap\.org/, (route) => route.fulfill({ status: 200, contentType: 'image/png', body: BLANK_TILE }));
  await page.route(/nominatim\.openstreetmap\.org\/search.*Connaught/, (route) =>
    json(route, [{ display_name: 'Connaught Place, New Delhi, Delhi, India', lat: '28.6315', lon: '77.2167', type: 'suburb' }])
  );
});

async function searchConnaughtPlace(page: Page) {
  await page.goto('/near-me');
  await page.getByPlaceholder(/Enter city/).fill('Connaught Place, New Delhi');
  await page.keyboard.press('Enter');
  await page.getByText('Places in India').waitFor();
  const started = Date.now();
  await page.locator('div.absolute.top-full button').first().click();
  await expect(page.getByText('Finding help near you')).toBeHidden({ timeout: 25_000 });
  return (Date.now() - started) / 1000;
}

const resultList = (page: Page) => page.locator('main .lg\\:col-span-5').first();

test('results are labelled correctly, including hospitals mapped as relations and clinics', async ({ page }) => {
  const backupCalls: string[] = [];
  page.on('request', (r) => { if (r.url().includes('viewbox')) backupCalls.push(r.url()); });
  await page.route(/interpreter/, (route) => json(route, overpassPlaces));

  await searchConnaughtPlace(page);
  const list = resultList(page);
  await expect(list.getByText('Test Relation Hospital')).toBeVisible();
  await expect(list.getByText(/^Hospital$/)).toHaveCount(2);
  await expect(list.getByText(/^Clinic$/)).toHaveCount(1);
  await expect(list.getByText(/^Police Station$/)).toHaveCount(1);
  await expect(list.getByText(/^Fire Station$/)).toHaveCount(1);
  expect(backupCalls).toHaveLength(0);

  await page.getByRole('button', { name: /Hospitals & Clinics/ }).click();
  await expect(list.getByText(/^Approx\. /)).toHaveCount(3);
  await page.locator('.leaflet-marker-icon.safeindia-marker').last().click({ force: true });
  await expect(page.locator('.leaflet-popup-content', { hasText: 'Test Clinic' }).first()).toContainText('Clinic');
});

test('place names from the map are shown as text and never run as code', async ({ page }) => {
  const hostile = '<img src=x onerror="window.__attack=1">Bad Station';
  await page.route(/interpreter/, (route) =>
    json(route, { elements: [{ type: 'node', id: 9, lat: 28.632, lon: 77.217, tags: { amenity: 'police', name: hostile, 'addr:full': hostile } }] })
  );
  await searchConnaughtPlace(page);
  await page.locator('.leaflet-marker-icon.safeindia-marker').first().click({ force: true });
  await expect(page.locator('.leaflet-popup-content', { hasText: 'Bad Station' }).first()).toBeVisible();
  await expect(page.locator('.leaflet-popup-content img')).toHaveCount(0);
  expect(await page.evaluate(() => (window as unknown as { __attack?: number }).__attack)).toBeUndefined();
});

test('a station right next to you can be tapped, not hidden under your location marker', async ({ page }) => {
  // About 60 metres from the searched location, so the two markers overlap on the map
  await page.route(/interpreter/, (route) =>
    json(route, { elements: [{ type: 'node', id: 7, lat: 28.632, lon: 77.217, tags: { amenity: 'police', name: 'Next Door Police' } }] })
  );
  await searchConnaughtPlace(page);
  const marker = page.locator('.leaflet-marker-icon.safeindia-marker').first();
  await page.locator('.leaflet-container').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const box = (await marker.boundingBox())!;
  const centre = { x: box.x + box.width / 2, y: box.y + box.height / 2 };

  // A finger lands on whatever is on top at that spot, at any moment of the pulse animation
  for (let i = 0; i < 10; i++) {
    const onTop = await page.evaluate(({ x, y }) => !!document.elementFromPoint(x, y)?.closest('.safeindia-marker'), centre);
    expect(onTop, `the station marker is on top (sample ${i + 1})`).toBe(true);
    await page.waitForTimeout(100);
  }

  await page.mouse.click(centre.x, centre.y);
  await expect(page.locator('.leaflet-popup-content', { hasText: 'Next Door Police' }).first()).toBeVisible();
});

test('a slow first server does not hold up the search', async ({ page }) => {
  await page.route(/interpreter/, (route) => (route.request().url().startsWith('https://overpass-api.de') ? undefined : json(route, overpassPlaces)));
  const seconds = await searchConnaughtPlace(page);
  await expect(resultList(page).getByText(/^Approx\. /)).toHaveCount(5);
  expect(seconds).toBeLessThan(5);
});

test('if every server hangs, the backup is used after 12 seconds and filters out roads and shops', async ({ page }) => {
  test.slow();
  await page.route(/interpreter/, () => {});
  await page.route(/nominatim.*viewbox/, (route) => json(route, backupPlaces));

  const seconds = await searchConnaughtPlace(page);
  expect(seconds).toBeGreaterThan(11);
  expect(seconds).toBeLessThan(16);
  const list = resultList(page);
  await expect(list.getByText(/^Approx\. /)).toHaveCount(3);
  await expect(list.getByText('Police Line Road')).toHaveCount(0);
  await expect(list.getByText('Hospital Road Chemist')).toHaveCount(0);
  await expect(list.getByText('Fire Station (Unnamed)')).toBeVisible();
  await expect(list.getByText(/^Clinic$/)).toHaveCount(1);
});

test('if the servers are at capacity, the backup is used quickly', async ({ page }) => {
  await page.route(/interpreter/, (route) => route.fulfill({ status: 502, headers: { 'access-control-allow-origin': '*' }, body: 'busy' }));
  await page.route(/nominatim.*viewbox/, (route) => json(route, backupPlaces));
  const seconds = await searchConnaughtPlace(page);
  await expect(resultList(page).getByText(/^Approx\. /)).toHaveCount(3);
  expect(seconds).toBeLessThan(8);
});

test.describe('when every server fails', () => {
  test.use({ expectedErrors: [/Failed to discover facilities/] });

  test('it says so and offers 112', async ({ page }) => {
    await page.route(/interpreter/, (route) => route.abort());
    await page.route(/nominatim.*viewbox/, (route) => route.abort());
    await searchConnaughtPlace(page);
    await expect(page.getByRole('alert').filter({ hasText: 'Unable to load nearby places' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Call 112 Now' }).last()).toBeVisible();
  });
});
