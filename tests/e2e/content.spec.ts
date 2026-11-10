import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import { checkContent } from '../../scripts/checkContent.ts';

test('guide and helpline data has no mistakes', () => {
  expect(checkContent().errors).toEqual([]);
});

test('every map server the app calls is allowed by the security policy', () => {
  const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  const csp: string = vercel.headers[0].headers.find((h: { key: string }) => h.key === 'Content-Security-Policy').value;
  const connectSrc = csp.split(';').find((part) => part.trim().startsWith('connect-src')) ?? '';

  const sources = ['src/services/overpassService.ts', 'src/services/locationService.ts']
    .map((file) => fs.readFileSync(file, 'utf8'))
    .join('\n');
  const hosts = [...new Set([...sources.matchAll(/https:\/\/([a-z0-9.-]+)\//g)].map((m) => m[1]))];

  expect(hosts.length).toBeGreaterThan(0);
  for (const host of hosts.filter((h) => h !== 'www.google.com')) {
    expect(connectSrc, `${host} must be in connect-src`).toContain(`https://${host}`);
  }
});
