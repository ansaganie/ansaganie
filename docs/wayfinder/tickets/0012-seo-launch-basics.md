# [Task] SEO launch basics: trailing-slash policy, sitemap, robots.txt, 404, favicon, og:image

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: open
- **Assignee**: unassigned
- **Blocked by**: none (#0008 closed: origin is `https://ansaganie.vercel.app`, see ADR 0002)

## Question

Add the SEO basics the [deployment readiness review](../../research/deployment-readiness-review.md) found missing (recommendations 8, 9; findings B2, B3, S1–S4):

- Set `trailingSlash: 'always'` and build nav, switcher, hreflang, and canonical URLs from one helper that respects `base` and `site`, so they match exactly. Match it in Vercel with `trailingSlash: true` in `vercel.json`, so slashless URLs redirect.
- `@astrojs/sitemap` with `i18n`, `public/robots.txt` with a `Sitemap:` line, and `<link rel="sitemap">`.
- `src/pages/404.astro`, a favicon set, a 1200×630 `og:image` with `twitter:card=summary_large_image`, and `og:locale:alternate`.

The hosting topology decision fixed `site` (`https://ansaganie.vercel.app`, no `base`), which every absolute URL uses.
