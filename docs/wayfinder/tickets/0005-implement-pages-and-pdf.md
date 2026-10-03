# [Task] Implement Overview page, CV Timeline page, and downloadable PDF CV functionality

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0004

## Question

How should the two main pages be implemented using the curated content collections and design prototype:
1. Overview page (`/`, `/ru`, `/kk`)
2. Timeline page (`/timeline`, `/ru/timeline`, `/kk/timeline`)
And how should the PDF download action be wired (clean print-optimized view with header button triggering print-to-PDF / direct PDF download)?

## Findings & Deliverables

Refined the #0004 skeletons rather than rebuilding them. `npm run check` reports 0 errors and `npm run build` produces 6 pages.

- **i18n completeness**: the skeletons hardcoded English headings, labels and the header name in every locale. About 35 strings now live in [i18n.ts](../../../src/utils/i18n.ts) (`contact.*`, `metrics.*`, `skills.*`, `projects.*`, `cv.*`, `site.name`) with RU and KK translations, used by [OverviewContent.astro](../../../src/components/overview/OverviewContent.astro), [CvContent.astro](../../../src/components/cv/CvContent.astro) and [Header.astro](../../../src/components/layout/Header.astro). The CV address now reads the localized `contact.location`. A scan of the built RU/KK pages leaves only technology names and proper nouns in Latin script.
- **Route naming**: the CV page stays at `/cv`, `/ru/cv`, `/kk/cv` as #0002 specified. The `/timeline` wording in this ticket is superseded.
- **PDF**: the decision is browser print-to-PDF via `@media print`, wired to a header button, a CV-page button and a new Overview button (all call `window.print()`). No direct-download file and no headless Chromium step; that stays in the map's fog.
- **Print budget (measured with headless Chrome, A4)**: Overview 1 page and CV 2 pages in EN, RU and KK. Starting point was Overview 3 and CV 3 to 4. [print.css](../../../src/styles/print.css) gained a density pass (sections 10 and 11). Overview hides the skills matrix, metric details, project tech and links, and the long summary in print. RU and KK CV prints also hide the per-role tech chips, which the Technical Competencies section already lists.

### Open issues for later tickets

- The `@page` footer "Page X of Y" in print.css is English only and `counter(pages)` is not widely supported.
- Visual QA beyond page counts has not been done (screenshots, dark mode, mobile widths).
- Header brand and `site.title` still use the old "Angsagan Islyamgaliyev" transliteration in EN; confirm the preferred spelling.
- Certification verification URLs in the datasets are generic issuer homepages, not real credential links.
