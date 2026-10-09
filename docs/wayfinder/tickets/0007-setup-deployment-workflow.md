# [Task] Set up GitHub Actions CI/CD deployment workflow to GitHub Pages with custom domain support

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: open
- **Assignee**: unassigned
- **Blocked by**: #0005, #0008, #0009, #0010

## Question

How should the GitHub Actions workflow (`.github/workflows/deploy.yml`) build the Astro site, publish the static output to GitHub Pages, and support a custom domain without interfering with the profile README?

### Pre-flight notes ([deployment readiness review](../../research/deployment-readiness-review.md))

- Follow Astro's guide: `actions/checkout@v7`, then `withastro/action@v6` (Node 24), then `actions/deploy-pages@v5`, with `permissions: contents: read, pages: write, id-token: write` and `environment: github-pages`. Set the Pages source to **GitHub Actions** (H3).
- An Actions deploy ignores a `CNAME` file. Bind the domain under Settings → Pages → Custom domain, and verify it first (D1, D2).
- Add a PR job that runs `npm ci`, `astro check`, and `astro build` before any deploy (H5, recommendation 27).
- Which repo the workflow runs in and what `site`/`base` it builds with come from #0008.
