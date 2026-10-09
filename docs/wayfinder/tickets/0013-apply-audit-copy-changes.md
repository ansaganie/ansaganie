# [Task] Apply the audit's copy and content changes in all three locales

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: open
- **Assignee**: unassigned
- **Blocked by**: none

## Question

Apply the low-effort recommendations from the [portfolio audit](../../research/portfolio-ux-seo-audit.md#low-effort-copy-or-config-under-1-hour-each) (R-L2 to R-L17, except R-L1), following the owner decisions D1 to D11:

- Name "Ansagan Islamgaliev" and its RU/KK forms in the datasets, `README.md` and `LICENSE` (R-L17).
- New pitch, no summary in the Overview hero, one primary CTA, nav label "CV" (R-L2 to R-L4).
- Aligned titles (R-L5), no unbackable claims (R-L6), short CV meta description (R-L7).
- Metrics become **Highlights** without time figures, using the copy in [§4.1](../../research/portfolio-ux-seo-audit.md#41-copy-without-time-figures-d2) (R-L8, R-L13).
- Plain section headings, one **Availability** string, location "Astana, Kazakhstan", filler bullets cut, "500+ field staff" everywhere (R-L9, R-L11, R-L12, R-L14).
- An "Updated [Month YYYY]" footer line from a dataset field (R-L15).
- Rebuild `certifications[*]` from the five LinkedIn entries chosen in D12, with title, issuer, date, ID and **Credential Link** exactly as listed in [audit §4.2](../../research/portfolio-ux-seo-audit.md#42-linkedin-certifications-vs-the-dataset-read-2026-10-10) (R-L16).
- Norsec Delta: "Software Developer" in both places, `roleType: fullstack`. Aviata starts Jan 2022 (D13). GeoExploration role: "Sole developer" (D14).

`en` is written first. `ru` and `kk` get the same edits and the owner reviews them.

Done when `npm run check` and the build pass, none of the time figures or removed claims remain in any locale, and the print budget (1 page Overview, 2 pages CV) still holds.
