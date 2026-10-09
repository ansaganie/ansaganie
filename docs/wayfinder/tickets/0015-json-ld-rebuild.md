# [Task] Rebuild the JSON-LD from the dataset

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0013

## Question

Apply the audit's [R-M3](../../research/portfolio-ux-seo-audit.md#medium-effort-half-a-day-to-2-days) (§3.2 steps 3–4) in `src/layouts/BaseLayout.astro`:

- Add `ProfilePage.mainEntity` and `dateModified`.
- Set `Person.name` to "Ansagan Islamgaliev", with every older and Cyrillic spelling in `alternateName`.
- Use a localized `jobTitle` and `addressLocality: 'Astana'`, and keep `telephone`.
- Build all of it from `getCandidateProfile(locale)`.
- Remove the `<body>` microdata, or give it the same `@id`.

Absolute URLs come from `Astro.site`, so this does not wait for hosting.

Done when the Rich Results Test (code input) shows one Person and a valid ProfilePage for each locale.

## Resolution

Completed R-M3 (§3.2 steps 3–4) in `src/layouts/BaseLayout.astro`:
- **ProfilePage Structure**: Added `mainEntity: { '@id': `${siteUrl}/#person` }` and `dateModified: '2026-10-10'`.
- **Person Metadata**: Configured `canonical.name` ("Ansagan Islamgaliev"), 5 `alternateName` spellings, localized `jobTitle` from `profile.title`, `addressLocality` set to "Astana", phone kept, and `knowsAbout: profile.skills.primary`.
- **Microdata Cleanup**: Removed `itemscope itemtype="https://schema.org/Person"` from `<body>`, ensuring a single canonical `Person` entity defined in JSON-LD.
- **Verification**: TDD automated verification script verified zero leftover microdata, single Person schema, and valid ProfilePage across all 6 pages and 3 locales (`en`, `ru`, `kk`). `npm run check` (0 errors, 0 warnings) and `npm run build` pass cleanly.
