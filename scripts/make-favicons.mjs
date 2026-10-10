// Generates the favicon files in public/ from the brand app icon. Run: node scripts/make-favicons.mjs
// Resizes only — the brand file is never recoloured.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SRC = 'src/assets/brand/app_icon_1024.png';
const IVORY = { r: 0xf8, g: 0xf3, b: 0xe9, alpha: 1 };

const png = (size) => sharp(SRC).resize(size, size).png().toBuffer();

const p32 = await png(32);
const p16 = await png(16);
writeFileSync('public/favicon-32.png', p32);

// ICO container holding PNG-encoded 16 and 32 px images.
const entries = [p16, p32];
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(entries.length, 4);
let offset = 6 + 16 * entries.length;
const dir = entries.map((buf, i) => {
  const size = i === 0 ? 16 : 32;
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0); e.writeUInt8(size, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
  offset += buf.length;
  return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...dir, ...entries]));

// Apple touch icon: iOS needs an opaque square, so the transparent corners are filled with the page ivory.
await sharp(SRC).resize(180, 180).flatten({ background: IVORY }).png().toFile('public/apple-touch-icon.png');
console.log('favicons written to public/');
