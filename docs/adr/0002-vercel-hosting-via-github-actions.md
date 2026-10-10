# Vercel Hosting via GitHub Actions

The site's code stays in `ansaganie/ansaganie` (the Profile README repo), so GitHub Pages could only serve it from the root by renaming the repo, pushing the build into a second `ansaganie.github.io` repo with a deploy key, or adding a `/ansaganie/` base path. We host on Vercel at `https://ansaganie.vercel.app` instead. GitHub Actions in this repo run every deploy with the Vercel CLI: a merge to `main` deploys to production, and a PR gets a preview behind Vercel Authentication. Vercel's own Git auto-deploy is turned off. The site is served from the root with no second repo and no base path, and every deploy goes through the same checks first.

## Considered Options

- **Custom domain (`ansagan.net`) on this repo via GitHub Pages**: the cleanest URL, but it needs a purchase and DNS setup now. It's deferred, not rejected. See [custom domain options](../research/custom-domain-options.md).
- **Build here and push to `ansaganie.github.io` with a deploy key**: briefly chosen, then dropped. It needs a second repo, a long-lived credential, and duplicate content once Vercel also served production.
- **Vercel previews only, production on GitHub Pages**: dropped because the owner wants every merge to `main` deployed to Vercel.
- **`base: '/ansaganie'` on this repo**: an ugly URL, and every link and asset would have to go through `BASE_URL`.

## Consequences

- `site` in `astro.config.mjs`, canonical/hreflang URLs, the sitemap and the README badges all use `https://ansaganie.vercel.app`. GitHub Pages stays off for this repo.
- `ansaganie.github.io` stays free. A custom domain can be attached to the Vercel project later without moving `virtual-keyboard` (which is served at `ansaganie.github.io/virtual-keyboard/`). Doing that changes the canonical origin, so it's best done before or soon after indexing.
- The Hobby plan allows non-commercial personal use only, which fits a personal CV.
- Deploys need `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` as repo secrets. The Vercel GitHub app isn't needed.
