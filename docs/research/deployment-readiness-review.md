# Research: Deployment Readiness Review of the Astro Live CV (Build, Hosting, SEO, i18n, Accessibility, Privacy)

> **Ticket**: [#0007](../wayfinder/tickets/0007-setup-deployment-workflow.md) — *[Task] Set up GitHub Actions CI/CD deployment workflow to GitHub Pages with custom domain support* (pre-flight review)  
> **Date**: October 2026 (verification run 2026-10-04)  
> **Status**: Completed  
> **Target Identity**: Angsagan Islyamgaliyev / Ansagan Islamgali (`ansaganie`)  
> **Scope**: Commit `1c34953` on `main` (identical to `origin/main`). Nothing was deployed, pushed, or changed in `src/`.

---

## Executive Summary

**Verdict: Not ready.** The site itself is in good shape. It builds cleanly to 6 static pages, type-checks with 0 errors, renders without JavaScript, and holds the 1-page Overview / 2-page CV print budget in all three locales and both themes. Four problems block a first deploy, though, and two of them will break it outright.

**Top blockers (P0):**

1. **The hosting target does not match the repository.** The code lives in `ansaganie/ansaganie` (the profile-README repo). GitHub Pages serves a user site only from a repo named `ansaganie.github.io`. This repo would therefore publish as a *project site* at `https://ansaganie.github.io/ansaganie/`. Every root-relative link (`/cv`, `/ru`, `/_astro/*.css`), the `site` config, canonical/hreflang URLs and the README badges all assume the site sits at the domain root, so they would break.
2. **A clean dependency install fails.** `npm ci` and plain `npm install` both stop with `ERESOLVE`, because `@astrojs/tailwind@6.0.2` declares a peer range of `astro ^3 || ^4 || ^5` and the project uses Astro 7.3.5. The official `withastro/action` runs `npm install`, so the CI build would fail before it compiles anything.
3. **There is no deployment pipeline yet.** `.github/workflows/` does not exist, Pages is not enabled on the repo (`has_pages: false`), and `https://ansaganie.github.io/` returns 404.
4. **Some credential data is unverified.** The SAFe 6 Practitioner certification, its credential ID, and the HackerRank "Problem Solving (Advanced) & C#" certification do not appear in any of the source documents in `source/` (LinkedIn `Profile.pdf`, the CV `.txt`/`.pdf` files, or the portfolio HTML). All four "Verify" links point to generic issuer homepages. Publishing an unconfirmed credential ID on a CV is a credibility risk, so the owner must confirm or remove it first.

The review produced **27 recommendations: 4 × P0, 10 × P1, 13 × P2** (see [§4](#4-prioritized-recommendations)).

---

## 1. Verification Results

### 1.1 Environment

| Item | Value |
| :--- | :--- |
| OS / shell | Windows 11 (arm64), Git Bash |
| Node / npm | `v24.19.0` / `12.0.2` |
| Astro engines requirement | `node >=22.12.0`, from `node_modules/astro/package.json` `engines` |
| Lockfile | `lockfileVersion: 3`; it includes the Linux x64 binaries a CI runner needs (`@esbuild/linux-x64`, `@rolldown/binding-linux-x64-gnu`, `lightningcss-linux-x64-gnu`, `@astrojs/compiler-binding-linux-x64-gnu`) |

### 1.2 Commands and Outcomes

| # | Command | Outcome |
| :--- | :--- | :--- |
| 1 | `npm ci` | **FAIL** (exit 1): `ERESOLVE could not resolve … peer astro@"^3.0.0 \|\| ^4.0.0 \|\| ^5.0.0" from @astrojs/tailwind@6.0.2`; found `astro@7.3.5`. |
| 2 | `npm install --ignore-scripts` (fresh copy of `package.json` + lockfile) | **FAIL** (exit 1): same `ERESOLVE`. This is the command `withastro/action` runs. |
| 3 | `npm ci --legacy-peer-deps` | PASS: 344 packages; "6 high severity vulnerabilities". npm 12 also printed `install-scripts … esbuild@0.28.2 (postinstall) blocked because they are not covered by allowScripts`. The build still works without it. |
| 4 | `npm run build` (`astro build`) | PASS: `6 page(s) built in 2.95s`, no warnings. Output: `/index.html`, `/cv/index.html`, `/ru/index.html`, `/ru/cv/index.html`, `/kk/index.html`, `/kk/cv/index.html`, and one CSS bundle `_astro/data.DVZJqlQq.css` (22.8 KB; 5.7 KB gzip). Total `dist/` is 284 KB. |
| 5 | `npm run check` (`astro-check`) and `npx astro check` | PASS: `17 files — 0 errors, 0 warnings, 7 hints`. All 7 hints are Zod 4 deprecations (`ts(6385)`) of `z.string().url()` / `.email()` at `src/schemas/cv.ts:47,48,57,86,88,89,90`. |
| 6 | `npm audit` | 6 high-severity findings, all build-time. **braces** ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)) comes in through `tailwindcss@3.4.19` → `chokidar`/`micromatch`/`fast-glob`; npm's only fix is `tailwindcss@4` (breaking). **http-cache-semantics ≤4.2.0** ([GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp)) comes in through `astro`; `npm audit fix` resolves it. None of this code ships to browsers. |
| 7 | `npm outdated` | `tailwindcss 3.4.19 → latest 4.3.3`; `typescript 5.7.3 → wanted 5.9.3 / latest 7.0.2`. Already current: `astro 7.3.5`, `zod 4.6.5`, `@astrojs/check 0.9.10` (peer `typescript ^5 \|\| ^6`, so TypeScript 7 is not an option yet), `@astrojs/tailwind 6.0.2` (latest version still has the Astro ≤5 peer). |
| 8 | `astro preview` + `curl` | `/`, `/cv`, `/cv/`, `/ru`, `/kk/cv` → 200. `/robots.txt`, `/sitemap-index.xml`, `/favicon.ico` → **404**. Unknown path → Astro's default 404, because no custom `404` page exists. |
| 9 | Live checks | `https://ansaganie.github.io/` → **404**. GitHub API reports `ansaganie/ansaganie` as public with `has_pages: false`. `repos/ansaganie/ansaganie.github.io` → **404** (the repo does not exist). `git remote` is `git@github.com:ansaganie/ansaganie.git`. |
| 10 | Headless Chromium `page.pdf()` (A4, `preferCSSPageSize`) | Page counts, light **and** dark theme: `/` 1, `/cv` 2, `/ru/` 1, `/ru/cv` 2, `/kk/` 1, `/kk/cv` 2. This matches the #0005 budget. |
| 11 | `git check-ignore` | `dist/`, `node_modules/`, `.astro/`, `scratch/`, `source/` and `.agents/` are all ignored (`.gitignore:2,3,6,21,22,23`). The working tree was clean after the build. |

### 1.3 Generated Routes and Head Metadata (from `dist/`)

| Route | `<html lang>` | Canonical | hreflang self-link | `og:locale` |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `en` | `https://ansaganie.github.io/` | `https://ansaganie.github.io/` | `en_US` |
| `/cv` | `en` | `…/cv/` | `…/cv` ⚠ | `en_US` |
| `/ru/` | `ru` | `…/ru/` | `…/ru` ⚠ | `ru_RU` |
| `/ru/cv` | `ru` | `…/ru/cv/` | `…/ru/cv` ⚠ | `ru_RU` |
| `/kk/` | `kk` | `…/kk/` | `…/kk` ⚠ | `kk_KZ` |
| `/kk/cv` | `kk` | `…/kk/cv/` | `…/kk/cv` ⚠ | `kk_KZ` |

Every page has: `<title>`, `meta description`, `canonical`, hreflang for `en`/`ru`/`kk`/`x-default`, `og:type/url/title/description/site_name/locale`, `twitter:card=summary`, and JSON-LD (`Person`, `WebSite`, `ProfilePage`). Every page is missing: `og:image`, `twitter:image`, a favicon, `robots.txt`, a sitemap, a custom 404 page, and a `CNAME`. The repo has no `public/` directory at all.

### 1.4 Browser Checks (Playwright / Chromium against `astro preview`)

| Check | Result |
| :--- | :--- |
| Theme toggle with OS set to dark | **Bug.** Clicking the toggle removes `html.dark` and stores `theme=light`, but the body background stays `rgb(11,15,25)` and text stays `rgb(248,250,252)`, including after a reload. Light mode cannot be reached. |
| Print while dark theme is active | **Bug.** Body text prints as `rgb(162,178,200)` (`#a2b2c8`) on white paper: 2.16:1 contrast. Brand-coloured text is `#38bdf8` on white: 2.14:1. |
| Mobile width 375 px (360 px client) | **Horizontal overflow** on every page (`scrollWidth` 466–482 px). The `RU`/`ҚАЗ` language pills and the theme toggle sit off-screen. |
| Landmarks | `/cv` has **2 banner landmarks**. There is no skip link on any page. No `<img>` elements, so no alt-text exposure. Heading order is H1 → H2 → H3 with no skipped levels on both page types. No duplicate `id`s. |
| `prefers-reduced-motion: reduce` | `.animate-pulse` still animates (`animation-name: pulse`) and `scroll-behavior` stays `smooth`. |
| JavaScript disabled | All content renders; `<details>` are open by default; OS dark mode still applies through the media query. Four controls are visible but do nothing: the header PDF button, the theme toggle, the "Print / Save as PDF" CTA, and "Back to Top". |

### 1.5 Data Consistency (`src/data/cv-{en,ru,kk}.json` vs `src/schemas/cv.ts`)

A script flattened all three datasets and compared key paths, value types and structural values.

- **0 missing or extra keys** in RU and KK compared with EN. **0 type differences.** IDs, dates, enums, flags and URLs are identical; only `locale` differs.
- All three files parse with `candidateProfileSchema` (the build calls `.parse()` in `src/utils/data.ts:8-10`).
- Strings left identical to EN in RU/KK are proper nouns only, e.g. `"Karachaganak Petroleum Operating B.V. (KPO)"`, `"Scaled Agile, Inc."`, `"HTML Academy"`, `"TA Pro Mobile & Web PWA"`. RU also keeps `"Chevron Surface Digital Platform (SDP) Challenge Coin"` in English. No untranslated prose was found.
- The UI dictionary in `src/utils/i18n.ts:18-166` has the same 48 keys in each locale.

---

## 2. Findings by Area

### 2.1 Build & Configuration

- **B1. `site` assumes a root-hosted user site.** `astro.config.mjs:6` sets `site: 'https://ansaganie.github.io'` with no `base`. Ticket #0004 recorded "since this is a user site, no `base` is needed" (`docs/wayfinder/tickets/0004-scaffold-astro-project.md:34`), but the repo is not a user-site repo (see H1). Astro's GitHub guide says a project repo needs `base: '/my-repo'`, and "all of your internal page links must be prefixed with your `base` value" ([Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/); [Configuration reference — `base`](https://docs.astro.build/en/reference/configuration-reference/)).
- **B2. Hand-rolled URL helpers ignore `base` and `trailingSlash`.** `getLocalizedPath()` (`src/utils/i18n.ts:199-208`) always returns root-relative paths without a trailing slash (`/ru`, `/ru/cv`). Astro's `astro:i18n` helpers (`getRelativeLocaleUrl`, `getAbsoluteLocaleUrl`) are documented as depending on `base`, `trailingSlash`, `build.format` and `site` ([astro:i18n API reference](https://docs.astro.build/en/reference/modules/astro-i18n/)).
- **B3. The trailing-slash policy is undefined.** `trailingSlash` is left at its default, `'ignore'`. For prerendered pages, Astro's reference says behaviour follows the hosting platform ([Configuration reference — `trailingSlash`, `build.format`](https://docs.astro.build/en/reference/configuration-reference/)). With the default `build.format: 'directory'`, Astro emits `cv/index.html`, and `Astro.url.pathname` becomes `/cv/`. That is why canonical URLs carry a slash while nav and hreflang links do not (§1.3). GitHub Pages answers the slashless form with a redirect; observed on GitHub's own Pages site: `curl -I https://pages.github.com/versions` → `301 Location: https://pages.github.com/versions/`. `astro preview` returns 200 for both forms, so the issue does not show up locally.
- **B4. The Tailwind integration is deprecated.** `@astrojs/tailwind` (`package.json:15`, `astro.config.mjs:8-10`) is marked deprecated. Astro's docs say "Tailwind CSS now offers a Vite plugin which is the preferred way to use Tailwind 4 in Astro" ([@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/); [Styling guide — Tailwind](https://docs.astro.build/en/guides/styling/#tailwind)). Its latest release (6.0.2) still declares peer `astro ^3 || ^4 || ^5` (`npm view @astrojs/tailwind peerDependencies`). That peer range is the cause of P0 #2.
- **B5. Type-check hygiene.** 7 Zod 4 deprecation hints (§1.2 #5). TypeScript is pinned to `^5.7.3` (`package.json:19`); `@astrojs/check@0.9.10` accepts `^5 || ^6` only.
- **B6. Unexplained dev dependency.** `@emnapi/runtime` (`package.json:23`) is not imported anywhere in `src/`. It looks like a local workaround for the arm64/WASM toolchain; it should be documented or removed.

### 2.2 Deployment Pipeline & Hosting

- **H1. The repo name decides the URL (P0).** GitHub Docs: user sites "must be stored in a repository named `<owner>.github.io`"; project sites are published at `http(s)://<owner>.github.io/<repositoryname>` ([What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)). This repo is `ansaganie/ansaganie` (`git remote -v`), and `ansaganie.github.io` does not exist (API 404). The MAP destination ("hosted on GitHub Pages", `docs/wayfinder/MAP.md:5,14`) and the README links (`README.md:7-11`) assume `https://ansaganie.github.io/cv`, which will not work without one of the options below.
  - **Option A (simplest, keeps one repo):** attach a custom domain to this repo. A project site that has its own custom domain is served at that domain's root ([About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)), so no `base` is needed. This fits the #0001 recommendation of `ansagan.net`.
  - **Option B (free, root URL):** create `ansaganie/ansaganie.github.io` and deploy the site from there, either by moving the site code or by pushing the build artifact from this repo. The profile README stays in `ansaganie/ansaganie`.
  - **Option C (free, sub-path):** keep this repo, set `base: '/ansaganie'`, and send every link and asset through `import.meta.env.BASE_URL` or the `astro:i18n` helpers. The public URL then becomes `https://ansaganie.github.io/ansaganie/cv/`.
- **H2. CI cannot install dependencies (P0).** `withastro/action` detects `package-lock.json` and runs `$PACKAGE_MANAGER install` ([withastro/action `action.yml`](https://github.com/withastro/action/blob/main/action.yml)). §1.2 #2 shows that command fails. npm's `legacy-peer-deps` "completely ignore[s] peerDependencies when building a package tree" and can be set in a per-project `.npmrc` ([npm config docs](https://docs.npmjs.com/cli/v11/using-npm/config)). A committed `.npmrc` is the quickest stopgap; removing the deprecated integration (B4) is the real fix.
- **H3. No workflow, and Pages is not enabled (P0).** Astro's recommended workflow is `actions/checkout@v7` → `withastro/action@v6` (Node 24 default) → `actions/deploy-pages@v5`, with `permissions: contents: read, pages: write, id-token: write` and an environment named `github-pages` ([Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)). The repo's Pages source must be set to **GitHub Actions** under Settings → Pages → Build and deployment ([Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)). Node must be ≥ 22.12.0 (Astro `engines`); the action's default of 24 satisfies this.
- **H4. Limits are not a concern.** Pages allows sites up to 1 GB, a soft limit of 100 GB/month bandwidth, and a 10-minute deploy timeout ([GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)). `dist/` is 284 KB.
- **H5. No PR gate.** There is no CI step that runs `astro check` and `astro build` on pull requests before deploy. Wayfinder tickets are also tracked as local Markdown rather than GitHub issues (`docs/wayfinder/tickets/0006-update-github-profile-readme.md:27`), even though `docs/agents/issue-tracker.md` names GitHub Issues.

### 2.3 Custom Domain

- **D1. The CNAME guidance in #0001 is inaccurate for Actions deploys.** `docs/research/custom-domain-options.md:120-125` says GitHub Pages "reads this file upon deployment and binds the custom domain automatically". GitHub Docs say: "If you are publishing from a custom GitHub Actions workflow, no `CNAME` file is created, and any existing `CNAME` file is ignored and is not required." The domain must be set under **Settings → Pages → Custom domain** ([Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)). Astro's guide still suggests `public/CNAME` ([Astro: Deploy to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)). The file does no harm, but the settings step is what actually binds the domain.
- **D2. Verify the domain before adding it.** GitHub recommends "verifying your custom domain prior to adding it to your repository … to avoid takeover attacks" ([Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)). #0001 already lists this step (`custom-domain-options.md:127-131`).
- **D3. A domain switch touches several hard-coded places.** If a domain is bought, update `site` (`astro.config.mjs:6`), the hard-coded fallback `'https://ansaganie.github.io'` (`src/layouts/BaseLayout.astro:20`), and the README badges (`README.md:7-11`).

### 2.4 SEO & Metadata

- **S1. hreflang targets differ from canonical URLs.** For example, the `/cv/` page has canonical `…/cv/` but hreflang `…/cv` (§1.3; `src/layouts/BaseLayout.astro:21,24-28`). Google requires each language version to "list itself as well as all other language versions" with fully qualified URLs ([Google Search Central: Localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions)). On GitHub Pages each slashless alternate is a 301 hop, so the self-reference does not match the canonical URL. Fix this together with B3.
- **S2. No sitemap or robots.txt.** `@astrojs/sitemap` needs `site` and, with its `i18n` option, emits `<xhtml:link rel="alternate" hreflang>` per URL in `sitemap-index.xml` / `sitemap-0.xml`. Its docs recommend a `<link rel="sitemap">` in `<head>` and a `Sitemap:` line in `robots.txt` ([@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)). Google also accepts hreflang inside sitemaps (same Google page as S1).
- **S3. No `og:image`.** The Open Graph protocol lists `og:title`, `og:type`, `og:image` and `og:url` as required on every page ([ogp.me](https://ogp.me/)); `og:image` is absent (`BaseLayout.astro:105-115`). Shared CV links on LinkedIn or Telegram will show no preview image. `og:locale:alternate` is also missing.
- **S4. No custom 404 page.** GitHub Pages uses a `404.html` in the publishing source ([Creating a custom 404 page](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)). Adding `src/pages/404.astro` produces it. There is also no favicon (§1.2 #8).
- **S5. The CV meta description is long.** The `/cv` pages use the full `profile.summary` as `description` (`src/pages/cv.astro:13`): 547 chars in EN, 523 in RU, 558 in KK. The Overview pages use the 110–124-char `elevatorPitch`. A short, page-specific description for the CV pages would work better.
- **S6. JSON-LD duplicates the dataset.** `BaseLayout.astro:36-51` hard-codes the name, email, phone and `addressLocality: 'Atyrau'`. The dataset's location is "Astana & Atyrau" (`src/data/cv-en.json:13`), and LinkedIn `Profile.pdf` says Astana. Reading these values from `getCandidateProfile()` would prevent drift.

### 2.5 Internationalisation

- **I1. Locale parity is complete** (§1.5). `<html lang>` and `og:locale` are correct per route (§1.3).
- **I2. The print footer is English-only.** `src/styles/print.css:18` uses `content: "Page " counter(page) " of " counter(pages)` for every locale. This was an open item in #0005.
- **I3. Locale labels lack a `lang` attribute.** Switcher labels such as `ҚАЗ` and `Русский` (title) are rendered inside an `lang="en"` page with no `lang` on the element (`src/components/layout/LanguageSwitcher.astro:15-27`). WCAG 3.1.2 (Language of Parts) asks for each part's language to be programmatically determinable ([Understanding 3.1.2](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html)).
- **I4. Name spelling is undecided.** The site and README use "Angsagan Islyamgaliyev" (EN) and "Аңсаған Ислямғалиев" (RU/KK); the MAP, git author and LICENSE use "Ansagan Islamgali". The RU locale uses Kazakh letters (ң, ғ) in the name. #0005 and #0006 flagged this, and it is still open.

### 2.6 Accessibility

| ID | Finding | Evidence | Standard |
| :--- | :--- | :--- | :--- |
| A1 | Content scrolls horizontally at phone width; the language pills and theme toggle are clipped | §1.4; header row `src/components/layout/Header.astro:18-77` does not wrap | [WCAG 1.4.10 Reflow (AA)](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): no two-dimensional scrolling at 320 CSS px |
| A2 | Theme toggle cannot reach light mode when the OS prefers dark | `src/styles/global.css:91-92` keys dark tokens on `:root:not(.light)`, but the scripts only toggle `.dark` (`BaseLayout.astro:129-139`, `ThemeToggle.astro:53-54`) and never add `.light` | Functional bug; the toggle has `aria-label` but no `aria-pressed` state |
| A3 | Two banner landmarks on `/cv` | `src/components/cv/CvContent.astro:16` sets `role="banner"` on an in-`<main>` header | [WAI-ARIA APG Banner landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html): "Each page may have one `banner` landmark." `<main role="main">` (`BaseLayout.astro:147`) is redundant but harmless. |
| A4 | No skip link past the sticky header | §1.4 | [WCAG 2.4.1 Bypass Blocks (A)](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) |
| A5 | Infinite pulse animation and smooth scrolling ignore reduced-motion settings | `Header.astro:24`, `OverviewContent.astro:23` (`animate-pulse`); `global.css:135` and `class="scroll-smooth"` (`BaseLayout.astro:88`) | [MDN `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion); [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) |
| A6 | Colour tokens pass on screen | Computed: light tertiary `#607086` on canvas 4.83:1 and on surface-2 4.61:1; brand `#0369a1` on white 5.93:1; CTA 5.67:1; dark tertiary on surface-1 5.76:1; dark brand 8.44:1; controls 3.84:1 (light) / 3.43:1 (dark). The only on-screen pair below 4.5:1 is tertiary on surface-3 (4.10 light / 4.27 dark), which is not used for text in the current markup. `text-muted` (2.56:1) is defined but unused. | [WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| A7 | Focus indicators exist | Global `:focus-visible` 2px outline (`global.css:217-220`); focus ring 3.91:1 on canvas | [WCAG 2.4.7](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) |
| A8 | JS-only controls are shown when JS is off | §1.4; the CV button uses an inline `onclick` (`CvContent.astro:30`) | Progressive enhancement: render them `hidden` and reveal from script, or make "Back to Top" an `<a href="#…">` |

### 2.7 Print / PDF

- **P1. The page budget holds.** Measured 1/2/1/2/1/2 pages in both themes (§1.2 #10).
- **P2. Dark theme ruins the printout.** `print.css:41-52` forces `html, body` to white with `#0f172a` text, but the CSS custom properties stay on their dark values, so every `text-content-*` and `text-brand` utility prints pale (2.14–3.14:1 on white). Overriding the light token values inside `@media print` (or under `html.dark` inside `@media print`) fixes this.
- **P3. Mobile users get no header PDF button.** The header button is hidden below the `sm` breakpoint (`Header.astro:61`). The CV and Overview pages keep their own print buttons, so this is acceptable.
- **P4. Two open items carried over from #0005:** the English-only `@page` footer (I2), and the "Verify" links that point to issuer homepages (C2).

### 2.8 Privacy & Data

The repo is **public** and `1c34953` is already on `origin/main`, so everything below is already published in git history.

- **C1. The personal mobile number is public.** A Kazakhstan mobile number (`+7 700 …`) appears in `src/data/cv-{en,ru,kk}.json:9`, is rendered as a `tel:` link on every CV page (`CvContent.astro:45`), and is repeated in machine-readable JSON-LD `telephone` (`BaseLayout.astro:41`). This makes it easy for scrapers to harvest. It matches a number in the owner's source CVs, so it is real, not a placeholder. Removing it later will not erase it from git history.
- **C2. Some credential data is unverified (P0).** `cv-*.json:247` has credential ID `SAFE-883921`. The SAFe 6 and HackerRank certifications have no match in `source/*.txt`, `source/*.pdf` (checked with `pdftotext`) or `source/angsagan_portfolio_ai_html.html`. LinkedIn `Profile.pdf` lists only the HTML Academy courses, "JavaScript (Intermediate)" and "Frontend Developer (React)". All `verificationUrl` values are generic issuer homepages (`cv-*.json:248,256,264,272`).
- **C3. Source material is correctly excluded.** The `source/` CVs and `scratch/` PDFs are gitignored (§1.2 #11). No secrets, tokens or `.env` files are tracked.
- **C4. Google Fonts leaks visitor IPs.** Every visit sends the visitor's IP to Google Fonts (`BaseLayout.astro:118-123`). Self-hosting the fonts would remove this third-party request.
- **C5. The license may cover more than intended.** `LICENSE` is MIT ("Copyright (c) 2025 Ansagan Islamgali"), which on its face also covers the personal CV content in `src/data/`. Code and content could be licensed separately.

### 2.9 Dependencies

- The audit findings are build-time only (§1.2 #6). `npm audit fix` clears `http-cache-semantics`. The `braces` chain only goes away by leaving Tailwind 3, which is the same migration as B4.
- Upgrading to Tailwind 4 means replacing `tailwind.config.mjs` theme tokens with CSS-first configuration and switching the integration to `@tailwindcss/vite` ([Astro Styling — Tailwind](https://docs.astro.build/en/guides/styling/#tailwind)). This is moderate work because the tokens are already CSS variables (`global.css:9-89`).
- Google Fonts: the CSS2 API already serves `cyrillic-ext` faces through `unicode-range` without the `subset=` parameter (verified: the response contains 15 `/* cyrillic-ext */` blocks with no `subset` param), so `&subset=…` in `BaseLayout.astro:121` has no effect. `Source Serif 4` is requested but no `font-serif` class is used anywhere in `src/`.

### 2.10 Repo Hygiene & Docs

- `docs/wayfinder/MAP.md` starts with a UTF-8 BOM, contains 9 `file:///C:/Users/ansag/...` links that are dead on GitHub, and has mojibake on lines 18–20 (`ÒšÐÐ—`, `38/ÐÒš`, `Ó˜, Ò’ …` in place of `ҚАЗ`, `38/НҚ` and the Kazakh glyphs). `custom-domain-options.md:3` also uses a `file:///` link.
- `docs/wayfinder/tickets/0006-update-github-profile-readme.md:20-21` breaks "next-geo-exp" into "…prices-monitor, " / "ext-geo-exp" (an escaped `\n` artefact).
- `docs/wayfinder/tickets/0003-multilingual-content-curation.md:18,23` and `docs/research/multilingual-cv-content.md:9,13,31` link to the removed `src/content/config.ts` (now `src/schemas/cv.ts`) and to `scratch/` tests that are gitignored, so those tests are not reproducible from the repo.
- `custom-domain-options.md:120-125` should be corrected per D1.
- `README.md` doubles as the GitHub profile README (GLOSSARY "Profile README"), so it should not become build documentation. Build and deploy instructions could live in `docs/`.

---

## 3. Notes on What Is Already Good

- Static output only, no client framework. About 10 KB gzip HTML per page plus one 5.7 KB gzip CSS file.
- Zod schema validation runs at build time, so bad data fails the build.
- All six routes are correct, with `<html lang>` and `og:locale` set per locale, and the language switcher keeps the current route.
- Print engine: page counts verified in 3 locales × 2 themes; `<details>` force-expand hooks exist and the elements are open by default.
- Semantic structure: one `h1` per page, ordered headings, `<address>`, `<time>`, `aria-labelledby` on sections, visible focus rings, and decorative glyphs marked `aria-hidden`.

---

## 4. Prioritized Recommendations

| # | Priority | Recommendation | Effort | Related ticket |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **P0** | Decide the hosting topology before writing the workflow: **A** custom domain on `ansaganie/ansaganie` (served at root; no `base`), **B** new `ansaganie.github.io` repo, or **C** `base: '/ansaganie'` with every link and asset routed through `import.meta.env.BASE_URL` / `astro:i18n`. Then align `site`, `BaseLayout.astro:20`, and `README.md:7-11`. | M | #0007, #0001 |
| 2 | **P0** | Make a clean install pass. Commit `.npmrc` with `legacy-peer-deps=true` as a stopgap, and confirm `npm ci` succeeds in a fresh clone. | S | #0007 |
| 3 | **P0** | Add `.github/workflows/deploy.yml` following Astro's GitHub guide (`checkout@v7`, `withastro/action@v6`, `deploy-pages@v5`, `pages: write`, `id-token: write`, `environment: github-pages`, Node ≥ 22.12), and set Pages source to "GitHub Actions". | S | #0007 |
| 4 | **P0** | Confirm or remove the unverified SAFe 6 certification, its credential ID, and the HackerRank certification. Replace homepage "Verify" URLs with real credential links, or drop the "Verify" link when none exists. | S | #0003, #0005 |
| 5 | P1 | Fix mobile reflow: let the header wrap or collapse below `sm` (for example, put the language switcher and theme toggle on a second row) and re-test at 320 px. | M | #0005 |
| 6 | P1 | Fix the theme toggle: add or remove a `.light` class alongside `.dark` (or key the media-query block on `:root:not(.dark):not(.light)` and set `.light` explicitly), and expose state with `aria-pressed`. | S | #0005 |
| 7 | P1 | Reset the colour tokens to light values inside `@media print` so printing from dark mode gives dark text on white. | S | #0005 |
| 8 | P1 | Settle on trailing slashes: set `trailingSlash: 'always'` (matching `build.format: 'directory'`) and generate nav, switcher, hreflang and canonical URLs from one helper so they are identical. | S | #0007 |
| 9 | P1 | Add the missing basics: `@astrojs/sitemap` with `i18n`, `public/robots.txt` with a `Sitemap:` line, a `<link rel="sitemap">`, a favicon set, `src/pages/404.astro`, a 1200×630 `og:image` (+ `twitter:card=summary_large_image`), and `og:locale:alternate`. | M | #0007 |
| 10 | P1 | Owner decision on the phone number: keep it, show it only in print/PDF, or remove it from the site and JSON-LD. If removed, accept that it remains in git history (or rewrite history). | S | #0003 |
| 11 | P1 | Settle the name spelling (Latin and Cyrillic, per locale) and apply it to the datasets, `i18n.ts`, JSON-LD, README, LICENSE and the MAP. | S | #0006 |
| 12 | P1 | Remove `role="banner"` from `CvContent.astro:16` and add a "Skip to content" link targeting `<main id="main">`. | S | #0005 |
| 13 | P1 | Honour `prefers-reduced-motion`: use `motion-safe:animate-pulse` and `motion-safe:scroll-smooth`, and switch `scrollTo` to `behavior: 'auto'` when the user prefers reduced motion. | S | #0005 |
| 14 | P1 | Run `npm audit fix` for `http-cache-semantics`. Track the Tailwind-3 `braces` chain under recommendation 15. | S | — |
| 15 | P2 | Migrate Tailwind 3 → 4 via `@tailwindcss/vite` and drop the deprecated `@astrojs/tailwind`. This removes the peer conflict (and the `.npmrc` stopgap) and the `braces` audit chain. | M | #0004 |
| 16 | P2 | Hide JS-only buttons until scripts run, and make "Back to Top" a plain anchor link. | S | — |
| 17 | P2 | Localise or remove the `@page` "Page X of Y" footer (`print.css:18`). | S | #0005 |
| 18 | P2 | Replace `z.string().url()` / `.email()` with `z.url()` / `z.email()` to clear the 7 check hints. | S | #0004 |
| 19 | P2 | Bump TypeScript to 5.9.x. Stay off TS 7 until `@astrojs/check` supports it. | S | #0004 |
| 20 | P2 | Trim fonts: remove the unused `Source Serif 4` and the no-op `subset=` parameter, and consider self-hosting Inter and JetBrains Mono to drop the third-party request. | S | — |
| 21 | P2 | Build JSON-LD `Person` from `getCandidateProfile(locale)` rather than hard-coded strings, and fix `addressLocality`. | S | — |
| 22 | P2 | Give `/cv` pages a concise, page-specific meta description instead of the 520–560-char summary. | S | — |
| 23 | P2 | Add `lang` to each language-switcher label (`lang="kk"`, `lang="ru"`). | S | — |
| 24 | P2 | Docs hygiene: strip the BOM and mojibake in `MAP.md`, replace `file:///` links with relative ones, fix the 0006 "ext-geo-exp" break, update links to `src/schemas/cv.ts`, and correct the CNAME statement in `custom-domain-options.md`. | S | #0001, #0003, #0006 |
| 25 | P2 | Clarify licensing: MIT for code, and a separate notice (for example "all rights reserved") for personal CV content in `src/data/`. | S | — |
| 26 | P2 | Document or remove the `@emnapi/runtime` devDependency. | S | #0004 |
| 27 | P2 | Add a PR workflow that runs `npm ci`, `astro check` and `astro build`, and optionally a link checker and Lighthouse CI against `dist/`. | M | #0007 |

**Totals:** P0 = 4, P1 = 10, P2 = 13.

---

## Primary Sources & References

1. **Astro (official docs)**
   - [Deploy your Astro site to GitHub Pages](https://docs.astro.build/en/guides/deploy/github/): `site`/`base` per repo type, workflow YAML, `public/CNAME`
   - [Configuration reference](https://docs.astro.build/en/reference/configuration-reference/): `site`, `base`, `trailingSlash`, `build.format`, `i18n`
   - [astro:i18n API reference](https://docs.astro.build/en/reference/modules/astro-i18n/): helpers depend on `base`, `trailingSlash`, `build.format`, `site`
   - [Internationalization routing guide](https://docs.astro.build/en/guides/internationalization/)
   - [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/): `i18n` option, output files, discovery
   - [@astrojs/tailwind (deprecated)](https://docs.astro.build/en/guides/integrations-guide/tailwind/) and [Styling guide — Tailwind](https://docs.astro.build/en/guides/styling/#tailwind)
   - [withastro/action `action.yml`](https://github.com/withastro/action/blob/main/action.yml): inputs, lockfile detection, `install` command
2. **GitHub Docs**
   - [What is GitHub Pages?](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): user vs project sites
   - [Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
   - [Managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): CNAME ignored for Actions; verify first
   - [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
   - [Creating a custom 404 page](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site)
   - [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
   - Advisories: [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) (braces), [GHSA-ch52-4w7c-c8xp](https://github.com/advisories/GHSA-ch52-4w7c-c8xp) (http-cache-semantics)
3. **npm**
   - [npm config: `legacy-peer-deps`, project `.npmrc`](https://docs.npmjs.com/cli/v11/using-npm/config)
4. **Search & metadata**
   - [Google Search Central: Tell Google about localized versions of your page](https://developers.google.com/search/docs/specialty/international/localized-versions)
   - [The Open Graph protocol](https://ogp.me/)
5. **Accessibility (W3C / MDN)**
   - WCAG 2.2 Understanding: [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html), [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html), [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html), [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)
   - [WAI-ARIA APG: Banner landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/banner.html)
   - [MDN: `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
6. **Empirical checks (this review)**
   - `curl -I https://pages.github.com/versions` → `301` to `/versions/` (GitHub Pages trailing-slash redirect)
   - GitHub REST API: `GET /repos/ansaganie/ansaganie` (`has_pages: false`), `GET /repos/ansaganie/ansaganie.github.io` (404)
   - `npm view` for `@astrojs/tailwind`, `@astrojs/check`, `astro`, `tailwindcss`, `typescript`, `zod` (latest versions and peer ranges)
