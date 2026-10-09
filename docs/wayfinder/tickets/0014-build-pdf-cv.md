# [Task] Build the PDF CV files described in ADR 0001

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: in progress (uncommitted work as of 2026-10-10: `scripts/generate-pdf.mjs`, a `generate:pdf` script and `public/cv/*.pdf` still named `Ansagan_Islyamgaliyev_*`; needs the rename and a regenerate after #0013)
- **Assignee**: unassigned
- **Blocked by**: #0013

## Question

Implement [ADR 0001](../../adr/0001-prebuilt-static-pdf-cv.md) with the additions in the audit's [R-M2](../../research/portfolio-ux-seo-audit.md#medium-effort-half-a-day-to-2-days):

- `npm run generate:pdf` renders the built `/cv` page for each locale with Headless Chrome, using print-media emulation (#0011), into `public/cv/Ansagan_Islamgaliev_CV.pdf`, `…_CV_RU.pdf` and `…_CV_KK.pdf`.
- Every print button becomes an `<a download>` link to the current locale's **PDF CV**. The header link stays visible below 640 px.

Blocked by #0013 so the first committed PDFs carry the final content.
