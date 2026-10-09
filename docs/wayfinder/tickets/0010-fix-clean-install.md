# [Task] Make a clean `npm ci` pass on a CI runner

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: none

## Question

`npm ci` and `npm install` both fail with `ERESOLVE`, because `@astrojs/tailwind@6.0.2` (deprecated) declares peer `astro ^3 || ^4 || ^5` and the project uses Astro 7.3.5. `withastro/action` runs `npm install`, so CI would fail before building anything ([deployment readiness review](../../research/deployment-readiness-review.md), H2 / B4). Two fixes:

- migrate to Tailwind 4 through `@tailwindcss/vite` and drop the deprecated integration. This also clears the `braces` audit chain. Or:
- commit `.npmrc` with `legacy-peer-deps=true` as a stopgap.

Done when `npm ci && npm run check && npm run build` passes in a fresh clone, every page still renders the same, and the print budget (1/2 pages per locale) still holds. Also run `npm audit fix` for `http-cache-semantics`.

## Resolution

Migrated to Tailwind 4 through `@tailwindcss/vite` and removed the deprecated `@astrojs/tailwind`, so no `.npmrc` stopgap is needed. In a fresh copy of the repo, `npm ci && npm run check && npm run build` passes with no flags: 0 errors, 0 warnings, 6 pages. `npm audit fix` cleared `http-cache-semantics`, and leaving Tailwind 3 cleared the `braces` chain, so `npm audit` reports **0 vulnerabilities** (was 6 high). The lockfile includes the Linux x64 native binaries a CI runner needs (`@tailwindcss/oxide-linux-x64-gnu`, `lightningcss-linux-x64-gnu`, `@esbuild/linux-x64`, `@rolldown/binding-linux-x64-gnu`).

### Changes

- `package.json`: `-@astrojs/tailwind`, `-@tailwindcss/typography` (unused, no `prose` classes), `tailwindcss` 3.4.19 → 4.3.3, `+@tailwindcss/vite`.
- `astro.config.mjs`: `vite.plugins: [tailwindcss()]` replaces the integration.
- `tailwind.config.mjs`: kept, loaded through Tailwind 4's `@config` bridge (smallest change, because the colour tokens are already CSS variables). Pins the Tailwind 3 font-size/line-height pairs. Tailwind 4's unitless line-heights loosened lines in print and pushed the English CV to 3 pages.
- `global.css`: `@import 'tailwindcss'` + `@config`. Base and component rules now sit in `@layer base` / `@layer components`, because unlayered CSS beats every utility in v4 (for example, `body { color }` would have overridden `text-content-primary`). The v3 grey default border and the button pointer cursor are restored. `--font-mono` matches the config stack.
- `print.css`: the print budget was tuned against v3's `space-y` (top margins). In print, v4's `margin-block-end` is zeroed and the v3 top margins are restored for every `space-y` step the site uses.

### Verification

A computed-style and geometry snapshot covered every element (11,304 across 36 views: 6 routes × light/dark × 375 px / 1280 px / print), taken against the Tailwind 3 build and again after the migration:

- **Print**: identical. Every element sits in the same position, and page counts are 1/2/1/2/1/2 in both themes.
- **Screen**: no element moves more than 2 px.
- **Intentional visual changes**: three classes that silently did nothing under Tailwind 3 now work as written:
  - `shadow-xs` (9 elements: active language pill, CTAs, cards). Tailwind 3 had no `xs` shadow.
  - `bg-canvas/90` on the sticky header (90% canvas behind the blur). Tailwind 3 can't apply opacity modifiers to `var()` colours, so the header was transparent.
  - `border-status-success/30` on the availability pill.

  Revert any of them by deleting the class.

The built CSS grew from 22.8 KB to 36.5 KB, because Tailwind 4 adds theme variables and `@property` rules.
