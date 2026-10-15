# [Task] Post-launch polish and Wayfinder map finalization

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: none

## Context

With tickets #0001 through #0019 completed, the Live CV website is production-deployed at `https://ansaganie.dev`, search engines are indexed, runtime is migrated to Bun, and all core architecture decisions are locked. The remaining items listed in the Map's "Not yet specified" section (P2 review recommendations) need to be finalized to bring the Wayfinder effort to 100% completion.

## Scope

1. **Zod 4 schema hygiene**: Replace deprecated `z.string().url()` and `z.string().email()` calls in `src/schemas/cv.ts` with canonical `z.url()` and `z.email()`, ensuring `bun run check` finishes with 0 hints.
2. **Language-neutral print footer**: Replace hardcoded English `"Page " counter(page) " of " counter(pages)` in `src/styles/print.css` with universal `counter(page) " / " counter(pages)`.
3. **Typography and font request optimization**: Remove unused `Source Serif 4` and no-op `&subset=` parameter from Google Fonts in `src/layouts/BaseLayout.astro`, `src/styles/global.css`, and `tailwind.config.mjs`.
4. **Toolchain & dependency cleanup**: Bump TypeScript to `^5.9.3` and eliminate unused `@emnapi/runtime` from `package.json`, updating `bun.lock`.
5. **CV page meta descriptions**: Update `src/pages/cv.astro`, `src/pages/ru/cv.astro`, and `src/pages/kk/cv.astro` descriptions to use dynamic candidate profile title and remove outdated legacy client names and time claims.
6. **Licensing clarification**: Update `LICENSE` with copyright years (2025–2026) and explicit rights reservation for personal CV content in `src/data/` and `public/cv/` while keeping software under MIT.
7. **Wayfinder completion**: Finalize all tickets in `docs/wayfinder/MAP.md`, empty the fog ("Not yet specified"), and mark the Wayfinder map as fully completed.

## Resolution (2026-10-15)

All remaining polish items implemented and verified:
- Cleared all 7 Zod 4 deprecation hints in `src/schemas/cv.ts` using `z.url()` and `z.email()`. `bun run check` reports 0 errors, 0 warnings, 0 hints across 18 files.
- Replaced English print footer with universal `counter(page) " / " counter(pages)` in `src/styles/print.css`.
- Trimmed `Source Serif 4` and obsolete `subset` query from Google Fonts stylesheet in `src/layouts/BaseLayout.astro`; removed Serif from `src/styles/global.css` and `tailwind.config.mjs`.
- Cleaned devDependencies in `package.json` by removing `@emnapi/runtime`, bumped TypeScript declaration to `^5.9.3`, and updated `bun.lock`.
- Updated `/cv` page descriptions across EN, RU, and KK in `src/pages/` to align with owner decisions (no client claims, no time claims, concise ATS focus).
- Updated `LICENSE` with clear separation of MIT for site code and All Rights Reserved for personal CV content.
- Preserved existing research benchmark `docs/research/personal-website-seo.md`.
- Verified static build passes cleanly (`bun run build` completed 7 pages and sitemap in ~2s).
- Marked Wayfinder Map as completed.
