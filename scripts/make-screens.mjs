// Builds the web copies of the four app screenshots and the side-by-side preview sheet.
//   node scripts/make-screens.mjs
// Reads  src/assets/screens/originals/<name>.png   (untouched captures, Pixel 7 Pro, 1440×3120)
// Writes src/assets/screens/<name>.png             (the crop below, 720 px wide, lossless PNG)
//        docs/sessions/2026-10-18_W2_screens_preview.png (the four crops in phone frames)
// The only edit is one crop, the same box for all four: the status bar at the top and everything
// from the first row of the red DEV strip down (strip + Android navigation bar). Nothing is
// recoloured, retouched or stretched.
import sharp from 'sharp';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const names = ['fridge-clearer', 'cook-mode', 'sos', 'what-you-learned'];
const SRC = { width: 1440, height: 3120 };
const CROP = { top: 96, bottom: 2906 };            // rows kept: 96 … 2905 → 1440×2810
const box = { left: 0, top: CROP.top, width: SRC.width, height: CROP.bottom - CROP.top };
const WEB_WIDTH = 720;

for (const n of names) {
  const src = join(root, 'src/assets/screens/originals', `${n}.png`);
  const m = await sharp(src).metadata();
  if (m.width !== SRC.width || m.height !== SRC.height) throw new Error(`${n}: expected ${SRC.width}×${SRC.height}, got ${m.width}×${m.height}`);
  await sharp(src).extract(box).resize({ width: WEB_WIDTH }).png({ compressionLevel: 9 })
    .toFile(join(root, 'src/assets/screens', `${n}.png`));
  console.log(`${n}: cropped to ${box.width}×${box.height}, saved at ${WEB_WIDTH} px`);
}

// Preview sheet: four frames like the site's .phone (2 px sage border, 22 px radius) on ivory.
const frameW = 300, radius = 22, border = 2, gap = 30, margin = 40;
const frameH = Math.round(frameW * box.height / box.width);
const sheetW = margin * 2 + frameW * 4 + gap * 3, sheetH = margin * 2 + frameH;
const mask = Buffer.from(`<svg width="${frameW}" height="${frameH}"><rect width="${frameW}" height="${frameH}" rx="${radius}" ry="${radius}" fill="#fff"/></svg>`);
const ring = Buffer.from(`<svg width="${frameW}" height="${frameH}"><rect x="${border / 2}" y="${border / 2}" width="${frameW - border}" height="${frameH - border}" rx="${radius}" ry="${radius}" fill="none" stroke="#B3C29A" stroke-width="${border}"/></svg>`);
const frames = [];
for (const [i, n] of names.entries()) {
  const img = await sharp(join(root, 'src/assets/screens', `${n}.png`)).resize({ width: frameW, height: frameH }).png().toBuffer();
  const rounded = await sharp(img).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
  const left = margin + i * (frameW + gap);
  frames.push({ input: rounded, left, top: margin }, { input: ring, left, top: margin });
}
const out = join(root, 'docs/sessions/2026-10-18_W2_screens_preview.png');
await sharp({ create: { width: sheetW, height: sheetH, channels: 3, background: '#F8F3E9' } }).composite(frames).png().toFile(out);
console.log(`preview sheet ${sheetW}×${sheetH} → ${out}`);
