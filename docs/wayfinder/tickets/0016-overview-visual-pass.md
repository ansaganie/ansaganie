# [Task] Overview visual pass: order, readable type, less template styling

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0013

## Question

Apply the audit's R-L10 and R-M4 to R-M6:

- Reorder the Overview to hero, Projects, Highlights, Tech stack, and add an `id="projects"` anchor plus a nav item for it.
- Body copy goes from 12 to 14 px and tags from 10 to 12 px. Section headings get primary weight.
- Remove the pulse dot, the "ENTERPRISE" badges and the green "Impact:" chips.
- Compress the skills to one line per group.

Done when it has been checked at 320, 375 and 1440 px in both themes, with no horizontal scroll, and the print budget is re-measured.

## Resolution

Applied visual hierarchy pass, section reordering, readable typography scale, and template cleanup:
- **Section Reorder & Anchor**: Reordered Overview to Hero -> Projects -> Highlights -> Tech stack (R-L10). Added `id="projects"` anchor to Featured Engineering Projects.
- **Navigation**: Added localized Projects nav link (`nav.projects`: "Projects" / "Проекты" / "Жобалар") in `Header.astro` linking to `${homePath}#projects` (R-L10).
- **Template Styling Cleanup**: Removed pulsing status dots from both Header brand and Hero availability badge (R-M5). Removed "ENTERPRISE" badges from project cards. Replaced green "Impact:" chips with plain bold text (R-M5).
- **Competencies Compression**: Compressed technical skills to one line per group using comma-separated lists matching `CvContent.astro` (Languages & Frameworks, Frontend & Visualization, Backend & Cloud, Architecture & Practices) (R-M6).
- **Typography Scale**: Upgraded body copy from 12px to 14px (`text-sm`), tags from 10px to 12px (`text-xs`), and section headings to `text-base font-semibold text-content-primary` (R-M4).
- **Automated Verification**:
  - `scripts/verify-overview-pass.mjs`: verified 15 assertions across i18n, Header, Overview component, and built HTML.
  - `scripts/verify-viewport-scroll.mjs`: verified zero horizontal scroll across 320px, 375px, and 1440px viewports in both light and dark themes for all locales.
  - `scripts/measure-print-budget.mjs`: re-measured print budget with headless Chrome: Overview fits 1 page and CV fits 2 pages across EN, RU, and KK.
  - `npm run check`: 0 errors, 0 warnings.
  - `npm run build`: 6 pages built cleanly.
