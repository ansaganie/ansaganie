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

- [#0001](tickets/0001-custom-domain-research.md): Deploy initially to `ansaganie.github.io` ($0/yr, automated SSL). If acquiring a custom apex domain, prefer `ansagan.net` ($11.86/yr at-cost on Cloudflare) over `.kz` (Order No. 38/НҚ mandates Kazakhstan-hosted origin servers, which complicates serverless static hosting). Full report in [docs/research/custom-domain-options.md](../research/custom-domain-options.md).

## Tickets

- [x] `#0001` - [[Research] Custom domain pricing, registrar rules (.kz vs .xyz vs .net), and DNS configuration](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0001-custom-domain-research.md) (`wayfinder:research`, AFK) - **Frontier**
- [ ] `#0002` - [[Prototype] Live CV design prototype: 2-page layout with compact modern typography, ATS compatibility, and print-to-PDF styles](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0002-live-cv-design-prototype.md) (`wayfinder:prototype`, HITL) - **Frontier**
- [ ] `#0003` - [[Task] Structure multilingual CV content (en, ru, kk) from crawled LinkedIn and GitHub repositories](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0003-multilingual-content-curation.md) (`wayfinder:task`, HITL) - **Frontier**
- [ ] `#0004` - [[Task] Scaffold Astro project in repository root with Tailwind CSS, native i18n routing, and SEO tags](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0004-scaffold-astro-project.md) (`wayfinder:task`, AFK) - *Blocked by #0002, #0003*
- [ ] `#0005` - [[Task] Implement Overview page, CV Timeline page, and downloadable PDF CV functionality](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0005-implement-pages-and-pdf.md) (`wayfinder:task`, AFK) - *Blocked by #0004*
- [ ] `#0006` - [[Task] Update GitHub Profile README.md aligned with latest overview](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0006-update-github-profile-readme.md) (`wayfinder:task`, AFK) - *Blocked by #0005*
- [ ] `#0007` - [[Task] Set up GitHub Actions CI/CD deployment workflow to GitHub Pages with custom domain support](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0007-setup-deployment-workflow.md) (`wayfinder:task`, AFK) - *Blocked by #0005*

## Not yet specified

- **Custom Domain Purchase & Registrar Selection**: Final purchase decision and registrar verification (`.kz` vs `.xyz` vs `.net`) once the domain research findings are reviewed.
- **Automated Headless PDF Generation vs Browser Print Engine**: Whether to build a headless Chromium CI step for automated static PDF builds or rely on styled `@media print` with direct download action.

## Out of scope

- Dynamic backend / CMS server infrastructure (the site is purely static-first).
- Public blogging platform or commenting systems (scope is strictly the 2-page Live CV and Overview).
