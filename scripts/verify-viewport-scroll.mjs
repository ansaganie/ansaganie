import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const distDir = path.resolve('dist');
const astroDir = path.join(distDir, '_astro');
const cssFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.css'));
const cssContent = fs.readFileSync(path.join(astroDir, cssFiles[0]), 'utf8');

const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'measure-scroll-'));

const viewports = [320, 375, 1440];
const themes = ['light', 'dark'];
const pages = [
  { name: 'Overview (EN)', html: path.join(distDir, 'index.html') },
  { name: 'Overview (RU)', html: path.join(distDir, 'ru', 'index.html') },
  { name: 'Overview (KK)', html: path.join(distDir, 'kk', 'index.html') },
];

console.log('=== Checking Horizontal Scroll at 320, 375, 1440 px in Light and Dark Themes ===\n');

let allPassed = true;

for (const p of pages) {
  let baseHtml = fs.readFileSync(p.html, 'utf8');
  baseHtml = baseHtml.replace(/<link\s+rel="stylesheet"\s+href="\/_astro\/[^"]+">/i, `<style>${cssContent}</style>`);

  for (const theme of themes) {
    for (const width of viewports) {
      // Inject script that tests horizontal scroll and writes result to a DOM element or title
      const checkScript = `
        <script>
          window.addEventListener('DOMContentLoaded', () => {
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add('${theme}');
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const diff = docWidth - winWidth;
            const marker = document.createElement('div');
            marker.id = 'scroll-check-result';
            marker.setAttribute('data-scroll-width', docWidth);
            marker.setAttribute('data-inner-width', winWidth);
            marker.setAttribute('data-overflow', diff > 0 ? diff : 0);
            document.body.appendChild(marker);
          });
        </script>
      `;

      let testHtml = baseHtml.replace('</head>', `${checkScript}</head>`);
      const tempHtmlPath = path.join(tempDir, `test-${path.basename(p.name)}-${theme}-${width}.html`);
      fs.writeFileSync(tempHtmlPath, testHtml, 'utf8');

      const dump = execFileSync(chromePath, [
        '--headless=new',
        '--disable-gpu',
        `--window-size=${width},900`,
        '--dump-dom',
        tempHtmlPath,
      ], { encoding: 'utf8' });

      const match = dump.match(/id="scroll-check-result"[^>]*data-overflow="([^"]+)"/);
      if (!match) {
        console.error(`  [FAIL] ${p.name} at ${width}px (${theme}): could not detect scroll check result`);
        allPassed = false;
      } else {
        const overflow = parseFloat(match[1]);
        if (overflow > 0) {
          console.error(`  [FAIL] ${p.name} at ${width}px (${theme}): overflow by ${overflow}px`);
          allPassed = false;
        } else {
          console.log(`  [PASS] ${p.name} at ${width}px (${theme}): no horizontal scroll`);
        }
      }
    }
  }
}

fs.rmSync(tempDir, { recursive: true, force: true });

if (!allPassed) {
  console.error('\nHorizontal scroll check FAILED!');
  process.exit(1);
} else {
  console.log('\nAll viewport & theme checks PASSED!\n');
}
