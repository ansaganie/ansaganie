# [Grilling] New content: case studies, career story, photo, public writing

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:grilling (HITL)
- **Status**: completed
- **Assignee**: Ansagan Islamgali (HITL) & agent:wayfinder
- **Blocked by**: none

## Question

Which of the audit's [postponed items](../../research/portfolio-ux-seo-audit.md#postponed-until-the-content-grilling-session) should the site gain, and with what content?

- **R-M1:** case-study fields on project cards.
- **R-H1:** two case-study pages, which would change the 2-page scope.
- **R-H2:** a career narrative block and an optional photo.
- **R-H3:** public .NET write-ups, posted elsewhere and linked from the site.

None of them may bring back time figures (D2).

## Resolution (2026-10-11)

Concluded the HITL content grilling session with owner decisions across all four candidate areas and additional hero copy refinements:

- **R-H1 (Case-study pages)**: Ruled out of scope. Preserved the strictly 2-page Live CV structure (Overview & CV) to avoid scope inflation into a multi-page portfolio and maintain ATS compliance.
- **R-M1 (Case-study card fields)**: Decided against adding expandable problem/approach/tradeoffs fields to project cards. Kept the clean, scannable card layout established in #0016.
- **R-H2 (Career narrative & photo)**: Decided against adding a photo or separate narrative block; the site remains photo-less and developer-focused, letting the CV timeline speak for the career transition from wellsite telemetry to software engineering.
- **R-H3 (Public writing)**: Ruled authoring new external technical articles out of scope for the website map.
- **Availability removal**: Completely removed the availability badge ("Looking for a long-term remote role with an international team · UTC+5") from the Overview Page hero, made `availability` optional in `src/schemas/cv.ts`, removed it from all datasets (`cv-en.json`, `cv-ru.json`, `cv-kk.json`), cleaned it from `README.md`, and updated `scripts/og-image.html`.
- **General web-only skills introduction**: Replaced the former enterprise pitch (`"I turn legacy enterprise applications into fast, maintainable .NET and React systems, currently for Chevron and Tengizchevroil."`) with a general web-focused introduction covering full-stack web applications without company names:
  - **EN**: `"I design and build fast, maintainable, and scalable full-stack web applications across .NET, React, and TypeScript."`
  - **RU**: `"Проектирую и создаю быстрые, поддерживаемые и масштабируемые full-stack веб-приложения на .NET, React и TypeScript."`
  - **KK**: `".NET, React және TypeScript стектерінде жылдам, қолдауға ыңғайлы және масштабталатын full-stack веб-қосымшаларды жобалап әзірлеймін."`
  - Applied across `src/data/cv-*.json`, the Overview hero, SEO meta descriptions, and `README.md`.
