# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

The toolchain is Deno, not Node (ADR 0003), pinned in `.dvmrc`. `package.json` is still the dependency manifest and script list; `deno.lock` is the lockfile. Don't use `npm`/`npx` or add a `package-lock.json`. The one exception is the Vercel CLI in the deploy workflow, which runs on Node via `npx` because `vercel deploy` hangs under Deno (ADR 0003).

- `deno install`: installs `node_modules` from `package.json` (CI uses `--frozen`)
- `deno task dev`: dev server (port 4321)
- `deno task build`: static build to `dist/`
- `deno task check`: `astro-check` type-check. Together with `build`, this is the only verification gate. There are no tests or linter.
- `deno task generate:pdf`: runs `build`, then uses headless Chrome/Edge to print `dist/{,ru/,kk/}cv/index.html` into `public/cv/*.pdf`. If the browser isn't found, set `CHROME_PATH`.
- `deno task generate:images`: uses the same browser to render `public/og-image.png` (from `scripts/og-image.html` and `cv-en.json`), `public/apple-touch-icon.png` and `public/favicon.ico` (from `public/favicon.svg`). Rerun it and commit the output after changing the EN name, title, availability or primary skills, or the favicon.

## Architecture

Static Astro 7 site: two pages (**Overview Page** `/`, **CV Page** `/cv`) × three **Locales** (`en` unprefixed, `ru`, `kk`). Use the vocabulary in `GLOSSARY.md`.

- **Content flow**: `src/data/cv-{en,ru,kk}.json` → parsed by the Zod schema in `src/schemas/cv.ts` at import time in `src/utils/data.ts`. A schema mismatch fails the build. Edit content in all three JSON files together; `en` is the source and `ru`/`kk` follow it.
- **Pages are thin per-locale wrappers**: each file in `src/pages/`, `src/pages/ru/`, `src/pages/kk/` hardcodes its `locale` and passes the profile to `OverviewContent` or `CvContent`. Adding a page means adding three files.
- **UI strings** live in `UI_TRANSLATIONS` in `src/utils/i18n.ts`, not in the JSON data. `t()` falls back to `en`, then to the key itself, so a missing key fails silently.
- **URLs end in a slash** (`trailingSlash: 'always'`, matched by `trailingSlash: true` in `vercel.json`). Build internal links with `getLocalizedPath()` and absolute ones with `getLocalizedUrl()` in `src/utils/i18n.ts`; both wrap `astro:i18n`, so nav, switcher, canonical, hreflang and sitemap stay identical.
- **`BaseLayout.astro`** owns SEO meta, hreflang, JSON-LD, and the inline theme script (`.dark`/`.light` on `<html>`, stored in `localStorage`).
- **Styling**: Tailwind 4 through `@tailwindcss/vite`, still reading the legacy `tailwind.config.mjs` via `@config` in `src/styles/global.css`. Design tokens are CSS variables there. Hand-written rules sit inside Tailwind cascade layers so utilities still override them. Keep new rules layered.
- **`src/styles/print.css` is the PDF layout** (A4). Any change to it, to `CvContent`, or to the CV JSON needs `npm run generate:pdf` and the regenerated PDFs committed (ADR 0001). The script inlines only the first CSS bundle in `dist/_astro/`, so it breaks if the build ever emits more than one.
- **PDF filenames are defined twice**: `getPdfCvFilename()` in `src/utils/i18n.ts` and `targets` in `scripts/generate-pdf.mjs`. Change both together.

## Content rules

- Copy follows the owner decisions D1–D11 in `docs/research/portfolio-ux-seo-audit.md`. They cover the public name spelling, no time or speed-up figures in claims, certifications copied from LinkedIn only, and the audience (foreign employers, remote roles).
- `README.md` is the public GitHub profile README, not project documentation. Keep it aligned with the Overview content.

## Planning

- Work is tracked locally in `docs/wayfinder/MAP.md` and `docs/wayfinder/tickets/`, not in GitHub Issues, because `gh` is not authenticated on this machine. When you finish a ticket, update its status and the MAP's "Decisions so far".
- `PROJECT.md` is the plan from the early design-research phase. For current state, use the MAP.
- `scratch/`, `source/`, `.agents/` are gitignored local artifacts. Leave them out of the site.
- Hosting is Vercel at `https://ansaganie.vercel.app`, deployed only by GitHub Actions (ADR 0002). The workflow isn't set up yet: ticket 0007.
