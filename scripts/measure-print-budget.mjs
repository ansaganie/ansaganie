import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const distDir = path.resolve('dist');
const astroDir = path.join(distDir, '_astro');
const cssFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.css'));
const cssContent = fs.readFileSync(path.join(astroDir, cssFiles[0]), 'utf8');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'measure-print-'));

const pages = [
  { name: 'Overview (EN)', html: path.join(distDir, 'index.html'), expectedMax: 1 },
  { name: 'Overview (RU)', html: path.join(distDir, 'ru', 'index.html'), expectedMax: 1 },
  { name: 'Overview (KK)', html: path.join(distDir, 'kk', 'index.html'), expectedMax: 1 },
  { name: 'CV (EN)', html: path.join(distDir, 'cv', 'index.html'), expectedMax: 2 },
  { name: 'CV (RU)', html: path.join(distDir, 'ru', 'cv', 'index.html'), expectedMax: 2 },
  { name: 'CV (KK)', html: path.join(distDir, 'kk', 'cv', 'index.html'), expectedMax: 2 },
];

console.log('=== Measuring Print Budget across Locales ===');

let allPassed = true;

for (const p of pages) {
  let html = fs.readFileSync(p.html, 'utf8');
  html = html.replace(/<link\s+rel="stylesheet"\s+href="\/_astro\/[^"]+">/i, `<style>${cssContent}</style>`);
  
  const tempHtml = path.join(tempDir, `${path.basename(p.name)}.html`);
  const outPdf = path.join(tempDir, `${path.basename(p.name)}.pdf`);
  fs.writeFileSync(tempHtml, html, 'utf8');

  execFileSync(chromePath, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPdf}`,
    tempHtml,
  ]);

  const pdfRaw = fs.readFileSync(outPdf, 'utf8');
  const matches = pdfRaw.match(/\/Type\s*\/Page\b/g);
  const pageCount = matches ? matches.length : 0;

  const status = pageCount <= p.expectedMax ? 'PASS' : 'FAIL';
  console.log(`  [${status}] ${p.name}: ${pageCount} page(s) (budget: max ${p.expectedMax})`);
  if (pageCount > p.expectedMax) {
    allPassed = false;
  }
}

fs.rmSync(tempDir, { recursive: true, force: true });

if (!allPassed) {
  console.error('\nPrint budget check FAILED!');
  process.exit(1);
} else {
  console.log('\nPrint budget check PASSED!\n');
}
