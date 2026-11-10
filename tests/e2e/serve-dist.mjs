// Serves the built site the way Vercel does: real files first, then the app for any other
// address, with the security headers from vercel.json on every response.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const DIST = path.resolve('dist');
const PORT = 4173;
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
const headers = vercel.headers.find((rule) => rule.source === '/(.*)').headers;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
};

http
  .createServer((req, res) => {
    let file = path.join(DIST, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (!file.startsWith(DIST)) file = DIST;
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) file = path.join(DIST, 'index.html');

    for (const { key, value } of headers) res.setHeader(key, value);
    res.setHeader('Content-Type', TYPES[path.extname(file)] ?? 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  })
  .listen(PORT, () => console.log(`Serving dist on http://localhost:${PORT}`));
