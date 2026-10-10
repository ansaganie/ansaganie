# Prebuilt Static PDF CV

## Context
Ticket #0005 originally deferred automated PDF exports to the map's fog and relied on browser `window.print()` triggers. However, job application portals require ready-to-upload static `.pdf` files, and `window.print()` creates inconsistent user experiences across mobile browsers and platforms.

## Decision
We prebuild static, ATS-compliant PDF CV files (`Ansagan_Islamgaliev_CV.pdf`, `Ansagan_Islamgaliev_CV_RU.pdf`, `Ansagan_Islamgaliev_CV_KK.pdf`) using Headless Chrome against the built `/cv` HTML routes, commit them into `public/cv/`, and replace all website "print" buttons with direct `<a download>` links. A dedicated `npm run generate:pdf` script regenerates the files when data changes.

## Consequences
- Site visitors get instantaneous, zero-confirmation PDF downloads for job application submissions.
- GitHub Pages serves static files directly with no headless browser or server runtime dependencies during deployment.
- The prebuilt PDFs (`Ansagan_Islamgaliev_CV.pdf`, `Ansagan_Islamgaliev_CV_RU.pdf`, `Ansagan_Islamgaliev_CV_KK.pdf`) must be regenerated and committed whenever localized CV datasets in `src/data/` change.
