# [Task] SEO launch basics: trailing-slash policy, sitemap, robots.txt, 404, favicon, og:image

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed (on branch `feat/0012-seo-launch-basics`; production check pending its merge)
- **Assignee**: Ansagan Islamgali (Claude session)
- **Blocked by**: none (#0008 closed: origin is `https://ansaganie.vercel.app`, see ADR 0002)

## Question

Add the SEO basics the [deployment readiness review](../../research/deployment-readiness-review.md) found missing (recommendations 8, 9; findings B2, B3, S1–S4):

- Set `trailingSlash: 'always'` and build nav, switcher, hreflang, and canonical URLs from one helper that respects `base` and `site`, so they match exactly. Match it in Vercel with `trailingSlash: true` in `vercel.json`, so slashless URLs redirect.
- `@astrojs/sitemap` with `i18n`, `public/robots.txt` with a `Sitemap:` line, and `<link rel="sitemap">`.
- `src/pages/404.astro`, a favicon set, a 1200×630 `og:image` with `twitter:card=summary_large_image`, and `og:locale:alternate`.

Seen on production on 2026-10-10 (see [deployment workflow](0007-setup-deployment-workflow.md)): `/favicon.ico`, `/robots.txt` and `/sitemap-index.xml` return 404, unknown paths get Vercel's default 404 page, and both `/cv` and `/cv/` return 200, because `vercel.json` has no `trailingSlash` yet.

The hosting topology decision fixed `site` (`https://ansaganie.vercel.app`, no `base`), which every absolute URL uses.

## Resolution (2026-10-10)

Done on branch `feat/0012-seo-launch-basics`. `deno task check` gives 0 errors and the same 7 Zod hints as before. `deno task build` emits 7 pages, still one CSS bundle, plus `sitemap-index.xml`.

- **Trailing slashes**: `trailingSlash: 'always'` in `astro.config.mjs` and `trailingSlash: true` in `vercel.json`, which 308-redirects slashless paths but not files with an extension, so the PDF links are unaffected. `getLocalizedPath()` (relative) and the new `getLocalizedUrl()` (absolute) in `src/utils/i18n.ts` wrap `astro:i18n`'s `getRelativeLocaleUrl`/`getAbsoluteLocaleUrl`, so they respect `base`, `site` and `trailingSlash`. Nav, switcher, canonical, hreflang, x-default, og:url and the sitemap now all use `/cv/`, `/ru/`, `/ru/cv/`. `stripLocaleFromPath()` is gone (it had no other callers).
- **Sitemap and robots**: `@astrojs/sitemap` 3.7.4 with `i18n` lists the 6 pages, each with en/ru/kk `xhtml:link` alternates. It leaves the 404 out. `public/robots.txt` allows everything and has the `Sitemap:` line, and `<link rel="sitemap">` is in `<head>`.
- **404**: `src/pages/404.astro` shows the message in EN, RU and KK (one `404.html` serves every locale), with `lang` on each part and links to each locale's Overview and CV. The strings are `notFound.*` in `UI_TRANSLATIONS`. `BaseLayout` takes `notFound`: `noindex`, with no canonical, hreflang, og:url or JSON-LD. On the 404 page the language switcher links to each locale's home.
- **Icons and share card**: `public/favicon.svg` is a white "A" on the brand blue (`#0369a1`), drawn as a path so it doesn't depend on fonts. The script also renders `favicon.ico` (16 + 32 PNG entries), `apple-touch-icon.png` (180, solid background) and `og-image.png` (1200×630: name, EN title, primary skills, host and availability from `cv-en.json`). One English card serves all locales, since the Latin name is canonical everywhere (D4). The command is `deno task generate:images` (`scripts/generate-images.mjs` + `scripts/og-image.html`). `findChrome()` moved to `scripts/chrome.mjs`, which this script shares with `generate-pdf.mjs`.
- **Meta**: `og:image` with type, size and alt, `og:locale:alternate` for the other two locales, `twitter:card=summary_large_image`, plus `twitter:image` and its alt.
- **Checked locally** with `astro preview` and Playwright: the 6 pages, icons, `robots.txt`, both sitemaps and a PDF return 200 with the right content types. An unknown path returns the custom page with a 404 status. On `/ru/cv/` the header marks CV as current and the switcher links to `/cv/`, `/ru/cv/` and `/kk/cv/`. No horizontal scroll at 320 px on `/`, `/kk/cv/` or the 404 page. No console errors. Print CSS, `CvContent` and the CV JSON are unchanged, so the PDFs don't need regenerating.
- **After merge, check on production**: `/cv` 308-redirects to `/cv/`, an unknown path serves the custom 404, and `/favicon.ico`, `/robots.txt` and `/sitemap-index.xml` return 200. Also run the og:image through a share-preview checker (LinkedIn Post Inspector).
- The favicon and share-card design is a first pass. To change it, edit `public/favicon.svg` or `scripts/og-image.html` and rerun the task.
