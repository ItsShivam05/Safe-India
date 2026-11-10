import { test, expect } from './fixtures';

// "Describe what happened" must find the right guide, and must say so when it can't,
// because a wrong guide is more dangerous than sending someone to call 112.
const cases: Array<[string, string | null]> = [
  ['A stranger keeps following me near metro', 'Someone is following me'],
  ['Someone deducted money via UPI OTP', 'UPI'],
  ['Someone has fainted and is unconscious', 'unconscious'],
  ['Kitchen cylinder gas smell is leaking', 'LPG'],
  ['a snake bit my brother', 'Snake'],
  ['dog bit my son', 'Dog'],
  ['my phone is lost', 'Phone'],
  ['there is a fire in my building', 'Fire'],
  ['man is bleeding a lot', 'bleeding'],
  ['cab driver is scaring me', 'cab'],
  ['car hit a man on the road', 'Accident'],
  ['मेरा पीछा कर रहा है', 'Someone is following me'],
  ['my father is having chest pain', null],
  ['my child swallowed poison', null],
  ['someone stole my bike', null],
  ['the baby has a high fever', null],
  ['person drowning in river', null],
  ['roof is leaking', null],
  ['got fired from my job', null],
];

test('matches descriptions to the right guide, or admits it cannot', async ({ page }) => {
  await page.goto('/');
  const input = page.getByPlaceholder(/following me near metro/);

  for (const [query, expected] of cases) {
    await input.fill(query);
    await input.press('Enter');
    if (expected === null) {
      await expect(page.getByText('No exact guide found'), query).toBeVisible();
    } else {
      await expect(page.getByRole('button', { name: /^Open Full Guide/ }), query).toContainText(expected);
    }
  }
});

test('no-match panel offers 112 and every guide', async ({ page }) => {
  await page.goto('/');
  const input = page.getByPlaceholder(/following me near metro/);
  await input.fill('pizza recipe');
  await input.press('Enter');

  const panel = page.getByRole('status').filter({ hasText: 'No exact guide found' });
  await expect(panel.locator('a[href="tel:112"]')).toHaveCount(1);
  await expect(panel.getByRole('button')).toHaveCount(11);
  await panel.getByRole('button').first().click();
  await expect(page.locator('h1').first()).toContainText('following');
});
