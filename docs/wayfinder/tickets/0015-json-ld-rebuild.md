# [Task] Rebuild the JSON-LD from the dataset

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: in progress
- **Assignee**: unassigned
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

## Progress

These parts are done as the #0013 review follow-up, in `BaseLayout.astro`:

- `Person.name` comes from the `en` profile, which gives "Ansagan Islamgaliev".
- `alternateName` holds the five D8 spellings.
- `jobTitle` is localized from `profile.title`.
- `email`, `telephone`, `sameAs` and `address` come from `contact`. The address resolves to Astana, Kazakhstan.

Still to do:

- `ProfilePage.mainEntity` and `dateModified`.
- The `<body>` microdata.
- The Rich Results Test check.
