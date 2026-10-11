import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// Find the 32-hex character key file in public/
const keyFiles = readdirSync(publicDir).filter((file) => /^[0-9a-f]{32}\.txt$/i.test(file));

if (keyFiles.length === 0) {
  console.error('No IndexNow key file found in public/ (*.txt with 32 hex chars).');
  process.exit(1);
}

const keyFileName = keyFiles[0];
const key = readFileSync(join(publicDir, keyFileName), 'utf-8').trim();
const host = 'ansaganie.dev';
const keyLocation = `https://${host}/${keyFileName}`;

const urlList = [
  `https://${host}/`,
  `https://${host}/cv/`,
  `https://${host}/ru/`,
  `https://${host}/ru/cv/`,
  `https://${host}/kk/`,
  `https://${host}/kk/cv/`,
];

const payload = {
  host,
  key,
  keyLocation,
  urlList,
};

console.log(`Submitting ${urlList.length} URLs to IndexNow for ${host}...`);
console.log(`Key location: ${keyLocation}`);

try {
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const bodyText = await response.text();

  if (response.status === 200) {
    console.log('✓ IndexNow submission succeeded (200 OK: URLs submitted).');
  } else if (response.status === 202) {
    console.log('✓ IndexNow submission accepted (202 Accepted: key validation in progress).');
  } else {
    console.warn(`IndexNow response ${response.status} ${response.statusText}: ${bodyText || '(empty body)'}`);
  }
} catch (error) {
  console.error('Failed to submit URLs to IndexNow:', error);
  // Non-fatal warning so network hiccups do not fail deployments
}
