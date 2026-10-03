# [Prototype] Live CV design prototype: 2-page layout with compact modern typography, ATS compatibility, and print-to-PDF styles

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:prototype (HITL)
- **Status**: completed
- **Assignee**: subagent:teamwork_preview_worker
- **Blocked by**: none

## Question

How should the 2-page Live CV look and behave across both pages:
1. Overview page (modern hero, tech stack pill grid, featured engineering impact, language switcher).
2. Timeline page (chronological experience, certifications with verification links, awards, recommendations).
How do we ensure the design feels compact, classic, and engaging while preserving semantic HTML for 100% ATS scanner compliance and pixel-clean `@media print` PDF generation?

## Findings & Deliverables

Completed visual design specification, UI component architecture, and layout blueprint deliverable saved at [docs/research/live-cv-design-concepts.md](../../research/live-cv-design-concepts.md).

Key conclusions:
1. **Design System & Contrast (R1)**: 26 dual-mode design tokens (Hex and HSL) mathematically verified against WCAG 2.1 AA/AAA (17.06:1 to 18.30:1 for primary text; $\ge 3.43:1$ for interactive borders).
2. **Kazakh Cyrillic Typography (R1)**: All 18 extended Kazakh Cyrillic glyphs (Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І) audited with 100% native coverage in Inter, Source Sans 3, and JetBrains Mono. Font loading must mandate Google Fonts `cyrillic-ext` subset (`U+0460-052F`) to prevent candidate name dropouts.
3. **2-Page Architecture & Verified Metrics (R2)**: Strictly 2 pages (Page 1: Overview, Page 2: CV Timeline) with Astro component hierarchy, Zod content schemas, and 120-col desktop / 40-col mobile ASCII wireframes incorporating Angsagan's verified metrics (30m ➔ 1.5s load time, 90m ➔ 15m CI/CD, 1-3h ➔ mins ERP sync, WebSQL ➔ IndexedDB Dexie migration, Chevron Challenge Coin, TCO Awards, SAFe 6).
4. **Multilingual i18n & Elasticity (R3)**: Route-preserving switcher `[ EN | RU | ҚАЗ ]` across `/`, `/ru`, `/kk`, `/cv`, `/ru/cv`, `/kk/cv`. 6-tier CSS layout elasticity rules (auto-fit grid, subgrid, `min-inline-size: 0`, container query `cqi` typography, `:lang(ru)` and `:lang(kk)` optical tracking) neutralize +20% to +35% Cyrillic expansion.
5. **ATS Scanner & Print-to-PDF Engine (R4)**: Semantic HTML5 DOM with Schema.org microdata (`Person`, `OrganizationRole`, `EducationalOccupationalCredential`) without tables or hidden layers. Production-ready `@media print` CSS engine with `@page` A4 margins, `break-inside: avoid`, and automatic `<details>` expansion ensures deterministic 1-to-2 page PDF export.
6. **Creative Directions (R5)**: Formulated Concept A (Modern Editorial Engineer), Concept B (Linear-Inspired Technical System), and Concept C (Interactive Document), evaluated across a 9-factor decision matrix. Concept A is recommended as default baseline with Concept B dark mode tokens.

