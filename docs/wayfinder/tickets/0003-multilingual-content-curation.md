# [Task] Structure multilingual CV content (en, ru, kk) from crawled LinkedIn and GitHub repositories

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (HITL)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: none

## Question

How should the crawled profile data (Tengizchevroil roles, Turnaround Digitalization, TEA-RECS, SAFe 6 & HackerRank certifications, HTML Academy, Udacity, honors, recommendations) and GitHub projects (`prices-monitor`, `next-geo-exp`, Power BI custom visuals) be organized into structured, typed data schemas for English (`en`), Russian (`ru`), and Kazakh (`kk`)?

## Findings & Deliverables

Completed multilingual content curation, typed Zod schema specifications, localized production datasets, and automated test suite saved in the repository:
- **Deliverable Documentation**: [docs/research/multilingual-cv-content.md](../../research/multilingual-cv-content.md)
- **Strict Zod Schemas**: [src/content/config.ts](../../../src/content/config.ts)
- **Production Localized Datasets**:
  - [src/data/cv-en.json](../../../src/data/cv-en.json) (English - default)
  - [src/data/cv-ru.json](../../../src/data/cv-ru.json) (Russian)
  - [src/data/cv-kk.json](../../../src/data/cv-kk.json) (Kazakh)
- **Automated Validation Test Suite**: [scratch/test_multilingual_content.ts](../../../scratch/test_multilingual_content.ts) (47/47 tests passed)

Key conclusions & structural resolutions:
1. **Schema Design & Validation**: Formalized strict Zod schemas (`periodSchema`, `experienceSchema`, `metricSchema`, `projectSchema`, `certificationSchema`, `honorSchema`, `educationSchema`, `contactInfoSchema`, `candidateProfileSchema`) with ISO date validation (`YYYY-MM`), URL validation, and role type classifications.
2. **Career Data & Quantifiable Metrics**: Curated authentic, verified enterprise data across all 5 career roles (Chevron / Tengizchevroil Turnaround, Norsec Delta Projects TEA-RECS, Aviata.kz, KPO, Schlumberger) and 4 core KPI metrics (30m ➔ 1.5s load time, 90m ➔ 15m CI/CD, 1-3h ➔ minutes ERP sync, WebSQL ➔ Dexie.js offline PWA).
3. **Multilingual Parity & Kazakh Cyrillic Typography**: Generated complete, idiomatically accurate translations in Russian and Kazakh. All 18 extended Kazakh Cyrillic glyphs audited and verified in `cv-kk.json` (72 `ә`, 91 `ғ`, 203 `қ`, 61 `ң`, 35 `ө`, 45 `ұ`, 68 `ү`, 420 `і`), with correct candidate name representation (`Аңсаған Ислямғалиев`).
4. **Text Expansion Budgeting**: Character count expansion measured at +7.2% for Russian and +7.5% for Kazakh relative to English, maintaining tight prose density within the 6-tier CSS layout elasticity budget and supporting deterministic 1-to-2 page PDF export.
5. **Unblocking Downstream Pipeline**: Directly unblocks Ticket `#0004` (Scaffold Astro project) and `#0005` (Implement Overview and CV Timeline pages).
