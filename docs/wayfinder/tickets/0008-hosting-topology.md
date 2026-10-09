# [Grilling] Hosting topology: custom domain on this repo, a separate `ansaganie.github.io` repo, or a `base` sub-path

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:grilling (HITL)
- **Status**: open (deferred by owner on 2026-10-05; deployment set aside for now)
- **Assignee**: unassigned
- **Blocked by**: none

## Question

The site lives in `ansaganie/ansaganie`, the profile README repo. GitHub Pages serves a root-level user site only from a repo named `ansaganie.github.io`, so this repo would publish at `https://ansaganie.github.io/ansaganie/`, and every root-relative link breaks ([deployment readiness review](../../research/deployment-readiness-review.md), H1 / B1). Which hosting setup do we deploy to first?

- **A**: buy a custom domain (for example `ansagan.net`, see [#0001](0001-custom-domain-research.md)) and attach it to this repo. The site is served at the domain root, so no `base` is needed.
- **B**: create `ansaganie/ansaganie.github.io` and deploy there, either by moving the site code or by pushing the build artifact from this repo.
- **C**: keep this repo, set `base: '/ansaganie'`, and send every link and asset through `BASE_URL` / `astro:i18n`.

The answer fixes `site`, `base`, the canonical/hreflang origin, the README badge URLs, and where the workflow in #0007 runs. It also settles the map's old fog item "Custom Domain Purchase & Registrar Selection".
