# [Grilling] Hosting topology: custom domain on this repo, a separate `ansaganie.github.io` repo, or a `base` sub-path

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:grilling (HITL)
- **Status**: completed (2026-10-10)
- **Assignee**: Ansagan Islamgali (claimed 2026-10-10)
- **Blocked by**: none

## Question

The site lives in `ansaganie/ansaganie`, the profile README repo. GitHub Pages serves a root-level user site only from a repo named `ansaganie.github.io`, so this repo would publish at `https://ansaganie.github.io/ansaganie/`, and every root-relative link breaks ([deployment readiness review](../../research/deployment-readiness-review.md), H1 / B1). Which hosting setup do we deploy to first?

- **A**: buy a custom domain (for example `ansagan.net`, see [#0001](0001-custom-domain-research.md)) and attach it to this repo. The site is served at the domain root, so no `base` is needed.
- **B**: create `ansaganie/ansaganie.github.io` and deploy there, either by moving the site code or by pushing the build artifact from this repo.
- **C**: keep this repo, set `base: '/ansaganie'`, and send every link and asset through `BASE_URL` / `astro:i18n`.

The answer fixes `site`, `base`, the canonical/hreflang origin, the README badge URLs, and where the workflow in #0007 runs. It also settles the map's old fog item "Custom Domain Purchase & Registrar Selection".

## Resolution

None of A, B or C. The site is hosted on **Vercel** at `https://ansaganie.vercel.app`, and GitHub Actions in this repo drive every deploy. Recorded in [ADR 0002](../../adr/0002-vercel-hosting-via-github-actions.md).

How it got here: the owner first picked B, building here and pushing to `ansaganie.github.io` with a deploy key, then asked to deploy every merge to `main` to Vercel. Running both hosts would have left one of them as duplicate content, so Vercel became the only host and the GitHub Pages plan was dropped.

Settled with the owner:

- **Production host**: Vercel only, at `ansaganie.vercel.app` (the name returned 404 on 2026-10-10, so it's very likely free). GitHub Pages stays off for this repo, and `ansaganie.github.io` isn't created.
- **Origin**: `site: 'https://ansaganie.vercel.app'`, no `base`. Canonical, hreflang, sitemap and the README badges all use this origin.
- **Deploy mechanism**: GitHub Actions with the Vercel CLI (`vercel pull` → `vercel build` → `vercel deploy`). Vercel's Git auto-deploy is turned off (`"git": { "deploymentEnabled": false }` in `vercel.json`), so the Vercel GitHub app isn't needed.
- **Triggers**:
  - A merge to `main` runs `npm ci` → `astro check` → build → `vercel deploy --prod`. The workflow can also be run manually (`workflow_dispatch`).
  - A PR runs the same checks, then makes a preview deploy and comments its URL on the PR. Nothing is scheduled.
- **Preview access**: Vercel Authentication stays on, so previews open only for the owner's Vercel login. A per-deployment share link covers one-off sharing.
- **Custom domain**: out of scope for this effort. Nothing blocks attaching one to the Vercel project later; the [custom domain research](0001-custom-domain-research.md) still applies, and `ansagan.net` was still unregistered on 2026-10-10.

Facts checked during the session (2026-10-10):

- The Vercel MCP is signed in as user `ansaganie` (Hobby plan, MFA on). Projects live under the scope `ansaganie-projects` (`team_3rHWKlDpx4eLJk04X4X5qthL`).
- The connector currently gets **403** on project calls in that scope, and the Vercel CLI isn't installed.
- `virtual-keyboard` already uses GitHub Pages, at `ansaganie.github.io/virtual-keyboard/`, and is unaffected.
