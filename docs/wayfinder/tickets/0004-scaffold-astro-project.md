# [Task] Scaffold Astro project in repository root with Tailwind CSS, native i18n routing, and SEO tags

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0002, #0003

## Question

How should the Astro project be scaffolded in the repository root alongside the existing profile README, configuring Tailwind CSS, typography plugins, i18n routing for `/` (default English), `/ru`, and `/kk`, and base HTML layouts with OpenGraph and structured JSON-LD SEO tags?

## Findings & Deliverables

Scaffold is in the repo root next to the profile `README.md`. `npm run check` reports 0 errors and `npm run build` produces 6 static pages: `/`, `/cv`, `/ru`, `/ru/cv`, `/kk`, `/kk/cv`.

- **Config**: [astro.config.mjs](../../../astro.config.mjs) (site `https://ansaganie.github.io`, i18n `en` default with no prefix, `ru`, `kk`), [tailwind.config.mjs](../../../tailwind.config.mjs) (26 design tokens as CSS variables, `@tailwindcss/typography`), [tsconfig.json](../../../tsconfig.json) (limited to `src/`, excludes `scratch/`).
- **Styles**: [global.css](../../../src/styles/global.css) (light/dark tokens, `:lang(ru|kk)` tuning, elasticity rules) and [print.css](../../../src/styles/print.css) (A4 `@page` and `@media print` engine from #0002).
- **Layout/SEO**: [BaseLayout.astro](../../../src/layouts/BaseLayout.astro) with canonical, hreflang and `x-default` links, OpenGraph and Twitter tags, JSON-LD (`Person`, `WebSite`, `ProfilePage`), Google Fonts with Cyrillic subsets, theme-flash guard and print `<details>` hook.
- **i18n**: [i18n.ts](../../../src/utils/i18n.ts) (route-preserving `getLocalizedPath`, UI strings for en/ru/kk), [data.ts](../../../src/utils/data.ts) (Zod-validated profile loader).
- **Components**: `Header`, `Footer`, `LanguageSwitcher`, `ThemeToggle` under `src/components/layout/`.

### Decisions and deviations

1. **Zod schemas moved** from `src/content/config.ts` to [src/schemas/cv.ts](../../../src/schemas/cv.ts). Astro 7 rejects the legacy content config, and the JSON datasets are loaded directly, so no content collection is needed.
2. **Versions**: Astro 7.3.5. `astro check` needs TypeScript 5.x (it does not support 7), so TypeScript is pinned to `^5.7.3`, installed with `--legacy-peer-deps`. `@astrojs/tailwind` declares an Astro 3-5 peer range, so it is also installed with `--legacy-peer-deps`. The `check` script calls `astro-check` directly to avoid its interactive install prompt.
3. **Page skeletons exist ahead of #0005**: `src/pages/**` plus `OverviewContent.astro` and `CvContent.astro` render all six routes from the datasets. They are a first pass and are not reviewed against the #0002 wireframes. #0005 should refine them, not start over.

### Open issues for later tickets

- `/cv` routes are used instead of the `/timeline` paths named in #0005. #0002 specifies `/cv`; #0005's wording should be reconciled.
- `z.string().url()` / `.email()` raise Zod 4 deprecation hints. Harmless, but could move to `z.url()` / `z.email()`.
- `site` is `ansaganie.github.io`, and since this is a user site, no `base` is needed. Revisit if a custom domain is bought.
- Visual QA has not been done. Only the build output was checked.
