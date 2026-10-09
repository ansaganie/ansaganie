# Research: Portfolio UX, Recruiter-Readiness, and Search Indexing Audit of the Live CV

> **Ticket**: none (ad-hoc audit). Builds on [#0009](../wayfinder/tickets/0009-confirm-published-personal-data.md), [#0011](../wayfinder/tickets/0011-prelaunch-ui-fixes.md), [#0012](../wayfinder/tickets/0012-seo-launch-basics.md), [ADR 0001](../adr/0001-prebuilt-static-pdf-cv.md) and the [deployment readiness review](deployment-readiness-review.md)  
> **Date**: October 2026 (inspection run 2026-10-09)  
> **Status**: Completed. Revised 2026-10-10 with the owner's answers (see [Owner Decisions](#owner-decisions-2026-10-10)), then grilled the same day; the work is ticketed as #0013–#0018 on the [map](../wayfinder/MAP.md)  
> **Target Identity**: Ansagan Islamgaliev (`ansaganie`). The site currently shows "Angsagan Islyamgaliyev"  
> **Scope**: Commit `bfae371` on `main`. Rendered from a production build (`astro build` + `astro preview`) in Playwright/Chromium at 1440×900 and 375×812. No source files were changed.

Items already planned in #0009, #0011, #0012 or the readiness review are only referenced, not repeated. Tags used: **[evidence]** means backed by a cited source, and **[heuristic]** means reviewer judgement with no direct study behind it.

---

## Executive Summary

*Revised 2026-10-10 to reflect the [Owner Decisions](#owner-decisions-2026-10-10). The original findings in §1–§3 still describe the site as audited.*

1. **The site is not online, so nobody can find it.** `https://ansaganie.github.io/` returned `404` on 2026-10-09. The hosting decision ([#0008](../wayfinder/tickets/0008-hosting-topology.md)) was deferred, and #0007 and #0012 wait on it. No copy or SEO work matters until this is decided. Once it is, finish #0012 and add the schema and indexing fixes in [§3](#3-search-engine-indexing-google-bing-yandex): `ProfilePage.mainEntity`, **"Ansagan Islamgaliev"** as `name` with the older spellings in `alternateName`, and registration with Google Search Console and Bing.
2. **Rewrite the hero for an international employer in any industry.** The current pitch (*"Specializing in modernizing legacy enterprise systems into high-performance ASP.NET Core & React applications."*) is generic, a 547-character summary repeats the title, and three buttons compete for attention. Fix: one first-person line that says what you do and where you have done it, with Chevron and Tengizchevroil as the proof and oil & gas as background rather than the headline. Add one primary button ("Download PDF CV"), remove the summary from the Overview, and use one availability line that says you are looking for a long-term remote role with an international team (D6).
3. **Make the claims checkable and consistent.** Link every certification to its credential URL from your LinkedIn profile instead of the issuer's homepage. Remove the time figures (owner decision) and the claims nothing can back up ("Verified Key Outcomes", "Zero data loss", "100% data fidelity", the footer's "100% ATS"). Fix the contradictions: "Lead Software Engineer" vs "Senior Software Developer" for the same role, and "users" / "field engineers" / "field workers" for the same 500+ people.

---

## Owner Decisions (2026-10-10)

The owner answered the five follow-up questions. These answers override the original recommendations where they conflict.

| # | Question | Decision | Effect on this report |
| :--- | :--- | :--- | :--- |
| D1 | Target reader | **Foreign companies, any industry.** Long-term roles on large, interesting projects anywhere in the world. | Lead with the engineering, not with oil & gas. **English is the priority locale**, with RU/KK kept in sync. Google and Bing come first; Yandex becomes optional. Revises R-L2, R-L7, R-L11 and §3.2. |
| D2 | Headline numbers | **Remove the time figures** (30 min → 1.5 s, 90 → 15 min, 1–3 h → minutes, 1200x, 6x). Describe the work as performance improvements without numbers. | Metric cards become plain "highlight" cards. Revises R-L2, R-L6, R-L8, R-L13 and the `summary`. The non-time number "500+ users" stays. |
| D3 | Proof | **Every certificate has a credential link on LinkedIn.** | Replace the issuer-homepage "Verify" links with those URLs (R-L16). This answers #0009 item 1. "Zero data loss" is not a certificate, so it is still removed. |
| D4 | Name spelling | **"Ansagan Islamgaliev"** | Use it in the H1, `<title>`, JSON-LD `name`, README, LICENSE and PDF file names. Keep the old spellings in `alternateName`. Answers the Latin half of #0009 item 3 (the Cyrillic half is D8). Revises R-M2 and R-M3 and adds R-L17. |
| D5 | Case studies / writing | **Postponed** to a separate grilling session. Work with the existing content for now. | R-M1, R-H1, R-H2 and R-H3 move to [Postponed](#postponed-until-the-content-grilling-session). |
| D6 | Work mode | **Remote only**, no relocation. | R-L11 availability string. |
| D7 | Current title | **"Senior Full-Stack Developer (Software Development Engineer)"** at Tengizchevroil / AtyrauTechInvest. Not "Lead". | R-L5. |
| D8 | Cyrillic names | RU **"Ансаган Исламгалиев"**, KK **"Аңсаған Исламғалиев"**. | R-L17 and JSON-LD `alternateName`. Closes #0009 item 3. |
| D9 | Phone number | **Keep it** on the site, in JSON-LD and in the PDF CV. It is the owner's own number. | Closes #0009 item 2. |
| D10 | Location | **Astana, Kazakhstan** only (the owner has lived there since the last position). Past roles keep their own work locations. | `contact.location`, JSON-LD `addressLocality`, R-L11, R-M3. |
| D11 | User base noun | **"500+ field staff"**, a neutral noun that cannot overstate who the users were. | R-L14 and every "500+" mention in §4.1. |
| D12 | Certifications | **Five LinkedIn entries**, copied exactly (see §5). | R-L16. |
| D13 | Aviata start | **Jan 2022** (as on LinkedIn). | `experience[2].period`. |
| D14 | GeoExploration role | **"Sole developer"**. | `projects[3].role` (R-L5). |

The numbers were the most distinctive evidence on the page, and NN/g and Bock both favour concrete outcomes. Without them, the credibility has to come from named employers, verifiable credentials and the "500+ users" scale **[heuristic]**. Case studies in the postponed session could bring back context without exact figures.

---

## 1. What Was Inspected

| Check | Result |
| :--- | :--- |
| Build | `astro build`: 6 pages, no warnings |
| Live URL | `https://ansaganie.github.io/` → **404** (curl, 2026-10-09) |
| Console | 1 error on every page: `favicon.ico` 404 (already in #0012) |
| `<head>` (`/`) | title, description (115 chars), canonical, hreflang ×3 + `x-default`, OG (no `og:image`), `twitter:card=summary`, JSON-LD `Person` + `WebSite` + `ProfilePage`. No sitemap, robots.txt or verification tags. |
| `<head>` (`/cv/`) | canonical `…/cv/` but hreflang `…/cv` (mismatch, #0012). Description is **547 / 524 / 559 chars** (EN/RU/KK). |
| Horizontal scroll at 375 px | None (#0011 holds) |
| Computed font sizes in `<main>` | 10, 12, 14, 16, 20 px. Most body copy (metric details, project summaries, CV bullets) is **12 px** (`text-xs`). |
| Page length, mobile 375 px | Overview 4,924 px (≈6 screens), CV 5,654 px (≈7 screens) |

### Clicks from landing (`/`) to key content

| Target | Desktop 1440 px | Mobile 375 px |
| :--- | :--- | :--- |
| Key projects | 0 clicks, but ≈1,550 px of scrolling (≈1.7 screens) behind Metrics and Skills. No nav link. | 0 clicks, **3,301 px** of scrolling (≈4 screens) |
| Project detail / case study | **Does not exist.** 2 of 4 featured projects have no link at all. | Same |
| CV | 1 (nav "CV Timeline" or the hero CTA) | 1 |
| PDF | 1 click to the browser print dialog, then choose "Save as PDF" and save (≈3 steps). **No downloadable file** in the audited build (ADR 0001 now plans one). | The header "PDF" button is hidden below 640 px. The hero button opens the OS print sheet. |
| Contact | 0 (contact card above the fold; "Contact Me" is a `mailto:`) | 0–1 (contact card just below the fold) |

Every target is under 3 clicks. The problem is **scroll depth and missing depth of content**, not click count.

---

## 2. Detailed Breakdown

### 2.1 First Impression & Clarity (10-second test)

Evidence base: users "often leave Web pages in 10–20 seconds", and "to gain several minutes of user attention, you must clearly communicate your value proposition within 10 seconds" (NN/g, based on Microsoft Research dwell-time data). Aesthetic judgements form "as early as 50 milliseconds" (Lindgaard et al. 2006, via NN/g). Ladders' 2018 recruiter eye-tracking update reports a 7.4-second initial resume screen. **Limitation:** this is a vendor study. The 2018 release gives no sample size, the original PDF returned 403, and secondary sources say the 2012 edition used 30 recruiters. Treat the figure as directional.

**What works**
- The name (H1, 48 px) and title are the two largest elements, so *who* and *what* are clear at a glance **[evidence: NN/g "whatever is important … should actually look important"]**.
- Contact channels are visible above the fold on desktop, and the location is stated.
- The page is clean and calm: no stock imagery or carousel, and contrast passes (readiness review A6).

**What hurts**
- **No value line with proof.** The *why you* is the 30 min → 1.5 s result, and it appears only in the 6th sentence of the summary and in a metric card below the fold. NN/g advises putting "the most important points in the first two paragraphs" and starting with "the words carrying most information" **[evidence]**.
- **Near-duplicate text in three tiers.** The title "Senior Full-Stack .NET & React Engineer", then the pitch "Specializing in modernizing…", then the summary "Senior Full-Stack Software Engineer with 4+ years…". That is 87 words before the first CTA. NN/g measured 58% better usability for concise text and 124% for concise + scannable + objective text combined (1997 study, still cited) **[evidence]**.
- **Marketese.** "mission-critical", "high-performance", "Slashed", "Demonstrated success in eliminating performance bottlenecks". NN/g found users reject promotional language because it "imposes a cognitive burden" **[evidence]**.
- **Three CTAs of near-equal weight** ("View Career Timeline", "Contact Me", "Print / Save as PDF"), plus a fourth "PDF" button in the header on desktop. NN/g advises "preventing multiple calls-to-action with equal visual weight" **[evidence]**.
- **Inconsistent availability.** The hero pill says *"Open to long-term contract engagements & remote roles"*, while the header-dot tooltip says *"Available for enterprise contracts & senior roles"* (`i18n.ts` `meta.availability`). Neither gives a time zone, which remote recruiters need **[heuristic]**.
- **The differentiator is unused.** Six years as a geologist and mud-logging engineer, followed by software for oil & gas field operations, is a rare domain combination. Today it shows up only as two "domain" jobs at the bottom of the CV **[heuristic]**.

### 2.2 Case Study & Storytelling

The benchmark is NN/g's portfolio case-study model: problem, role, process, outcome, constraints, impact, learning, with "3–5 projects as detailed case studies". It was written for UX portfolios, but the structure transfers to engineering work **[evidence, adapted]**. For resume bullets, Laszlo Bock (then Google SVP People Operations) proposed "Accomplished [X] as measured by [Y] by doing [Z]" **[evidence, personal post]**.

**What works**
- Real, specific numbers exist: 30 min → 1.5 s, 90 → 15 min, 1–3 h → minutes, 500+ users. The arithmetic holds (1,800 s ÷ 1.5 s = 1,200×; 90 ÷ 15 = 6×).
- Recognitions name the issuer and give a citation (Chevron SDP Challenge Coin, TCO certificates). That is third-party proof and the strongest credibility asset on the site.
- One side project links to a public repo, and another has a live URL (geoexploration.kz).

**What hurts**

| Entry | Problem | Process | Role | Trade-offs | Measured impact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| TA Pro & TO Notes | Missing (why did it take 30 min?) | One clause ("query tuning and … caching") | Contradictory (Lead vs Senior) | Missing (offline caching vs freshness?) | Number given; method and baseline not given |
| TEA-RECS & VISI | Missing | Lists libraries, not decisions | "Full-Stack Developer" vs CV "Software Developer", `roleType: frontend` | Missing | The CI/CD number is about the pipeline, not the product. "Recognized by TCO" is the only outcome. |
| Prices Monitor | Implicit | Good (cron, Release-metadata state) | Clear | Implied (zero cost vs GitHub limits) | "Zero-cost" only. No users or uptime. |
| GeoExploration | Missing (client need?) | Stack only | Two titles in one ("Frontend Architect & Full-Stack Developer") | Missing | "High-performance" with no number |

- **Unsupported or inflated claims:** "1200x Latency Reduction" (metric) vs "1200x query latency reduction" (project), which are different things. "Zero Data Loss & Offline Resilience". "100% data fidelity in WebSQL to IndexedDB migration". "Verified Key Outcomes" (`metrics.subtitle`). The RU/KK footer claims *"100% совместимость с ATS"* / *"ATS сәйкестігі 100%"*. The two enterprise projects have no artefact (diagram, screenshot, write-up) that would let a reader check them. NN/g's credibility factors include "Comprehensive, Correct, and Current" and "Connected to the Rest of the Web" **[evidence]**.
- **Filler ("water") to cut:**
  - `experience[3].achievements[2]`: *"Developed rigorous data analysis, risk mitigation, and industrial telemetry verification skills that now underpin robust software engineering practices."*
  - `experience[2].achievements[2]`: *"Participated in frontend architecture, performance profiling, and code modularization decisions."*
  - `experience[0].achievements[4]`: *"Contributed to Chevron internal TypeScript MSAL authentication libraries and distributed developer toolchains."* (contributed what?)
  - `experience[1].achievements[4]`: *"…significantly lowering Azure Blob Storage expenditure."* (gives no number)
  - **Repeated text:** `metrics[*].details` repeats `experience[0..1].achievements` almost word for word, so the Overview and CV say the same sentences twice.
- **Inconsistent units:** "30m" can be read as metres or minutes. "WebSQL ➔ Dexie" is in a metrics row but is a migration, not a metric.

### 2.3 Information Architecture & Navigation

**What works**
- Two pages, two nav items, a route-preserving language switcher, a skip link and one banner (#0011). It is simple and predictable.
- The CV page follows a standard resume order (summary → skills → experience → honors → certs → education → languages). Ladders' top-performing resumes have "simple layouts with clear section headers" and "bolded job titles and bulleted accomplishments" **[evidence]**.

**What hurts**
- **Projects are the deepest section on the Overview.** The order is hero → metrics → a 30-bullet skills matrix → projects. On mobile, the skills cards alone are ≈1,000 px. Recruiters reach projects last, or never **[heuristic, supported by NN/g scanning data]**.
- **No anchor or nav entry for Projects or Contact.** Brittany Chiang's site, for example, anchors About / Experience / Projects.
- **No project depth.** There are no detail pages, so the site cannot show *how* the work was done. That is the main reason to have a portfolio instead of a PDF **[heuristic]**.
- **"PDF" is not a PDF (in the audited build).** The header button labelled "PDF" opens the print dialog. On mobile it is hidden, and printing from a phone takes several steps. [ADR 0001](../adr/0001-prebuilt-static-pdf-cv.md), accepted while this audit was running, already fixes this with prebuilt *PDF CV* files under `public/cv/` and `<a download>` links. This audit agrees with that decision.
- **Nav labels.** "Overview" says nothing about what is on the page. The GLOSSARY now uses *CV Page* and says to avoid "Timeline Page", so the nav label "CV Timeline" (`i18n.ts` `nav.cv`) should become "CV" to match.

### 2.4 UX & Visual Hierarchy

**What works**
- A consistent token system, WCAG-checked contrast, reduced-motion support, no reflow at 320–414 px, and a print budget of 1/2 pages (#0011).
- Restrained colour and no decorative imagery. NN/g says users ignore decorative images and attend to "information-carrying images" **[evidence]**.

**What hurts**
- **Small type for the core content.** Achievements, project summaries and metric details are 12 px, and tech tags are 10 px. No WCAG criterion sets a minimum size, but this is the text recruiters need to read **[heuristic]**.
- **Section headings have the least visual weight on the page.** `text-sm font-mono uppercase text-content-tertiary` (grey, small, mono) sits under bold 24 px metric numbers. The structure exists but does not show **[heuristic, NN/g visual-hierarchy guidance]**.
- **"Dashboard / SaaS landing" styling.** A pulsing green status pill, mono uppercase labels everywhere, green "Impact:" chips, and "ENTERPRISE" badges together read like a product template more than a person. This is where the "cheap ad" impression comes from. Each element is fine alone; the combination is the problem **[heuristic]**.
- **No photo.** In NN/g eyetracking, users spent "10% more time viewing the portrait photos" than the bio text on a real team page (2010) **[evidence]**. Whether to include one is an owner decision: CIS CV norms commonly include a photo, while some Western recruiters prefer none **[heuristic]**.
- **No "last updated" date.** "Current" is one of NN/g's four credibility factors **[evidence]**.
- **Footer text is aimed at developers, not recruiters.** *"Semantic HTML5 & ATS-Engine Compliant"* means nothing to a recruiter, and the RU/KK versions make an unprovable "100%" claim.

### 2.5 Competitive Benchmarking

All five sites were fetched on 2026-10-09.

| Site | Pattern | Missing here |
| :--- | :--- | :--- |
| [brittanychiang.com](https://brittanychiang.com/) | One-line first-person value headline: *"I build accessible, pixel-perfect experiences for the web."* Anchor nav (About / Experience / Projects). Linked employers. Project stats (*"100k+ Installs"*). A "View Full Résumé" PDF link. | Value line, anchor nav, project outcome stats, downloadable PDF |
| [leerob.com](https://leerob.com/) | Short first-person bio (*"I'm an engineer and writer."*), then writing grouped by topic | First-person voice, public writing as evidence |
| [andrewlock.net](https://andrewlock.net/about/) (.NET) | Long-running ASP.NET Core blog, plus the book *ASP.NET Core in Action* (Manning) | Public, checkable .NET expertise (posts or talks) |
| [ardalis.com](https://ardalis.com/) (.NET) | A role line made of credentials (*"Software Architect • Microsoft MVP • Clean Code Advocate"*), one CTA (*"Work With Me →"*), a conference photo | One CTA, a real photo, third-party credentials up front |
| [joshwcomeau.com/about-josh](https://www.joshwcomeau.com/about-josh/) | A career story (*"I started building on the web in 2007 and never stopped"*); OSS downloads quantified (*"~600,000 times per month"*) | Career narrative (geologist → engineer), quantified public work |

The common patterns are a first-person one-liner, a single CTA, checkable public artefacts (writing, OSS, talks, books), and a person behind the page (photo or story). This site has none of the four. That is an observation from these 5 sites, not an industry statistic.

---

## 3. Search Engine Indexing (Google, Bing, Yandex)

### 3.1 Current state vs required

| Requirement | Current | Source |
| :--- | :--- | :--- |
| Site reachable | **404**: not deployed (#0008 deferred) | Prerequisite for everything below |
| Self-referencing hreflang that matches canonical | Mismatch on `/cv/` (`…/cv/` vs `…/cv`) → #0012 | Google: "Each language version must list itself as well as all other language versions." Google: canonical must be "in the same language" when using hreflang |
| Sitemap + robots.txt `Sitemap:` line | Missing → #0012 | Google sitemaps; Astro `@astrojs/sitemap` (`i18n` option) |
| hreflang via HTML (not sitemap) for Yandex | HTML links present (fix the mismatch) | Yandex: "Yandex no longer supports using the Sitemap file for language versions." |
| `ProfilePage.mainEntity` | **Uses `about` only.** Google lists `mainEntity` as *required* | Google ProfilePage docs |
| `Person.alternateName` | One value (`Аңсаған Ислямғалиев`). Missing "Ansagan Islamgali" (git, LICENSE) | schema.org `alternateName`: "An alias for the item" |
| `ProfilePage.dateModified` | Missing | Google ProfilePage (recommended) |
| Localized `jobTitle` / correct locality | English `jobTitle` on RU/KK pages; `addressLocality: 'Atyrau'` vs data "Astana & Atyrau" (D10: Astana) | Readiness review S6 / rec 21 (now in R-M3) |
| Unique, page-specific descriptions | CV descriptions are 524–559 chars (the full summary) | Google: no length limit, but snippets are "truncated … to fit the device width", and descriptions should summarize the page |
| Microdata on `<body itemscope Person>` alongside JSON-LD `Person` | Two separate Person entities (microdata has no `itemid`) | **[heuristic]** Validate in the Rich Results Test and drop one |
| Search Console ownership | None | Google: HTML-tag method works for a URL-prefix property; DNS is "required only for Domain property" |
| Bing Webmaster Tools | None | Bing: import verified sites from Search Console |
| IndexNow (Bing, Yandex and other participants) | None | IndexNow: submissions are shared across participating engines; key file at site root |
| Yandex Webmaster | None | Yandex: HTML file, `yandex-verification` meta tag, or DNS TXT |
| Bing language signal | `<html lang>` set per locale ✓ | Bing (2011 blog, dated): a `content-language` meta tag "will always supersede" `<html lang>`. Optional. |
| `og:image`, favicon, 404 | Missing → #0012 | — |
| Core Web Vitals | **Not measured** (site not live) | web.dev "good": LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75. Run PageSpeed Insights after launch. The 4 Google Font families are the main risk (readiness rec 20). |

### 3.2 Launch checklist (in order)

1. [ ] Decide #0008 and deploy (#0007).
2. [ ] Complete #0012 (trailing slash, sitemap with `i18n`, robots.txt, 404, favicon, `og:image`).
3. [ ] JSON-LD in `src/layouts/BaseLayout.astro`, built from `getCandidateProfile(locale)`: `ProfilePage.mainEntity: { '@id': …/#person }`, `dateModified`, `Person.name: 'Ansagan Islamgaliev'` (D4), `Person.alternateName: ['Angsagan Islyamgaliyev', 'Ansagan Islamgali', 'Ансаган Исламгалиев', 'Аңсаған Исламғалиев', 'Аңсаған Ислямғалиев']` (D8), `addressLocality: 'Astana'` (D10), `telephone` kept (D9), localized `jobTitle`, `description`, `knowsAbout`, and `image` if a photo is added.
4. [ ] Remove the `itemscope itemtype="https://schema.org/Person"` microdata from `<body>` (or give it `itemid` = `…/#person`). Validate with the Rich Results Test.
5. [ ] Short CV descriptions (see R-L7).
6. [ ] Google Search Console: URL-prefix property, HTML-tag verification in `BaseLayout.astro`, submit `sitemap-index.xml`, inspect `/`, `/cv/`, `/ru/`, `/kk/`, then check with `site:` (Google: changes take "a few hours" to "several months").
7. [ ] Bing Webmaster Tools: *Import* from Search Console (no extra verification).
8. [ ] *(Optional after D1, which targets foreign companies)* Yandex Webmaster: `yandex-verification` meta tag. Expect pages "within two weeks" after crawl. IndexNow (step 9) already notifies Yandex, so this is only needed for Yandex's reporting.
9. [ ] IndexNow: put a key file in `public/` and add a post-deploy `curl` step to the workflow that submits changed URLs to `api.indexnow.org` (reaches Bing and Yandex).
10. [ ] Off-site links: put the live URL in the LinkedIn *Website* field and the GitHub profile *Website* field. The README already links it. Make the LinkedIn display name match "Ansagan Islamgaliev" (D4) so a recruiter's search for the name finds the same person on both sites **[heuristic]**.

---

## 4. Actionable Recommendations

*Revised 2026-10-10 for the [Owner Decisions](#owner-decisions-2026-10-10).* Impact ratings: **H** = high, **M** = medium, **L** = low. Paths are relative to the repo root. Text in `[brackets]` is for the owner to fill in, because the facts are not in the repo. The English copy is given here; RU/KK get the same edits in `cv-ru.json` / `cv-kk.json` and the matching `i18n.ts` keys.

### Low effort (copy or config, under 1 hour each)

| # | Impact | Change | Where |
| :--- | :--- | :--- | :--- |
| R-L1 | H | **Owner decision on #0008** (hosting topology). Unblocks #0007, #0012 and all of §3. | `docs/wayfinder/tickets/0008-*` |
| R-L2 | H | **Pitch (D1, D2).** Before: *"Specializing in modernizing legacy enterprise systems into high-performance ASP.NET Core & React applications."* After: *"I turn legacy enterprise applications into fast, maintainable .NET and React systems, currently for Chevron and Tengizchevroil."* Industry-neutral, first person, with named employers as the proof. This also becomes the Overview meta description. | `src/data/cv-en.json` → `elevatorPitch` |
| R-L3 | H | **Remove the summary paragraph from the Overview hero** (keep it on the CV). | `src/components/overview/OverviewContent.astro`, the `<p class="print-hide …">{profile.summary}</p>` |
| R-L4 | H | **One primary CTA.** Primary: *"Download PDF CV"* (the existing `cta.downloadPdf` key, linking the ADR 0001 file; R-M2), or "Email me" until R-M2 ships. Make *"View Career Timeline"* a text link reading *"Full CV →"*. Change *"Contact Me"* to *"Email me"*. Change nav *"CV Timeline"* to *"CV"* (GLOSSARY: avoid "Timeline"). | `OverviewContent.astro` actions block. `src/utils/i18n.ts` → `cta.contact`, `cta.viewTimeline`, `nav.cv` |
| R-L5 | H | **Align titles.** The same role is *"Lead Software Engineer"* (`projects[0].role`) and *"Senior Software Developer"* (`experience[0].roleTitle`), and the header says *"Senior Full-Stack .NET & React Engineer"*. Per D7, set both `experience[0].roleTitle` and `projects[0].role` to *"Senior Full-Stack Developer"* ("Lead" is dropped). The header `title` stays as the broader positioning. The same mismatch exists for Norsec Delta (`experience[1].roleTitle` *"Software Developer"*, `roleType: frontend` vs `projects[1].role` *"Full-Stack Developer"*) and GeoExploration (*"Frontend Architect & Full-Stack Developer"*); LinkedIn settles Norsec as "Software Developer" in both places, with `roleType: fullstack` (§4.2). GeoExploration still waits on the owner (#0013). | `cv-*.json` → `projects[0..1,3].role`, `experience[0..1].roleTitle` |
| R-L6 | H | **Remove claims nothing can back up (D2, D3).** Delete `metrics.subtitle` *"Verified Key Outcomes"*. Delete `footer.atsCompliant` (all three locales, including the RU/KK "100%"). Remove "Zero Data Loss" and "zero data loss" (`metrics[3].impact`, `experience[0].achievements[1]`, `projects[0].impact`) and *"100% data fidelity…"* (`experience[0].keyMetrics[2]`). | `src/utils/i18n.ts`; `cv-*.json` |
| R-L7 | M | **CV meta description** (readiness rec 22, not ticketed). Before: the full 547-char summary. After: *"CV of Ansagan Islamgaliev, senior .NET and React engineer: 4+ years building enterprise software for Chevron and Tengizchevroil. PDF available."* | `src/pages/cv.astro` `description=` (+ `ru/`, `kk/`), or a new `cvDescription` key in the dataset |
| R-L8 | H | **Metrics → highlights without time figures (D2).** Rename the section and rewrite each card (exact copy in [§4.1](#41-copy-without-time-figures-d2)). The `headline` becomes the area of work, and `impact` becomes a short plain outcome. | `cv-*.json` → `metrics[*]`; `i18n.ts` → `metrics.title` |
| R-L9 | M | **Plain section headings.** *"Enterprise Impact Metrics"* → *"Highlights"*; *"Architectural Competencies & Tech Stack"* → *"Tech stack"*; *"Featured Engineering Projects"* / *"Mission-Critical Systems"* → *"Projects"* (no subtitle). | `src/utils/i18n.ts` → `metrics.title`, `skills.title`, `projects.title`, `projects.subtitle` |
| R-L10 | M | **Reorder the Overview**: hero → Projects → Highlights → Tech stack. Add `id="projects"` and a nav item "Projects" → `/#projects`. | `OverviewContent.astro`, `src/components/layout/Header.astro` |
| R-L11 | M | **One availability string (D1).** Before: *"Open to long-term contract engagements & remote roles"* / *"Available for enterprise contracts & senior roles"*. After (D6, D10): *"Looking for a long-term remote role with an international team · UTC+5"*, and `contact.location` → *"Astana, Kazakhstan"*. | `cv-*.json` → `contact.availability`, `contact.location`; `i18n.ts` → `meta.availability` |
| R-L12 | M | **Cut filler bullets**: delete `experience[3].achievements[2]` and `experience[2].achievements[2]`. Make `experience[0].achievements[4]` specific (*"Added [feature] to Chevron's internal TypeScript MSAL library"*) or delete it. In `experience[1].achievements[4]`, drop "significantly" or give a number. | `cv-*.json` → `experience[*].achievements` |
| R-L13 | M | **Rewrite the time-based bullets and summary (D2).** Exact copy in [§4.1](#41-copy-without-time-figures-d2). | `cv-*.json` → `summary`, `experience[0..1]`, `projects[0..1]` |
| R-L14 | L | **Same noun for the user base**: use "500+ field staff" everywhere (D11; currently "users", "field workers" and "turnaround field engineers"). | `cv-*.json` → `metrics[3].details`, `experience[0].achievements[1]`, `projects[0].metrics[2]` |
| R-L15 | L | Add a visible **"Updated [Month YYYY]"** line in the footer, from build time or a dataset field. | `src/components/layout/Footer.astro` |
| R-L16 | H | **Link real credentials (D3).** Every `verificationUrl` currently points to an issuer homepage (`https://www.credly.com/`, `https://htmlacademy.ru/`, `https://www.hackerrank.com/certificates/`). Replace each with the URL behind **"Show credential"** on the matching LinkedIn certification entry. Update `credentialId` too if LinkedIn shows a different one than `SAFE-883921`. If an entry has no credential URL, link `https://www.linkedin.com/in/ansaganie/details/certifications/` instead. | `cv-*.json` → `certifications[*].verificationUrl`, `credentialId` |
| R-L17 | H | **Name: "Ansagan Islamgaliev" (D4).** `name` in `cv-en.json` (and the Latin form wherever RU/KK show one); the `<title>` and OG title follow from it. Also update `README.md` and `LICENSE`. RU `name` → *"Ансаган Исламгалиев"*, KK `name` → *"Аңсаған Исламғалиев"* (D8). | `cv-*.json` → `name`; `README.md`; `LICENSE` |

### 4.1 Copy without time figures (D2)

The Prices Monitor "30-minute cron" stays: it describes a schedule, not a performance claim.

**`summary`**
- Before: *"Senior Full-Stack Software Engineer with 4+ years … Demonstrated success in eliminating performance bottlenecks: slashing critical screen load times from 30 minutes to 1.5 seconds, migrating legacy storage to offline IndexedDB PWAs, and accelerating CI/CD deployment pipelines by 6x."*
- After: *"Senior full-stack engineer with 4+ years building enterprise software in C#, .NET 8, ASP.NET Core, React and Azure, currently for Chevron and Tengizchevroil. I modernize legacy applications: moving .NET Framework services to .NET 8, fixing slow screens, making web apps work offline for 500+ field staff, and speeding up release pipelines. Before software, I spent 6 years in oil & gas field operations."*

**`metrics[*]`** (section title *"Highlights"*, no subtitle)

| id | `headline` | `label` | `impact` | `details` |
| :--- | :--- | :--- | :--- | :--- |
| `page-load-optimization` | Performance | Field-team screens | Slow screens made fast | Tuned .NET 8 / EF Core 8 queries and added IndexedDB caching for turnaround field teams. |
| `cicd-acceleration` | Delivery | Release pipelines | Faster, safer releases | Shortened Azure DevOps release pipelines and added automated PR validation and SonarQube scans. |
| `erp-sync-acceleration` | Integration | Oracle Primavera sync | Message-based sync | Rebuilt the Primavera integration on Azure Service Bus, Logic Apps and WebJobs. |
| `offline-pwa-storage` | Offline-first | WebSQL → IndexedDB | 500+ field staff | Moved the PWA's browser storage from deprecated WebSQL to IndexedDB (Dexie.js) so the app works without a connection. |

**`experience[0]`** (Tengizchevroil, Jan 2024 – Present)
- `keyMetrics`: replace all three with *"500+ field staff on the offline PWA"*, *".NET Framework 4.8 → .NET 8 migration"*, *"Oracle Primavera integration on Azure Service Bus"*.
- `achievements[0]`: *"Slashed critical operational screen load latency from ~30 minutes to 1.5 seconds…"* → *"Fixed the slowest operational screens used by turnaround field teams by tuning .NET 8 / EF Core 8 queries and caching data client-side in IndexedDB."*
- `achievements[1]`: *"…using Dexie.js with zero data loss for 500+ users."* → *"Added offline support to the field PWA and moved its browser storage from deprecated WebSQL to IndexedDB (Dexie.js) for 500+ field staff."*
- `achievements[3]`: *"…cutting sync delay from 1–3 hours to minutes."* → *"Rebuilt the Oracle Primavera integration on Azure Service Bus, Logic Apps and WebJobs, replacing the old batch sync with messaging."*

**`experience[1]`** (Tengizchevroil, Sep 2022 – Jan 2024)
- `keyMetrics[0]`: delete *"90m ➔ 15m CI/CD deployment acceleration"*.
- `achievements[3]`: *"…reducing release turnaround from ~90 minutes to ~15 minutes."* → *"Sped up .NET web app release pipelines on Azure DevOps and automated PR validation."*

**`projects[0]`** (TA Pro & TO Notes)
- `impact`: *"1200x query latency reduction, zero data loss offline persistence"* → *"Offline-first PWA for 500+ field staff; Chevron SDP Challenge Coin"*. The honor links the project to third-party recognition that is already on the CV.
- `metrics`: *"30m ➔ 1.5s load time"*, *"1–3h ➔ minutes ERP sync"*, *"500+ field workers"* → *"500+ field staff"*, *".NET 8 migration"*, *"Offline-first PWA"*.

**`projects[1]`** (TEA-RECS & VISI)
- `metrics[0]`: *"90m ➔ 15m CI/CD speedup"* → delete. *"Dual-axis virtualized data grid"* stays.

### 4.2 LinkedIn certifications vs the dataset (read 2026-10-10)

Read from `linkedin.com/in/ansaganie/details/certifications/` in a session where the owner was signed in. The "Show credential" targets are unwrapped from LinkedIn's `safety/go` redirect.

| # | LinkedIn entry | Issuer | Issued | Credential ID | Credential Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | SAFe 6 Practitioner | Scaled Agile (training by Agile Certification Academy) | Jul 2024 | 49406639-9646 | https://community.scaledagile.com/apex/PrintAchievement?aid=a0t6T00000O8QH2QAN&aaid=a0rQo00000xibl3IAA |
| 2 | React. Development of Complex Front-end Applications | HTML Academy | Sep 2021 | 1637434380 | https://assets.htmlacademy.ru/certificates/intensive/217/1704573.pdf?1637434380 |
| 3 | JavaScript. Architecture of Front-end Applications | HTML Academy | Jul 2021 | 1631417950 | https://assets.htmlacademy.ru/certificates/intensive/211/1704573.pdf?1631417950 |
| 4 | JavaScript. Professional Development of Web Interfaces | HTML Academy | May 2021 | 1626350448 | https://assets.htmlacademy.ru/certificates/intensive/205/1704573.pdf?1626350448 |
| 5 | Java Web Developer Nanodegree | Udacity | Apr 2021 | EWLYPQGY | https://confirm.udacity.com/EWLYPQGY |
| 6 | JavaScript (Intermediate) | HackerRank | Dec 2023 | dd99e082ab79 | https://www.hackerrank.com/certificates/dd99e082ab79 |
| 7 | Frontend Developer (React) | HackerRank | Nov 2023 | (none) | https://www.hackerrank.com/certificates/1f868b72177c |

**The dataset does not match LinkedIn.** This confirms the readiness review's finding C1.

| Dataset entry (`certifications[*]`) | What LinkedIn shows |
| :--- | :--- |
| SAFe 6 Practitioner, **2023-05**, ID **SAFE-883921** | #1: issued **Jul 2024**, ID **49406639-9646**. The site's date and ID are wrong. |
| "Professional React Developer (Profession)", HTML Academy, **2022-05** | Closest is #2 "React. Development of Complex Front-end Applications", **Sep 2021**. The title and date differ. |
| "JavaScript: Architecture of Front-end Applications", **2021-12** | #3, issued **Jul 2021**. The date differs. |
| "Problem Solving (Advanced) & C# Certification", HackerRank, 2023-08 | **Not on LinkedIn.** The HackerRank entries are #6 JavaScript (Intermediate) and #7 Frontend Developer (React). |

LinkedIn entries #4, #5, #6 and #7 are not on the site at all. R-L16 therefore becomes: **replace `certifications[*]` with entries taken from this table** (title, issuer, date, ID and URL exactly as LinkedIn shows them). Which of the seven to show is decision D12.

**Other mismatches between LinkedIn and the site**, found in the same session at `/details/experience/`:
- **Current title:** LinkedIn says "Senior Software Developer". D7 says "Senior Full-Stack Developer (Software Development Engineer)". LinkedIn should be updated to match D7 (owner action, §3.2 step 10).
- **Norsec Delta:** LinkedIn says "Software Developer", with .NET 6 (C#) alongside React. This settles R-L5 for `experience[1]`: the title "Software Developer" in both places, and `roleType: fullstack`.
- **Aviata start date:** LinkedIn says **Jan 2022**, the dataset says **Feb 2022** (`experience[2].period`). LinkedIn's date overlaps the KPO end date (Feb 2022). See open question 2.
- **Display name:** LinkedIn still shows "Angsagan Islyamgaliyev" (§3.2 step 10).

### Medium effort (half a day to 2 days)

| # | Impact | Change | Where |
| :--- | :--- | :--- | :--- |
| R-M2 | H | **Implement [ADR 0001](../adr/0001-prebuilt-static-pdf-cv.md)** (prebuilt PDF CV in `public/cv/`, `npm run generate:pdf`). Three additions: (a) make the header download link **visible below 640 px** (the current print button is `hidden sm:inline-flex`); (b) when using `page.pdf()`, honour the #0011 note on print-media emulation; (c) name the files **`Ansagan_Islamgaliev_CV.pdf`**, `…_CV_RU.pdf`, `…_CV_KK.pdf` (D4), and update the ADR's Consequences section to match. | `Header.astro`, `OverviewContent.astro`, `CvContent.astro`, `public/cv/`, `docs/adr/0001-*` |
| R-M3 | H | **JSON-LD rebuild** (§3.2 steps 3–4): `mainEntity`, `name` "Ansagan Islamgaliev" plus `alternateName[]` with the old spellings, `dateModified`, localized `jobTitle`, `addressLocality: 'Astana'` (D10), all built from the dataset. Remove the microdata on `<body>`. | `src/layouts/BaseLayout.astro` |
| R-M4 | M | **Readability pass**: body copy `text-xs` → `text-sm` (12 → 14 px) for metric details, project summaries and CV achievements; tags 10 → 12 px. Headings: `text-content-primary`, sans, `text-base font-semibold` instead of tertiary mono. Re-measure the print budget afterwards (print has its own sizes in `print.css`). | `OverviewContent.astro`, `CvContent.astro`, `src/styles/global.css` |
| R-M5 | M | **Tone down the template feel**: remove the pulse dot (header and hero), drop the "ENTERPRISE" badges, and replace the green "Impact:" chips with plain bold text **[heuristic]**. Without time figures, the large mono metric headlines no longer have numbers to carry, so set the highlight cards in the same type as the rest of the page. | `Header.astro`, `OverviewContent.astro` |
| R-M6 | M | **Compress the Overview skills** to one line per group, as the CV does (`CvContent.astro` skills list). That removes ≈1,000 px on mobile. | `OverviewContent.astro` competencies section |
| R-M7 | M | **Search engine registration + IndexNow** (§3.2 steps 6–9; Yandex optional per D1). | `BaseLayout.astro` (verification metas), `public/`, deploy workflow |

### Postponed until the content grilling session

These need new content, which D5 postpones. They stay here as input for that session.

| # | Impact | Change |
| :--- | :--- | :--- |
| R-M1 | H | **Case-study fields** on project cards: optional `problem`, `approach`, `tradeoffs`, `result` in `projectSchema`, rendered as a short block or `<details>`. After D2, `result` describes the outcome without time figures. |
| R-H1 | H | **Two case-study pages** (TA Pro, TEA-RECS), 400–700 words each, with an NDA-safe architecture diagram (unused `architectureDiagram` field). This changes the "strictly 2 pages" scope in PROJECT.md. |
| R-H2 | M | **Career narrative / About block**: 3–4 first-person sentences on moving from field telemetry to software, plus an optional photo. For an international, industry-neutral audience, this is where the oil & gas background belongs **[heuristic + NN/g photo evidence]**. |
| R-H3 | M | **Public evidence of .NET expertise**: 2–3 technical write-ups (e.g. WebSQL → IndexedDB with Dexie, EF6 → EF Core 8 migration). Blogging is out of scope in the Map; posting on dev.to or LinkedIn and linking the posts avoids that scope change. |

---

## 5. Follow-up Questions

### Answered 2026-10-10

See [Owner Decisions](#owner-decisions-2026-10-10) D1–D5.

### Answered 2026-10-10 (second round)

- **D6: Remote only.** R-L11 becomes: *"Looking for a long-term remote role with an international team · UTC+5"*.
- **D7: Title at Tengizchevroil / AtyrauTechInvest: "Senior Full-Stack Developer (Software Development Engineer)".** R-L5: `experience[0].roleTitle` → *"Senior Full-Stack Developer"*, and `projects[0].role` → *"Senior Full-Stack Developer"*. The parenthetical *"Software Development Engineer"* can go in `experience[0].summary` or stay off the page. Either way, "Lead" is dropped.
- **D8: Cyrillic names.** RU: *"Ансаган Исламгалиев"*. KK: *"Аңсаған Исламғалиев"* (the owner wrote the surname in capitals, which is the Kazakh document convention; on the page it follows the same casing as the other locales). The JSON-LD `alternateName` gets both, plus the old *"Аңсаған Ислямғалиев"*. This closes #0009 item 3.

### Answered 2026-10-10 (grilling)

- **D9: Keep the phone number.** See the Owner Decisions table.
- **D10: Location is Astana only.**
- **D11: "500+ field staff".**
- **Hosting (#0008):** the owner is deciding it on 2026-10-10. The recommendation is option A (custom domain `ansagan.net` on this repo).
- **Credential URLs (R-L16):** read from the owner's LinkedIn in a signed-in browser session, not typed in by hand.

- **Norsec Delta title and scope**: taken from LinkedIn ("Software Developer", full-stack). See [§4.2](#42-linkedin-certifications-vs-the-dataset-read-2026-10-10).

- **D12: Certifications shown.** Five entries from [§4.2](#42-linkedin-certifications-vs-the-dataset-read-2026-10-10): #1 SAFe 6 Practitioner, #7 HackerRank Frontend Developer (React), #6 HackerRank JavaScript (Intermediate), #2 HTML Academy React, and #3 HTML Academy JavaScript Architecture. Each uses its LinkedIn title, date, ID and Credential Link exactly. #4 (introductory course) and #5 (Java Nanodegree, outside the positioning) are left off.
- **D13: Aviata start date is Jan 2022**, matching LinkedIn. The one-month overlap with KPO is kept.
- **D14: GeoExploration role is "Sole developer".**

### Still open

None. Hosting (#0008) is on the owner's side.

---

## Sources

**Google Search Central**
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Snippets / meta description: https://developers.google.com/search/docs/appearance/snippet
- Localized versions (hreflang): https://developers.google.com/search/docs/specialty/international/localized-versions
- Canonicalization: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Build and submit a sitemap: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- robots.txt introduction: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- ProfilePage structured data: https://developers.google.com/search/docs/appearance/structured-data/profile-page
- Search Console ownership verification: https://support.google.com/webmasters/answer/9008080?hl=en
- Google Careers, apply for a job (resume parser note): https://support.google.com/googlecareers/answer/6095391?hl=en

**Bing / IndexNow / Yandex**
- Bing Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a (JS-rendered; content taken from search results)
- Bing: Import sites from Search Console: https://blogs.bing.com/webmaster/september-2019/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools
- Bing: How to tell Bing your website's country and language (2011, dated): https://blogs.bing.com/webmaster/March-2011/How-To-Tell-Bing-Your-Website-s-Country-and-Langua
- Bing IndexNow, get started: https://www.bing.com/indexnow/getstarted
- IndexNow documentation: https://indexnow.org/documentation
- Yandex: Indexing localized pages: https://yandex.com/support/webmaster/en/yandex-indexing/locale-pages
- Yandex: Adding a site to search: https://yandex.com/support/webmaster/en/robot-workings/robot
- Yandex: Verifying site rights: https://yandex.com/support/webmaster/en/service/rights
- Yandex: IndexNow support: https://yandex.com/support/webmaster/en/indexing-options/index-now

**schema.org / Astro**
- schema.org Person: https://schema.org/Person
- schema.org ProfilePage: https://schema.org/ProfilePage
- Astro @astrojs/sitemap: https://docs.astro.build/en/guides/integrations-guide/sitemap/
- Astro Internationalization routing: https://docs.astro.build/en/guides/internationalization/

**UX research / accessibility / performance**
- NN/g, How Long Do Users Stay on Web Pages?: https://www.nngroup.com/articles/how-long-do-users-stay-on-web-pages/
- NN/g, How Users Read on the Web (1997): https://www.nngroup.com/articles/how-users-read-on-the-web/
- NN/g, F-Shaped Pattern of Reading (2017): https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- NN/g, First Impressions Matter: https://www.nngroup.com/articles/first-impressions-human-automaticity/
- Lindgaard et al. (2006), *Attention web designers: You have 50 milliseconds…*, Behaviour & IT 25(2):115–126, doi:10.1080/01449290500330448: https://doi.org/10.1080/01449290500330448
- NN/g, 5 Steps to Creating a UX-Design Portfolio: https://www.nngroup.com/articles/ux-design-portfolios/
- NN/g, Trustworthiness in Web Design: 4 Credibility Factors (2016): https://www.nngroup.com/articles/trustworthy-design/
- NN/g, Photos as Web Content (2010): https://www.nngroup.com/articles/photos-as-web-content/
- WCAG 2.2 Understanding 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- web.dev, Web Vitals: https://web.dev/articles/vitals

**Recruiter behaviour**
- Ladders 2018 eye-tracking update (press release, first-party): https://www.prnewswire.com/news-releases/ladders-updates-popular-recruiter-eye-tracking-study-with-new-key-insights-on-how-job-seekers-can-improve-their-resumes-300744217.html
- Ladders original study PDF (returned 403 on 2026-10-09): https://www.theladders.com/static/images/basicSite/pdfs/TheLadders-EyeTracking-StudyC2.pdf
- Laszlo Bock, *My Personal Formula for a Winning Resume* (2014-09-29): https://www.linkedin.com/pulse/20140929001534-24454816-my-personal-formula-for-a-better-resume

**Benchmarked sites** (fetched 2026-10-09)
- https://brittanychiang.com/
- https://leerob.com/
- https://andrewlock.net/about/
- https://ardalis.com/
- https://www.joshwcomeau.com/about-josh/
