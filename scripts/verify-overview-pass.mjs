import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

console.log('=== Running Verification for Ticket #0016: Overview Visual Pass ===\n');

let failedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
  } catch (err) {
    failedTests++;
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    ${err.message}\n`);
  }
}

const rootDir = process.cwd();
const i18nPath = path.join(rootDir, 'src/utils/i18n.ts');
const headerPath = path.join(rootDir, 'src/components/layout/Header.astro');
const overviewPath = path.join(rootDir, 'src/components/overview/OverviewContent.astro');
const distIndexPath = path.join(rootDir, 'dist/index.html');
const distRuIndexPath = path.join(rootDir, 'dist/ru/index.html');
const distKkIndexPath = path.join(rootDir, 'dist/kk/index.html');

const i18nContent = fs.readFileSync(i18nPath, 'utf8');
const headerContent = fs.readFileSync(headerPath, 'utf8');
const overviewContent = fs.readFileSync(overviewPath, 'utf8');

// 1. i18n Translations
test('i18n contains nav.projects for en, ru, and kk', () => {
  assert(i18nContent.includes("'nav.projects': 'Projects'"), 'Missing nav.projects in English');
  assert(i18nContent.includes("'nav.projects': 'Проекты'"), 'Missing nav.projects in Russian');
  assert(i18nContent.includes("'nav.projects': 'Жобалар'"), 'Missing nav.projects in Kazakh');
});

// 2. Header Navigation
test('Header navigation includes a nav link for Projects linking to ${homePath}#projects or #projects', () => {
  const hasProjectsLink = headerContent.includes('nav.projects') &&
    (headerContent.includes('#projects') || headerContent.includes('${homePath}#projects'));
  assert(hasProjectsLink, 'Header.astro does not contain nav link for Projects linking to #projects');
});

test('Header brand does not have pulse dot', () => {
  const brandRegex = /<a[^>]*href=\{homePath\}[^>]*>([\s\S]*?)<\/a>/;
  const match = headerContent.match(brandRegex);
  assert(match, 'Could not find brand link in Header.astro');
  assert(!match[1].includes('animate-pulse'), 'Header brand link still contains pulse dot');
  assert(!match[1].includes('bg-status-success'), 'Header brand link still contains status dot');
});

// 3. Overview Content: Section Order
test('Overview sections order is Hero -> Projects -> Highlights -> Tech stack', () => {
  // Find relative positions of sections in OverviewContent.astro
  const heroIndex = overviewContent.indexOf('hero-title');
  const projectsIndex = overviewContent.indexOf('projects-title');
  const highlightsIndex = overviewContent.indexOf('highlights-title');
  const competenciesIndex = overviewContent.indexOf('competencies-title');

  assert(heroIndex !== -1, 'Hero section not found');
  assert(projectsIndex !== -1, 'Projects section not found');
  assert(highlightsIndex !== -1, 'Highlights section not found');
  assert(competenciesIndex !== -1, 'Competencies/Tech stack section not found');

  assert(
    heroIndex < projectsIndex,
    `Hero (idx ${heroIndex}) must precede Projects (idx ${projectsIndex})`
  );
  assert(
    projectsIndex < highlightsIndex,
    `Projects (idx ${projectsIndex}) must precede Highlights (idx ${highlightsIndex})`
  );
  assert(
    highlightsIndex < competenciesIndex,
    `Highlights (idx ${highlightsIndex}) must precede Tech stack (idx ${competenciesIndex})`
  );
});

// 4. Projects Section Anchor
test('Projects section has id="projects"', () => {
  const hasProjectsId = /<section[^>]*id="projects"[^>]*>/.test(overviewContent) ||
    overviewContent.includes('id="projects"');
  assert(hasProjectsId, 'Projects section missing id="projects" attribute');
});

// 5. Template Styling Removal: Pulse dot in Hero
test('Hero does not contain pulse dot', () => {
  assert(!overviewContent.includes('animate-pulse'), 'OverviewContent still contains animate-pulse');
});

// 6. Template Styling Removal: ENTERPRISE badge removed from project cards
test('ENTERPRISE badges removed from project cards', () => {
  assert(
    !overviewContent.includes('projects.enterprise'),
    'OverviewContent still renders projects.enterprise badge'
  );
  assert(
    !overviewContent.includes('ENTERPRISE'),
    'OverviewContent still contains ENTERPRISE badge literal'
  );
});

// 7. Template Styling Removal: Impact chip replaced with plain bold text
test('Green Impact: chip replaced with plain bold text in project cards', () => {
  const projectSection = overviewContent.split('id="projects"')[1].split('</section>')[0];
  assert(
    !projectSection.includes('bg-status-success-bg'),
    'Project cards still contain bg-status-success-bg chip for impact'
  );
  assert(
    !projectSection.includes('text-status-success'),
    'Project cards still contain text-status-success green text'
  );
  assert(
    projectSection.includes('projects.impact'),
    'Project cards must still display projects.impact'
  );
  assert(
    projectSection.includes('font-bold'),
    'Project impact must be rendered as bold text'
  );
});

// 8. Competencies skills compressed to one line per group
test('Competencies skills compressed to one line per group (like CvContent.astro)', () => {
  // Should not have the 3 separate grid columns with map() bullet lists
  assert(
    !overviewContent.includes('profile.skills.backend.map'),
    'OverviewContent still maps over backend skills as bullet points'
  );
  assert(
    !overviewContent.includes('profile.skills.frontend.map'),
    'OverviewContent still maps over frontend skills as bullet points'
  );
  assert(
    !overviewContent.includes('profile.skills.architecture.map'),
    'OverviewContent still maps over architecture skills as bullet points'
  );
  // Should use .join(', ')
  assert(
    overviewContent.includes('.join('),
    'Competencies skills must be joined on one line per group'
  );
});

// 9. Typography scale
test('Typography scale: headings are text-base font-semibold text-content-primary', () => {
  assert(
    !overviewContent.includes('text-sm font-mono uppercase tracking-wider text-content-tertiary font-bold'),
    'Section headings still use small tertiary uppercase mono typography'
  );
  assert(
    overviewContent.includes('text-base font-semibold text-content-primary'),
    'Section headings must use text-base font-semibold text-content-primary'
  );
});

test('Typography scale: tags are text-xs and body copy is text-sm', () => {
  assert(
    !overviewContent.includes('text-[10px]'),
    'OverviewContent still uses text-[10px] tags (should be text-xs)'
  );
});

// 10. Check built HTML if dist exists
if (fs.existsSync(distIndexPath)) {
  const html = fs.readFileSync(distIndexPath, 'utf8');

  test('[Built HTML] Header includes Projects nav link', () => {
    assert(html.includes('#projects'), 'Built HTML header missing #projects link');
    assert(html.includes('Projects'), 'Built HTML header missing Projects label');
  });

  test('[Built HTML] Section order is Hero -> Projects -> Highlights -> Tech stack', () => {
    const heroPos = html.indexOf('hero-title');
    const projPos = html.indexOf('projects-title');
    const highlightsPos = html.indexOf('highlights-title');
    const techPos = html.indexOf('competencies-title');

    assert(heroPos !== -1 && projPos !== -1 && highlightsPos !== -1 && techPos !== -1, 'Sections not found in built HTML');
    assert(heroPos < projPos, 'Hero must appear before Projects');
    assert(projPos < highlightsPos, 'Projects must appear before Highlights');
    assert(highlightsPos < techPos, 'Highlights must appear before Tech stack');
  });

  test('[Built HTML] No ENTERPRISE badge in built HTML', () => {
    assert(!html.includes('ENTERPRISE'), 'Built HTML still contains ENTERPRISE badge');
  });

  test('[Built HTML] Section id="projects" exists', () => {
    assert(html.includes('id="projects"'), 'Built HTML missing id="projects"');
  });
}

console.log(`\nVerification finished: ${failedTests} failure(s).`);
if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('ALL TESTS PASSED!\n');
  process.exit(0);
}
