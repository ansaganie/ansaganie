# [Task] Build the PDF CV files described in ADR 0001

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0013

## Question

Implement [ADR 0001](../../adr/0001-prebuilt-static-pdf-cv.md) with the additions in the audit's [R-M2](../../research/portfolio-ux-seo-audit.md#medium-effort-half-a-day-to-2-days):

- `npm run generate:pdf` renders the built `/cv` page for each locale with Headless Chrome, using print-media emulation (#0011), into `public/cv/Ansagan_Islamgaliev_CV.pdf`, `…_CV_RU.pdf` and `…_CV_KK.pdf`.
- Every print button becomes an `<a download>` link to the current locale's **PDF CV**. The header link stays visible below 640 px.

Blocked by #0013 so the first committed PDFs carry the final content.

## Resolution

Implemented ADR 0001 and audit recommendation R-M2 in full:
- **Canonical Filenames**: Updated `scripts/generate-pdf.mjs` targets, `src/utils/i18n.ts` (`getPdfCvFilename`), and `docs/adr/0001-prebuilt-static-pdf-cv.md` consequences to use the canonical spelling `Ansagan_Islamgaliev_CV.pdf`, `Ansagan_Islamgaliev_CV_RU.pdf`, and `Ansagan_Islamgaliev_CV_KK.pdf`.
- **Prebuilt PDFs Generation**: Ran `npm run generate:pdf` using Headless Chrome print-to-pdf. Generated clean, hermetic ATS-compliant PDFs into `public/cv/` and synced to `dist/cv/`. Removed legacy `Ansagan_Islyamgaliyev_*` PDFs.
- **Page Budget Verified**: Verified exact page counts:
  - `Ansagan_Islamgaliev_CV.pdf`: 2 pages, 198.0 KB
  - `Ansagan_Islamgaliev_CV_RU.pdf`: 2 pages, 187.0 KB
  - `Ansagan_Islamgaliev_CV_KK.pdf`: 2 pages, 203.5 KB
- **Mobile Header Download Link**: Changed Header PDF download action from `hidden sm:inline-flex` to `inline-flex` so the download action is visible and usable below 640 px on mobile devices without horizontal overflow.
- **Download Link Integration**: Confirmed `<a download>` attributes and paths across Header, Overview hero, and CV page match the prebuilt localized PDFs.
- **Verification**: `npm run check` (0 errors, 0 warnings) and `npm run build` (6 pages built) both pass cleanly.
