import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execSync, execFileSync } from 'node:child_process';

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    'Chrome / Chromium executable not found. Set CHROME_PATH environment variable to specify your browser path.'
  );
}

function generatePdfs() {
  console.log('==> Step 1: Building static site with Astro...');
  execSync('npm run build', { stdio: 'inherit' });

  const chromePath = findChrome();
  console.log(`==> Step 2: Found browser at: ${chromePath}`);

  const distDir = path.resolve('dist');
  const astroDir = path.join(distDir, '_astro');
  if (!fs.existsSync(astroDir)) {
    throw new Error(`Astro asset directory not found at ${astroDir}`);
  }

  const cssFiles = fs.readdirSync(astroDir).filter((f) => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    throw new Error('No CSS bundle found in dist/_astro');
  }

  const cssContent = fs.readFileSync(path.join(astroDir, cssFiles[0]), 'utf8');

  const outputDir = path.resolve('public/cv');
  fs.mkdirSync(outputDir, { recursive: true });

  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'astro-pdf-cv-'));

  const targets = [
    {
      sourceHtml: path.join(distDir, 'cv', 'index.html'),
      pdfName: 'Ansagan_Islyamgaliyev_CV.pdf',
    },
    {
      sourceHtml: path.join(distDir, 'ru', 'cv', 'index.html'),
      pdfName: 'Ansagan_Islyamgaliyev_CV_RU.pdf',
    },
    {
      sourceHtml: path.join(distDir, 'kk', 'cv', 'index.html'),
      pdfName: 'Ansagan_Islyamgaliyev_CV_KK.pdf',
    },
  ];

  console.log('==> Step 3: Generating static A4 PDF CV files...');

  try {
    for (const target of targets) {
      if (!fs.existsSync(target.sourceHtml)) {
        throw new Error(`Source HTML not found at ${target.sourceHtml}`);
      }

      let html = fs.readFileSync(target.sourceHtml, 'utf8');
      // Inline the bundled stylesheet for reliable, hermetic headless printing
      html = html.replace(/<link\s+rel="stylesheet"\s+href="\/_astro\/[^"]+">/i, `<style>${cssContent}</style>`);

      const tempHtmlFile = path.join(tempDir, `${target.pdfName}.html`);
      fs.writeFileSync(tempHtmlFile, html, 'utf8');

      const outPdfPath = path.join(outputDir, target.pdfName);
      console.log(`    Exporting ${target.pdfName}...`);

      execFileSync(chromePath, [
        '--headless=new',
        '--disable-gpu',
        '--no-pdf-header-footer',
        `--print-to-pdf=${outPdfPath}`,
        tempHtmlFile,
      ]);

      const stat = fs.statSync(outPdfPath);
      console.log(`    ✓ Created ${target.pdfName} (${(stat.size / 1024).toFixed(1)} KB)`);
    }
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }

  console.log('==> Step 4: Syncing generated PDFs to dist/cv for immediate preview...');
  const distCvDir = path.resolve('dist/cv');
  fs.mkdirSync(distCvDir, { recursive: true });
  for (const target of targets) {
    fs.copyFileSync(path.join(outputDir, target.pdfName), path.join(distCvDir, target.pdfName));
  }

  console.log('==> PDF generation complete. Files are ready in public/cv/ and dist/cv/.');
}

generatePdfs();
