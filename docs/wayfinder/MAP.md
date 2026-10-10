# Wayfinder Map: Personal Website & Live CV

## Destination

A production-deployed, multilingual (`/`, `/ru`, `/kk`) 2-page Live CV website (Overview & CV) for Ansagan Islamgaliev, hosted on Vercel at `ansaganie.vercel.app`, deployed by GitHub Actions, with nothing blocking a custom domain later. It has a modern, compact, classic ATS-compliant semantic design, SEO metadata, a downloadable PDF CV, and an updated GitHub profile [README.md](../../README.md).

## Notes

- **Domain**: Personal portfolio, live curriculum vitae, and developer identity.
- **Skills to consult**: `research`, `prototype`, `domain-modeling`, `modern-web-guidance`.
- **Execution is in scope**: the destination is a deployed site, so `task` tickets build things rather than only decide them.
- **Framework & Tech**: Astro (static-first, no JS runtime overhead, built-in i18n routing, Tailwind CSS), run with Deno instead of Node ([ADR 0003](../adr/0003-deno-toolchain.md)).
- **Target Locales**: English (`/`), Russian (`/ru`), Kazakh (`/kk`).
- **Profile Repo Integration**: Keep the repo root [README.md](../../README.md) as the GitHub profile README. Website code goes in `src/` and assets in `public/`.
- **Hosting Strategy**: Vercel at `https://ansaganie.vercel.app`. GitHub Actions in this repo deploy to production on merge to `main` and make protected previews on PRs. See [Hosting topology](tickets/0008-hosting-topology.md) and [ADR 0002](../adr/0002-vercel-hosting-via-github-actions.md).
- **Tracker**: the map is kept in local markdown because `gh` is not authenticated on this machine, even though `docs/agents/issue-tracker.md` names GitHub Issues.
- **Pre-flight review**: [Deployment readiness review](../research/deployment-readiness-review.md) (2026-10-04) produced 27 recommendations: 4 × P0, 10 × P1, 13 × P2. The P0 items and most of the P1 items are tickets below.

## Decisions so far

- [Custom domain research](tickets/0001-custom-domain-research.md): `ansaganie.github.io` costs $0/yr and is ready immediately. If a domain is bought, prefer `ansagan.net` ($11.86/yr at cost on Cloudflare) over `.kz`, because Order No. 38/НҚ requires origin servers located in Kazakhstan. [Report](../research/custom-domain-options.md).
- [Live CV design prototype](tickets/0002-live-cv-design-prototype.md): 2 pages (Overview, CV Timeline) in Concept A styling with Concept B dark tokens, WCAG-checked tokens, Kazakh Cyrillic font coverage, a route-preserving `[ EN | RU | ҚАЗ ]` switcher, and A4 print CSS. [Report](../research/live-cv-design-concepts.md).
- [Multilingual content curation](tickets/0003-multilingual-content-curation.md): the profile is captured in strict Zod schemas and three localized datasets (EN, RU, KK). [Report](../research/multilingual-cv-content.md).
- [Scaffold Astro project](tickets/0004-scaffold-astro-project.md): Astro 7 + Tailwind 3 scaffold with i18n, an SEO/JSON-LD layout, tokens and print CSS. Schemas live in `src/schemas/cv.ts`. 6 pages build.
- [Implement pages and PDF](tickets/0005-implement-pages-and-pdf.md): pages are fully localized, the CV page lives at `/cv`, PDF export is browser print-to-PDF, and the print budget is measured at 1 page (Overview) and 2 pages (CV) per locale.
- [Update GitHub profile README](tickets/0006-update-github-profile-readme.md): the README is rewritten with role, metrics, projects, stack and EN/RU/KK Live CV links. The links go live once the site deploys.
- [Pre-launch UI fixes](tickets/0011-prelaunch-ui-fixes.md): the header wraps without horizontal scroll at 320 px, the theme toggle works (`.dark`/`.light` plus `aria-pressed`), dark-mode print gives dark text on white, there is one banner landmark plus a skip link, motion respects reduced-motion, and JS-only controls are hidden without JS. Print budget is unchanged.
- [Prebuilt static PDF CV](../adr/0001-prebuilt-static-pdf-cv.md) (ADR 0001): the PDF CV is prebuilt per locale with Headless Chrome, committed to `public/cv/`, and downloaded through `<a download>` links instead of browser print. This replaces the print-to-PDF approach from #0005.
- [Portfolio audit](../research/portfolio-ux-seo-audit.md) (2026-10-10), plus the owner decisions D1–D11 recorded in it: the audience is foreign employers in any industry, for remote roles only. The name is "Ansagan Islamgaliev", with no time figures in claims, Credential Links from LinkedIn, the phone number kept and the location set to Astana. Case studies are deferred.
- [Confirm published personal data](tickets/0009-confirm-published-personal-data.md): all three items are answered by the audit decisions.
- [Make a clean `npm ci` pass](tickets/0010-fix-clean-install.md): migrated to Tailwind 4 via `@tailwindcss/vite` (the deprecated integration is gone). A clean `npm ci`, check and build pass with no flags, and `npm audit` reports 0 vulnerabilities. Print layout is identical and screen within 2 px of Tailwind 3, apart from three classes that now work as authored.
- [Apply audit copy changes](tickets/0013-apply-audit-copy-changes.md): Applied recommendations R-L2 through R-L17 and owner decisions D1–D14 across EN, RU, and KK profiles and UI strings. Canonical spelling "Ansagan Islamgaliev" set everywhere; time/speed claims removed; metrics renamed to Highlights; titles aligned to "Senior Full-Stack Developer"; real LinkedIn credential IDs and verification URLs linked; single canonical availability string and Astana location set; footer updated with profile date; print budget verified at 1 page Overview and 2 pages CV per locale. Review follow-up: head metadata (JSON-LD `Person`, author, `og:site_name`) and the header availability tooltip now read from `getCandidateProfile()` instead of hardcoded copies.
- [Build the PDF CV](tickets/0014-build-pdf-cv.md): Prebuilt static ATS-compliant 2-page A4 PDFs generated into `public/cv/` with canonical spelling (`Ansagan_Islamgaliev_CV*.pdf`) via Headless Chrome print emulation (`npm run generate:pdf`); header download action enabled on mobile below 640 px; direct `<a download>` links active across Header, Overview, and CV; legacy PDFs removed.
- [JSON-LD rebuild](tickets/0015-json-ld-rebuild.md): Completed R-M3 (§3.2 steps 3–4) in `BaseLayout.astro`. `ProfilePage` now links `mainEntity` to `#person` and includes `dateModified`. `Person` includes canonical name, 5 alternate names, localized title, Astana locality, phone, and `knowsAbout` skills. Removed legacy `itemscope` microdata from `<body>` so there is only one Person entity in structured data.
- [Overview visual pass](tickets/0016-overview-visual-pass.md): Overview reordered to Hero -> Projects -> Highlights -> Tech stack with `id="projects"` and Header nav link; pulsing dots and template badges/chips removed; competencies compressed to one line per group; typography upgraded to 14px body, 12px tags, and primary-weight section headings; verified no horizontal scroll at 320/375/1440px and print budget preserved (1 page Overview, 2 pages CV).
- [Hosting topology](tickets/0008-hosting-topology.md): Vercel only, at `ansaganie.vercel.app`, with no `base` and no GitHub Pages. GitHub Actions run all deploys: production on merge to `main` or manual dispatch, protected previews on PRs. Vercel's Git auto-deploy is off. [ADR 0002](../adr/0002-vercel-hosting-via-github-actions.md).
- [Deno toolchain](../adr/0003-deno-toolchain.md) (ADR 0003): Deno replaces Node for install, check, build, dev, `generate:pdf` and the Vercel CLI in CI. `package.json` stays the manifest, `deno.lock` is the lockfile, and `.dvmrc` pins the version.

## Tickets

- [x] [Custom domain research](tickets/0001-custom-domain-research.md) (`wayfinder:research`, AFK)
- [x] [Live CV design prototype](tickets/0002-live-cv-design-prototype.md) (`wayfinder:prototype`, HITL)
- [x] [Multilingual content curation](tickets/0003-multilingual-content-curation.md) (`wayfinder:task`, HITL)
- [x] [Scaffold Astro project](tickets/0004-scaffold-astro-project.md) (`wayfinder:task`, AFK)
- [x] [Implement pages and PDF](tickets/0005-implement-pages-and-pdf.md) (`wayfinder:task`, AFK)
- [x] [Update GitHub profile README](tickets/0006-update-github-profile-readme.md) (`wayfinder:task`, AFK)
- [ ] [Set up deployment workflow](tickets/0007-setup-deployment-workflow.md) (`wayfinder:task`, HITL account steps + AFK workflow). **Claimed**: workflow built and secrets set, waiting on a test PR and the first merge to `main`
- [x] [Hosting topology](tickets/0008-hosting-topology.md) (`wayfinder:grilling`, HITL)
- [x] [Confirm published personal data](tickets/0009-confirm-published-personal-data.md) (`wayfinder:grilling`, HITL)
- [x] [Make a clean `npm ci` pass](tickets/0010-fix-clean-install.md) (`wayfinder:task`, AFK)
- [x] [Pre-launch UI fixes](tickets/0011-prelaunch-ui-fixes.md) (`wayfinder:task`, AFK)
- [ ] [SEO launch basics](tickets/0012-seo-launch-basics.md) (`wayfinder:task`, AFK). **Frontier**
- [x] [Apply audit copy changes](tickets/0013-apply-audit-copy-changes.md) (`wayfinder:task`, AFK)
- [x] [Build the PDF CV](tickets/0014-build-pdf-cv.md) (`wayfinder:task`, AFK)
- [x] [JSON-LD rebuild](tickets/0015-json-ld-rebuild.md) (`wayfinder:task`, AFK)
- [x] [Overview visual pass](tickets/0016-overview-visual-pass.md) (`wayfinder:task`, AFK)
- [ ] [Search engine registration](tickets/0017-search-engine-registration.md) (`wayfinder:task`, HITL). Blocked by: Set up deployment workflow, SEO launch basics
- [ ] [New content grilling](tickets/0018-content-grilling.md) (`wayfinder:grilling`, HITL). Deferred (audit D5)

## Not yet specified

- **Post-launch polish (review P2 items)**: a localized print footer, Zod/TypeScript hint cleanup, trimming and self-hosting fonts, split code/content licensing, and the unexplained `@emnapi/runtime` dependency. These get tickets once the site is live and we know which still matter.

## Out of scope

- Dynamic backend / CMS server infrastructure (the site is static-first only).
- Public blogging platform or commenting systems (scope is limited to the 2-page Live CV and Overview).
- Buying and attaching a custom domain: launch is on `ansaganie.vercel.app`. A domain can go on the Vercel project in a later effort, using [Custom domain research](tickets/0001-custom-domain-research.md); see [Hosting topology](tickets/0008-hosting-topology.md).
