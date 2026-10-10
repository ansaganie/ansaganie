# [Task] Apply the audit's copy and content changes in all three locales

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
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
 
## Resolution
 
Applied all low-effort copy and content changes across EN, RU, and KK profiles adhering strictly to audit decisions D1–D14 and recommendations R-L2 to R-L17:
- **Canonical Name**: Updated to "Ansagan Islamgaliev" (EN), "Ансаган Исламгалиев" (RU), "Аңсаған Исламғалиев" (KK) across `cv-*.json`, `src/utils/i18n.ts`, `README.md`, and `LICENSE` (R-L17, D4, D8).
- **Pitch & CTAs**: First-person elevator pitch without marketese; removed summary from Overview hero (R-L3); set primary CTA "Download PDF CV", secondary "Email me", text link "Full CV →", and nav label "CV" (R-L4).
- **Highlights & Claims**: Replaced metric cards with 4 Highlights cards per audit §4.1; removed time figures (1200x, 30m, 90m, 1-3h) and unprovable claims ("zero data loss", "100% data fidelity", "atsCompliant") across all locales (R-L6, R-L8, R-L13).
- **Titles & Roles**: Aligned Tengizchevroil / AtyrauTechInvest to "Senior Full-Stack Developer", Norsec Delta to "Software Developer" (`roleType: fullstack`), Aviata start date to Jan 2022, GeoExploration role to "Sole developer" (R-L5, D7, D13, D14).
- **Certifications**: Replaced `certifications[*]` across all 3 locales with the 5 LinkedIn entries approved in D12 (SAFe 6 Practitioner, HackerRank React, HackerRank JS Intermediate, HTML Academy React, HTML Academy JS Architecture) including exact credential IDs and verification URLs (R-L16).
- **Consistency & Footer**: Used "500+ field staff" consistently everywhere (R-L14); unified availability to "Looking for a long-term remote role with an international team · UTC+5" and location "Astana, Kazakhstan" (R-L11, D6, D10); added visible `Updated [Month YYYY]` in footer backed by schema `updatedAt` (R-L15); set concise meta descriptions for CV pages (R-L7).
- **Print Budget & Verification**:
  - `npm run check`: 0 errors, 0 warnings.
  - `npm run build`: 6 pages built successfully.
  - Suppressed `.certs-list a::after` URL expansion in `print.css` to prevent certificate link overflow.
  - Verified print budget with headless Chrome: Overview fits 1 page and CV fits 2 pages across all three locales (`en`, `ru`, `kk`).


## Review follow-up (2026-10-10)

The ultrareview of this ticket's commit found three gaps:

- Stale PDFs. #0014 already fixed this.
- The old name and Atyrau were still hardcoded in `BaseLayout.astro`.
- `meta.availability` in `i18n.ts` repeated `contact.availability`.

Fixed:

- JSON-LD `Person` (name, contact, address), `WebSite.name`, `meta[name=author]` and `og:site_name` now come from `getCandidateProfile()`. The rest of the JSON-LD rebuild stays in #0015.
- The header status-dot tooltip reads `profile.contact.availability`. The duplicate UI strings are deleted.
