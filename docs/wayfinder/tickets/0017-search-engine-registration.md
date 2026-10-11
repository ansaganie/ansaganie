# [Task] Register the site with search engines and add IndexNow

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (HITL)
- **Status**: completed
- **Assignee**: Ansagan Islamgali (HITL) & agent:wayfinder
- **Blocked by**: none (#0007 and #0012 are closed)

## Question

Carry out the audit's [§3.2](../../research/portfolio-ux-seo-audit.md#32-launch-checklist-in-order) steps 6 to 10 (R-M7):

- **Google Search Console:** verify the site, submit the sitemap and inspect the key URLs.
- **Bing Webmaster Tools:** import the site from Search Console.
- **IndexNow:** add a key file to `public/` and a post-deploy submit step.
- **Yandex Webmaster:** skipped under D1.
- **Off-site links:** put the live URL on LinkedIn and GitHub, and set the LinkedIn display name to "Ansagan Islamgaliev".

HITL because it needs the owner's Google, Bing and LinkedIn accounts.

## Resolution (2026-10-11)

Completed audit §3.2 steps 6–10 (R-M7) on production `https://ansaganie.dev`:

- **IndexNow Key & Verification**: Generated 32-hex key `32c15d8fa3c64b0f9382bd45dd2944b6` and published `public/32c15d8fa3c64b0f9382bd45dd2944b6.txt`. Verified accessible at `https://ansaganie.dev/32c15d8fa3c64b0f9382bd45dd2944b6.txt` (200 OK).
- **IndexNow Automated Pipeline**: Created `scripts/submit-indexnow.mjs` and `deno task submit:indexnow` submitting all 6 canonical URLs (`/`, `/cv/`, `/ru/`, `/ru/cv/`, `/kk/`, `/kk/cv/`). Added automated post-deploy step to `.github/workflows/deploy.yml` on production deploy. Tested live against `api.indexnow.org`: accepted with `200 OK: URLs submitted`.
- **Search Engine Verification Support**: Wired optional `google-site-verification` meta tag support into `src/layouts/BaseLayout.astro` via `PUBLIC_GOOGLE_SITE_VERIFICATION`.
- **Search Engine Registrations**: Verified site ownership and submitted `sitemap-index.xml` in Google Search Console; imported property and configuration into Bing Webmaster Tools. Key routes inspected.
- **Off-site Profile Alignment**: Updated LinkedIn Contact Info Website URL to `https://ansaganie.dev/` and confirmed display name alignment ("Ansagan Islamgaliev", D4); updated GitHub profile link.
