# Project: Personal Website & Live CV - Research Exploration & Visual Design Specification

## Architecture
- **Target Platform**: Astro (static-first, zero JS runtime overhead, built-in i18n routing, Tailwind CSS).
- **Core Strategy**: 2-page live CV and engineering portfolio (Page 1: Overview, Page 2: CV Timeline) with ATS scanner compliance, high-density print-to-PDF engine, multilingual layout engineering (EN, RU, KK), and verified Kazakh Cyrillic typography.
- **Repository Documentation Blueprint**: Adheres to `docs/research/custom-domain-options.md` format and Wayfinder ticket tracking (`docs/wayfinder/MAP.md` & `docs/wayfinder/tickets/0002-live-cv-design-prototype.md`).

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | R1 Design System Tokens | 26 Dark & Light mode tokens (Hex & HSL), surfaces, borders, text, accents with WCAG 2.1 AA/AAA mathematical proofs | M1 | Survey / Explorer 2 |
| 2 | R1 Typography & Kazakh Cyrillic Audit | 18 Kazakh Cyrillic glyphs (Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І) audit, Google Fonts `cyrillic-ext` finding, 3 curated font pairings | M1 | Survey / Explorer 2 |
| 3 | R2 Component Architecture & File Tree | Strictly 2 Pages (Page 1: Overview, Page 2: CV Timeline), Astro component hierarchy (`src/components/`, `src/layouts/`), TypeScript Zod schemas | M1 | Survey / Explorer 3 |
| 4 | R2 ASCII Layout Wireframes | 120-column Desktop and 40-column Mobile ASCII wireframes for both Page 1 (Overview) and Page 2 (CV Timeline) | M1 | Survey / Explorer 3 |
| 5 | R2 Quantified Enterprise Metrics | Exact data: 30m -> 1.5s load time, 90m -> 15m CI/CD, 1-3h -> mins ERP sync, WebSQL -> IndexedDB Dexie migration, Chevron Challenge Coin | M1 | Survey / Explorer 1 & 3 |
| 6 | R3 Multilingual i18n Routing & Switcher | Astro i18n routing (`/`, `/ru`, `/kk`, `/cv`, `/ru/cv`, `/kk/cv`), route-preserving segmented switcher `[ EN \| RU \| ҚАЗ ]` | M1 | Survey / Explorer 2 |
| 7 | R3 CSS Layout Elasticity Rules | 6-tier CSS ruleset (auto-fit/minmax grid, subgrid, flexbox min-inline-size defense, fluid clamp/cqi scaling, :lang(ru)/:lang(kk) tracking & line-height) | M1 | Survey / Explorer 2 |
| 8 | R4 ATS Scanner Compliance | Semantic HTML5 DOM (`<header>`, `<main>`, `<article>`, `<section>`, `<time>`, `<address>`), Schema.org microdata, zero tables/hidden layers | M1 | Survey / Explorer 3 |
| 9 | R4 Production-Ready @media print Engine | Full `@media print` CSS block, `@page` A4 margins, `break-inside: avoid`, force-expansion of `<details>`, element hiding, 1-to-2 page PDF export | M1 | Survey / Explorer 3 |
| 10 | R5 Three Creative Directions | Concept A (Editorial Engineer), Concept B (Linear-Inspired System), Concept C (Interactive Document) with palettes, typography, components & matrix | M1 | Survey / Explorer 3 |
| 11 | R6 Deliverable Generation | Compile full specification to `docs/research/live-cv-design-concepts.md` following repo standards | M1 | Survey / Explorer 1 |
| 12 | R6 Wayfinder & Ticket Integration | Link deliverable to Ticket `#0002` (`docs/wayfinder/tickets/0002-live-cv-design-prototype.md`) and update `docs/wayfinder/MAP.md` | M2 | Survey / Explorer 1 |
| 13 | Quality & Forensic Verification | Independent Reviewer (x2), Challenger (x2), and Forensic Integrity Audit verification | M3 | Project Pattern Gate |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Research Deliverable Authoring | Generate `docs/research/live-cv-design-concepts.md` with complete R1-R6 specifications, design tokens, wireframes, code blocks, and creative concepts | Survey complete | DONE |
| 2 | M2: Wayfinder & Ticket Integration | Update Ticket `#0002` and `docs/wayfinder/MAP.md` with findings, deliverables links, and status transition | M1 | DONE |
| 3 | M3: Verification, Challenge & Audit | Dual Reviewers, Dual Challengers, and Forensic Auditor verification and gate evaluation | M1, M2 | PLANNED |

## Interface Contracts
### Deliverable ↔ Repository Conventions
- File path: `docs/research/live-cv-design-concepts.md`
- Header: `# Research: Live CV & Personal Website Visual Design Specification, UI Component Architecture, and Layout Blueprint`
- Metadata blockquote format: Ticket `#0002`, Date `October 2026`, Status `Completed`, Target Identity `Angsagan Islyamgaliyev (ansaganie)`.
- Ticket `#0002`: Append `## Findings & Deliverables`, update status to `completed`, link to deliverable.
- `docs/wayfinder/MAP.md`: Update `#0002` to `[x]`, record decision in `## Decisions so far`.

## Code Layout
- `docs/research/live-cv-design-concepts.md` — Primary research and design deliverable
- `docs/wayfinder/tickets/0002-live-cv-design-prototype.md` — Ticket update
- `docs/wayfinder/MAP.md` — Master map update
- `PROJECT.md` — Global project plan and feature inventory at root
