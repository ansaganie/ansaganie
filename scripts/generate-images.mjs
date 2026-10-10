// Renders the share card and favicon rasters with headless Chrome:
//   scripts/og-image.html + src/data/cv-en.json -> public/og-image.png (1200×630)
//   public/favicon.svg -> public/apple-touch-icon.png (180×180), public/favicon.ico (16 + 32)
// Rerun after changing the name, title, availability or primary skills in cv-en.json, or the favicon.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { findChrome } from './chrome.mjs';

const SITE_HOST = 'ansaganie.vercel.app';

const escapeHtml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function screenshot(chromePath, htmlFile, outPng, width, height) {
  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    // Transparent page background, so icon corners stay transparent.
    '--default-background-color=00000000',
    `--window-size=${width},${height}`,
    // Lets the web fonts finish loading before the capture.
    '--virtual-time-budget=10000',
    `--screenshot=${outPng}`,
    pathToFileURL(htmlFile).href,
  ]);
}

// An ICO file whose entries are embedded PNGs (supported by every current browser).
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0);
    entry.writeUInt8(size, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...pngs.map(({ data }) => data)]);
}

function generateImages() {
  const chromePath = findChrome();
  console.log(`==> Found browser at: ${chromePath}`);

  const publicDir = path.resolve('public');
  const faviconSvg = path.join(publicDir, 'favicon.svg');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-images-'));

  try {
    const profile = JSON.parse(fs.readFileSync(path.resolve('src/data/cv-en.json'), 'utf8'));
    const ogHtml = fs
      .readFileSync(path.resolve('scripts/og-image.html'), 'utf8')
      .replace('{{favicon}}', pathToFileURL(faviconSvg).href)
      .replace('{{name}}', escapeHtml(profile.name))
      .replace('{{title}}', escapeHtml(profile.title))
      .replace('{{stack}}', profile.skills.primary.map((skill) => `<span>${escapeHtml(skill)}</span>`).join(''))
      .replace('{{host}}', SITE_HOST)
      .replace('{{availability}}', escapeHtml(profile.contact.availability));
    const ogHtmlFile = path.join(tempDir, 'og-image.html');
    fs.writeFileSync(ogHtmlFile, ogHtml, 'utf8');
    screenshot(chromePath, ogHtmlFile, path.join(publicDir, 'og-image.png'), 1200, 630);
    console.log('    ✓ public/og-image.png');

    // iOS paints transparent corners black, so the touch icon gets a solid background.
    const renderIcon = (size, background = 'transparent') => {
      const htmlFile = path.join(tempDir, `icon-${size}.html`);
      fs.writeFileSync(
        htmlFile,
        `<!doctype html><style>*{margin:0}html,body{background:${background}}img{display:block;width:${size}px;height:${size}px}</style>` +
          `<img src="${pathToFileURL(faviconSvg).href}" alt="">`,
        'utf8'
      );
      const outPng = path.join(tempDir, `icon-${size}.png`);
      screenshot(chromePath, htmlFile, outPng, size, size);
      return fs.readFileSync(outPng);
    };

    fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), renderIcon(180, '#0369a1'));
    console.log('    ✓ public/apple-touch-icon.png');

    const ico = buildIco([16, 32].map((size) => ({ size, data: renderIcon(size) })));
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
    console.log('    ✓ public/favicon.ico');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

generateImages();
