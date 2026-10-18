// Renders public/og-landing.png (1200×627): sage background, the cream lockup box, the headline
// in TeX Gyre Schola Bold, brown. Brand files are placed, never redrawn.
// Needs a local Chrome: node scripts/make-og-landing.mjs  (set CHROME=<path> if it is elsewhere).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, copyFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = process.env.CHROME ?? 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';
const root = resolve(import.meta.dirname, '..');
const font = pathToFileURL(join(root, 'public/fonts/texgyreschola-bold.woff2')).href;
const lockup = pathToFileURL(join(root, 'src/assets/brand/lockup_horizontal_2400.png')).href;
const out = join(root, 'public/og-landing.png');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Schola';src:url('${font}') format('woff2');font-weight:700;}
html,body{margin:0;width:1200px;height:627px;overflow:hidden;background:#B3C29A;}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:52px;}
img{width:760px;height:auto;display:block;}
h1{margin:0;font:700 72px/1.1 'Schola',serif;color:#4A2E1F;text-align:center;}
</style></head><body><img src="${lockup}"><h1>Cook by feel, not by luck.</h1></body></html>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const page = join(dir, 'og.html');
writeFileSync(page, html);
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--no-first-run', `--user-data-dir=${join(dir, 'profile')}`,
  '--window-size=1200,627', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--virtual-time-budget=3000', `--screenshot=${join(dir, 'og.png')}`, pathToFileURL(page).href,
], { stdio: 'ignore' });
copyFileSync(join(dir, 'og.png'), out);
rmSync(dir, { recursive: true, force: true });
console.log('wrote', out);
