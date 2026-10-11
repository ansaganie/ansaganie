# Custom Domain ansaganie.dev on Vercel via Cloudflare

The website's canonical origin moves from `https://ansaganie.vercel.app` to the custom apex domain `https://ansaganie.dev`. The domain is registered with Cloudflare Registrar at-cost, DNS is managed via Cloudflare in DNS-only mode (proxy disabled), and hosting continues on Vercel deployed via GitHub Actions. `www.ansaganie.dev` and the legacy `ansaganie.vercel.app` permanently redirect (308) to `https://ansaganie.dev`.

## Considered Options

- **`ansagan.net` / `ansagan.xyz` (earlier research in #0001)**: `ansaganie.dev` was chosen instead because it matches the developer's canonical GitHub handle (`ansaganie`) directly under the modern `.dev` top-level domain.
- **Subdomain primary (`www.ansaganie.dev`)**: rejected in favor of the clean apex `ansaganie.dev`, keeping URLs concise across live CV links, resumes, and GitHub profile badges.
- **Cloudflare Proxy (Orange Cloud)**: rejected in favor of DNS-only (Grey Cloud) because Vercel already provides Anycast edge routing, automated Let's Encrypt / DigiCert SSL management, HTTP/3, and Brotli compression, eliminating SSL challenge loops and double-CDN caching complexities.

## Consequences

- `site` in `astro.config.mjs`, `BaseLayout.astro` fallback, `public/robots.txt`, `scripts/generate-images.mjs`, `.github/workflows/deploy.yml` production environment URL, and GitHub profile README badges all use `https://ansaganie.dev`.
- OpenGraph share cards (`public/og-image.png`) display `ansaganie.dev` in the card footer.
- `ansaganie.vercel.app` stays attached in the Vercel project to preserve 308 redirect continuity for older links.
- Amends the origin and consequences sections of [ADR 0002](0002-vercel-hosting-via-github-actions.md).
