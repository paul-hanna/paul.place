#!/usr/bin/env node
// build-thumbs.js — Generate WebP thumbnails for section-list cards.
// Run: node build-thumbs.js  (or: npm run build)
// Skips .gif (animated thumbs stay as-is) and files already up to date.

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, 'images/works');
const OUT = path.join(__dirname, 'images/thumbs');
const WIDTH = 900;   // card is ~700px wide; 900 covers retina-ish without bloat
const QUALITY = 72;

fs.mkdirSync(OUT, { recursive: true });

(async () => {
  let made = 0, skipped = 0;
  for (const file of fs.readdirSync(SRC)) {
    if (!/\.(png|jpe?g)$/i.test(file)) { skipped++; continue; }
    const src = path.join(SRC, file);
    const out = path.join(OUT, file.replace(/\.(png|jpe?g)$/i, '.webp'));
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs) { skipped++; continue; }
    // .rotate() with no args applies EXIF orientation before the flag is stripped
    await sharp(src).rotate().resize({ width: WIDTH, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(out);
    made++;
  }
  console.log(`Thumbnails: ${made} generated, ${skipped} skipped`);
})().catch(e => { console.error(e); process.exit(1); });
