# [Research] Custom domain pricing, registrar rules (.kz vs .xyz vs .net), and DNS configuration

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:research (AFK)
- **Status**: completed
- **Assignee**: subagent:research
- **Blocked by**: none

## Question

What are the specific options, cost breakdowns, registrar rules (e.g. Kazakhstan local server regulation for `.kz`), DNS configurations, and step-by-step procedures for attaching a custom domain (`ansaganie.kz`, `ansagan.xyz`, `ansagan.net`, or free `ansaganie.github.io`) to GitHub Pages and Cloudflare Pages?

## Findings & Deliverables

Completed research document saved at [docs/research/custom-domain-options.md](../../research/custom-domain-options.md).

Key conclusions:
1. `ansaganie.github.io` is $0/yr, ready immediately, zero maintenance.
2. `ansagan.net` ($11.86/yr at-cost on Cloudflare Registrar) and `ansagan.xyz` ($11.20/yr) are available with zero local hosting friction.
3. `.kz` requires origin server hardware physically located in Kazakhstan (Order No. 38/НҚ). Direct binding to GitHub Pages will cause delegation suspension by KazNIC/KZ-CERT unless routed through a domestic reverse proxy VPS (~$55-$80/yr total).

