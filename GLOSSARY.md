# Personal Website & Live CV

Canonical vocabulary for the personal website and live CV project.

## Language

**Live CV**:
A web-based curriculum vitae designed for both online viewing and ATS-compliant document parsing, offered alongside a downloadable **PDF CV** in every **Locale**.
_Avoid_: Web resume, online portfolio

**PDF CV**:
A prebuilt, ATS-compliant A4 PDF document, one per **Locale**, containing the same content as the **CV Page**, formatted for immediate download and job application submissions.
_Avoid_: Resume download, printout, paper copy, CV attachment

**Overview Page**:
The primary summary view highlighting professional identity, featured **Projects**, **Highlights** and tech stack.
_Avoid_: Home page, landing page, portfolio page

**CV Page**:
The chronological career record detailing past roles, achievements, education, industry certifications and honors at `/cv`.
_Avoid_: Timeline page, career history, work history page

**Highlight**:
A short card on the **Overview Page** that names an area of work and its plain outcome, without time or speed-up figures.
_Avoid_: Metric, impact metric, KPI, key outcome

**Project**:
A named piece of work (enterprise, commercial or open source) shown on the **Overview Page** with the candidate's role, client and stack.
_Avoid_: Case study (reserved for a future long-form write-up), mission-critical system

**Availability**:
Formerly the statement of candidate role preference; omitted from the site and profile per owner decision.
_Avoid_: Status, open-to-work badge

**Credential Link**:
The URL that lets a reader check a certification for themselves, taken from the matching LinkedIn certification entry.
_Avoid_: Verify link (when it only points at the issuer's homepage)

**Profile README**:
The repository's root `README.md` displayed publicly on the user's GitHub profile (`github.com/ansaganie`), kept aligned with the live CV overview.

**Locale**:
A supported language variant (`en`, `ru`, `kk`) that determines the UI copy and localized resume content under explicit path routes (`/`, `/ru`, `/kk`). `en` is the priority locale; `ru` and `kk` are kept in sync with it.
