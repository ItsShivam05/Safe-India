import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';
import { allPages, absoluteUrl, awarenessPath, OG_IMAGE_PATH, scenarioPath, SITE_NAME, TAB_PATHS } from '../src/data/site.ts';
import type { PageMeta } from '../src/data/site.ts';
import { emergencyScenarios } from '../src/data/emergencies.ts';
import { awarenessGuides } from '../src/data/awareness.ts';

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const list = (tag: 'ol' | 'ul', items: string[]) =>
  `<${tag} style="padding-left:1.5rem;list-style:${tag === 'ol' ? 'decimal' : 'disc'}">${items
    .map((item) => `<li style="margin:.4rem 0">${escapeHtml(item)}</li>`)
    .join('')}</${tag}>`;

const heading = (text: string) => `<h2 style="font-size:1.2rem;font-weight:800;margin-top:1.5rem">${escapeHtml(text)}</h2>`;

/**
 * Plain HTML for a guide. It shows until the app loads, which means the steps are readable
 * on a very slow connection, and search engines can read them. The app then replaces it.
 */
function renderPageContent(page: PageMeta): string {
  const scenario = emergencyScenarios.find((sc) => scenarioPath(sc.id) === page.path);
  const guide = awarenessGuides.find((g) => awarenessPath(g.id) === page.path);
  const parts: string[] = [];

  if (scenario) {
    parts.push(`<h1 style="font-size:1.75rem;font-weight:900">${escapeHtml(scenario.title.en)}</h1>`);
    if (scenario.immediateActionText) parts.push(`<p><strong>${escapeHtml(scenario.immediateActionText.en)}</strong></p>`);
    if (scenario.immediateCallNumber) {
      parts.push(`<p><a href="tel:${scenario.immediateCallNumber}" style="color:#B42318;font-weight:700;text-decoration:underline">Call ${scenario.immediateCallNumber}</a></p>`);
    }
    parts.push(heading('What to Do Right Now'), list('ol', scenario.doNow.en));
    parts.push(heading('What NOT to Do'), list('ul', scenario.dont.en));
    parts.push(heading('After the Immediate Threat Has Passed'), list('ul', scenario.afterDanger.en));
  } else if (guide) {
    parts.push(`<h1 style="font-size:1.75rem;font-weight:900">${escapeHtml(guide.title.en)}</h1>`);
    parts.push(`<p>${escapeHtml(guide.summary.en)}</p>`);
    parts.push(heading('What to Do'), list('ul', guide.doList.en));
    parts.push(heading('What NOT to Do'), list('ul', guide.dontList.en));
    if (guide.checklist) parts.push(heading('Safety Checklist'), list('ul', guide.checklist.en));
  } else {
    parts.push(`<h1 style="font-size:1.75rem;font-weight:900">${escapeHtml(page.title)}</h1>`);
    parts.push(`<p>${escapeHtml(page.description)}</p>`);
  }

  parts.push('<p style="margin-top:1.5rem"><a href="tel:112" style="color:#B42318;font-weight:700;text-decoration:underline">In immediate danger? Call 112.</a></p>');
  return `<main style="max-width:48rem;margin:0 auto;padding:1.5rem;line-height:1.6">${parts.join('')}</main>`;
}

function renderPageHtml(template: string, page: PageMeta, includeContent: boolean): string {
  const url = absoluteUrl(page.path === TAB_PATHS.home ? '/' : page.path);
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);

  const tags = [
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${absoluteUrl(OG_IMAGE_PATH)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ].join('\n    ');

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${title}</title>`)
    .replace(/<meta name="description"[^>]*>/, () => `<meta name="description" content="${description}" />`)
    .replace('</head>', () => `    ${tags}\n  </head>`);

  if (includeContent) {
    html = html.replace('<div id="root"></div>', () => `<div id="root">${renderPageContent(page)}</div>`);
  }
  return html;
}

/**
 * After each build, writes a small HTML file per page. WhatsApp and search engines don't
 * run JavaScript, so this is how each guide gets its own title, description and steps.
 */
export function prerenderPages(): Plugin {
  let outDir = '';

  return {
    name: 'safeindia-prerender-pages',
    apply: 'build',
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');

      for (const page of allPages) {
        if (page.path === TAB_PATHS.home) {
          // Also the fallback for unknown addresses, so it keeps an empty page body.
          fs.writeFileSync(path.join(outDir, 'index.html'), renderPageHtml(template, page, false));
          continue;
        }
        const dir = path.join(outDir, page.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'index.html'), renderPageHtml(template, page, true));
      }

      const sitemapUrls = allPages.map((page) => `  <url><loc>${absoluteUrl(page.path)}</loc></url>`).join('\n');
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
      );
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
      );
    },
  };
}
