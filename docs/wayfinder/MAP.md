# Wayfinder Map: Personal Website & Live CV

## Destination

A production-deployed, multilingual (`/en`, `/ru`, `/kk`) 2-page live CV website (Overview & Timeline) for Ansagan Islamgali hosted on GitHub Pages with custom domain readiness, modern/compact/classic ATS-compliant semantic design, SEO metadata, downloadable PDF CV capability, and an updated GitHub profile [README.md](file:///C:/Users/ansag/Sources/repos/ansaganie/README.md).

## Notes

- **Domain**: Personal portfolio, live curriculum vitae, and developer identity.
- **Skills to consult**: `research`, `prototype`, `domain-modeling`, `modern-web-guidance`.
- **Framework & Tech**: Astro (static-first, zero JS runtime overhead, built-in i18n routing, Tailwind CSS).
- **Target Locales**: English (`/en`), Russian (`/ru`), Kazakh (`/kk`).
- **Profile Repo Integration**: Maintain repo root [README.md](file:///C:/Users/ansag/Sources/repos/ansaganie/README.md) for GitHub profile, placing website code in `src/` and assets in `public/`.
- **Hosting Strategy**: GitHub Pages via GitHub Actions workflow, supporting custom apex/subdomain CNAME.

## Decisions so far

- [#0001](tickets/0001-custom-domain-research.md): Deploy initially to `ansaganie.github.io` ($0/yr, automated SSL). If acquiring a custom apex domain, prefer `ansagan.net` ($11.86/yr at-cost on Cloudflare) over `.kz` (Order No. 38/ÐÒš mandates Kazakhstan-hosted origin servers, which complicates serverless static hosting). Full report in [docs/research/custom-domain-options.md](../research/custom-domain-options.md).
- [#0002](tickets/0002-live-cv-design-prototype.md): Adopt 2-page architecture (Page 1: Overview, Page 2: CV Timeline) with Concept A (Modern Editorial Engineer) aesthetic and Concept B dark mode tokens. Implement 26 WCAG AAA/AA tokens, native Kazakh Cyrillic typography via Inter/Source Sans 3/JetBrains Mono (mandating Google Fonts 'cyrillic-ext' subset), route-preserving i18n switcher [ EN | RU | ÒšÐÐ— ], 6-tier CSS elasticity defense against +20-30% Cyrillic expansion, semantic ATS DOM without layout tables, and production @media print CSS with @page A4 rules for 1-to-2 page PDF export. Full report in [docs/research/live-cv-design-concepts.md](../research/live-cv-design-concepts.md).
- [#0003](tickets/0003-multilingual-content-curation.md): Structure candidate profile into strict Zod schemas and generate 3 localized datasets (EN, RU, KK) across 4 verified enterprise metrics, 5 career roles, 5 featured projects, 4 certifications, and 3 corporate honors with authentic Kazakh Cyrillic typography (Ó˜, Ò’, Òš, Ò¢, Ó¨, Ò°, Ò®, Òº, Ð†) and +7.2% to +7.5% balanced text expansion. Full report in [docs/research/multilingual-cv-content.md](../research/multilingual-cv-content.md).
- [#0004](tickets/0004-scaffold-astro-project.md): Astro 7 + Tailwind 3 scaffold in repo root with i18n (`/`, `/ru`, `/kk`), SEO/JSON-LD base layout, tokens and print CSS. Zod schemas moved to `src/schemas/cv.ts` (Astro 7 drops legacy content config); TypeScript pinned to 5.x for `astro check`. Check and build pass (6 pages). Page skeletons already render from the datasets.
- [#0005](tickets/0005-implement-pages-and-pdf.md): Pages refined from the #0004 skeletons: all headings and labels localized for EN/RU/KK, CV stays at `/cv`, PDF is browser print-to-PDF (three buttons), print CSS tuned so Overview prints on 1 A4 sheet and the CV on 2 in every locale (measured). Open items: English-only "Page X of Y" footer, no visual QA yet, fake certificate URLs.
- [#0006](tickets/0006-update-github-profile-readme.md): Profile README rewritten with role, headline metrics, featured projects, stack badges and EN/RU/KK live CV links (live once #0007 deploys). Open: confirm name spelling.

## Tickets

- [x] `#0001` - [[Research] Custom domain pricing, registrar rules (.kz vs .xyz vs .net), and DNS configuration](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0001-custom-domain-research.md) (`wayfinder:research`, AFK)
- [x] `#0002` - [[Prototype] Live CV design prototype: 2-page layout with compact modern typography, ATS compatibility, and print-to-PDF styles](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0002-live-cv-design-prototype.md) (`wayfinder:prototype`, HITL)
- [x] `#0003` - [[Task] Structure multilingual CV content (en, ru, kk) from crawled LinkedIn and GitHub repositories](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0003-multilingual-content-curation.md) (`wayfinder:task`, HITL)
- [x] `#0004` - [[Task] Scaffold Astro project in repository root with Tailwind CSS, native i18n routing, and SEO tags](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0004-scaffold-astro-project.md) (`wayfinder:task`, AFK)
- [x] `#0005` - [[Task] Implement Overview page, CV Timeline page, and downloadable PDF CV functionality](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0005-implement-pages-and-pdf.md) (`wayfinder:task`, AFK)
- [x] `#0006` - [[Task] Update GitHub Profile README.md aligned with latest overview](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0006-update-github-profile-readme.md) (`wayfinder:task`, AFK)
- [ ] `#0007` - [[Task] Set up GitHub Actions CI/CD deployment workflow to GitHub Pages with custom domain support](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0007-setup-deployment-workflow.md) (`wayfinder:task`, AFK) - **Frontier**

## Not yet specified

- **Custom Domain Purchase & Registrar Selection**: Final purchase decision and registrar verification (`.kz` vs `.xyz` vs `.net`) once the domain research findings are reviewed.
- **Automated Headless PDF Generation vs Browser Print Engine**: Whether to build a headless Chromium CI step for automated static PDF builds or rely on styled `@media print` with direct download action.

## Out of scope

- Dynamic backend / CMS server infrastructure (the site is purely static-first).
- Public blogging platform or commenting systems (scope is strictly the 2-page Live CV and Overview).

