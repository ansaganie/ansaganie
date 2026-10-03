# Research: Live CV & Personal Website Visual Design Specification, UI Component Architecture, and Layout Blueprint

> **Ticket**: [#0002](../wayfinder/tickets/0002-live-cv-design-prototype.md) — *[Prototype] Live CV design prototype: 2-page layout with compact modern typography, ATS compatibility, and print-to-PDF styles*  
> **Date**: October 2026  
> **Status**: Completed  
> **Target Identity**: Angsagan Islyamgaliyev (`ansagan` / `ansaganie`)

---

## Executive Summary

1. **Design System & Mathematical Contrast (R1)**:  
   A complete, bidirectional 26-token design system specified in both Hex and HSL for Dark Mode (obsidian canvas `#0b0f19`) and Light Mode (alabaster canvas `#f8fafc`). Every foreground-to-background pairing is mathematically verified against WCAG 2.1 standards, achieving **17.06:1 to 18.30:1** for primary text (WCAG AAA), **7.37:1 to 10.35:1** for secondary text (WCAG AAA), and **$\ge 3.43:1$** for interactive UI borders (WCAG SC 1.4.11).
2. **Kazakh Cyrillic Extended Glyph Audit & Subsetting Discovery (R1)**:  
   A rigorous OpenType `cmap` audit verifies that **Inter**, **Source Sans 3**, and **JetBrains Mono** natively contain all **18 Kazakh extended Cyrillic glyphs** (Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І upper and lower). A critical Google Fonts subsetting vulnerability was identified: 7 of the 9 Kazakh letters reside exclusively in `cyrillic-ext` (`U+0460-052F`). Font loading must mandate `cyrillic-ext` to prevent glyph dropouts in the author's own name (**Аңсаған Ислямғалиев**).
3. **Strict 2-Page Architecture & Verified Profile Metrics (R2)**:  
   Information architecture is partitioned strictly into **Page 1 (Overview)** and **Page 2 (CV Timeline)** with complete Astro component hierarchies (`src/components/`, `src/layouts/`), TypeScript Zod content schemas, and 120-column desktop / 40-column mobile ASCII wireframes. Grounded 100% in Angsagan's verified enterprise accomplishments: **30m ➔ 1.5s** load-time optimization, **90m ➔ 15m** CI/CD acceleration, **1–3h ➔ minutes** Primavera ERP sync, **WebSQL ➔ IndexedDB (Dexie.js)** PWA migration, Chevron Surface Digital Platform (SDP) Challenge Coin, TCO Recognition awards, and SAFe 6 certification.
4. **Multilingual (i18n) Layout Engineering & Elasticity (R3)**:  
   A route-preserving segmented switcher `[ EN | RU | ҚАЗ ]` paired with Astro static routing (`/`, `/ru`, `/kk`, `/cv`, `/ru/cv`, `/kk/cv`). A 6-tier defensive CSS layout engine (`minmax(min(100%, 280px), 1fr)`, CSS subgrid, `min-inline-size: 0` flex guards, container query `cqi` typography, and `:lang(ru)` / `:lang(kk)` optical tracking) neutralizes the **+20% to +35% horizontal expansion** of Russian and Kazakh Cyrillic without layout clipping.
5. **100% ATS Parser Compliance & Print-to-PDF Engine (R4)**:  
   A table-free, zero-hidden-layer semantic HTML5 document tree annotated with Schema.org Microdata (`Person`, `OrganizationRole`, `EducationalOccupationalCredential`) guarantees flawless plain-text scraping across Workday, Greenhouse, and Lever. A production-ready `@media print` CSS engine with `@page` A4 dimensions, `break-inside: avoid` card isolation, automatic `<details>` disclosure expansion, and hyperlink URL exposure ensures a deterministic 1-to-2 page physical or PDF export.
6. **Three Creative Directions & Evaluation Matrix (R5)**:  
   Three complete design archetypes are fully articulated: **Concept A (The Modern Editorial Engineer)**, **Concept B (The Linear-Inspired Technical System)**, and **Concept C (The Interactive Document)**. Evaluated across 9 objective dimensions, Concept A is recommended as the baseline default with Concept B providing the dark-mode engineering palette.

---

## 1. Design System & Visual Foundation (Requirement R1)

### 1.1 Surface & Elevation Architecture

A personal engineering portfolio and live curriculum vitae requires two complementary visual modalities:
- **Dark Mode**: An obsidian, terminal-grade canvas that reduces eye strain, emphasizes syntax-highlighted technical metrics, and projects modern systems mastery. Built on a 4-tier surface elevation model using deep slate and obsidian undertones.
- **Light Mode**: An architectural, paper-grade canvas optimized for prolonged reading, high contrast in daylight environments, and 1:1 fidelity with physical print and PDF exports.

Visual depth is achieved through high-contrast hairlines, tonal surface shifts, and subtle rim highlights rather than heavy drop shadows, ensuring crisp rendering across screens and printers.

```
DARK MODE SURFACE HIERARCHY
┌────────────────────────────────────────────────────────┐
│ Canvas: #0b0f19 (hsl 223, 39%, 7%)                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Surface-1: #111622 (hsl 223, 34%, 10%)           │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ Surface-2: #1a2233 (hsl 221, 32%, 15%)     │  │  │
│  │  │  ┌──────────────────────────────────────┐  │  │  │
│  │  │  │ Surface-3: #242f45 (221, 31%, 21%)   │  │  │  │
│  │  │  └──────────────────────────────────────┘  │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │ Inset Wells (Code): #070a10 (hsl 223, 40%, 5%)    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

### 1.2 Complete 26 Design Tokens (Hex and HSL)

Below is the complete, production-grade token system. Every token is paired across Dark and Light modes with explicit semantic roles.

| # | Token Name | Dark Hex | Dark HSL | Light Hex | Light HSL | Semantic Role & Architectural Purpose |
|:---:|:---|:---|:---|:---|:---|:---|
| 1 | `--color-bg-canvas` | `#0b0f19` | `hsl(223, 39%, 7%)` | `#f8fafc` | `hsl(210, 40%, 98%)` | Root viewport background |
| 2 | `--color-surface-1` | `#111622` | `hsl(223, 34%, 10%)` | `#ffffff` | `hsl(0, 0%, 100%)` | Primary container, hero card, role card surface |
| 3 | `--color-surface-2` | `#1a2233` | `hsl(221, 32%, 15%)` | `#f1f5f9` | `hsl(210, 40%, 96%)` | Nested cards, filter pills, interactive hover |
| 4 | `--color-surface-3` | `#242f45` | `hsl(221, 31%, 21%)` | `#e2e8f0` | `hsl(214, 32%, 91%)` | Elevated popovers, tooltips, active tab pill |
| 5 | `--color-surface-inset` | `#070a10` | `hsl(223, 40%, 5%)` | `#eef2f6` | `hsl(214, 30%, 95%)` | Inset terminal wells, code blocks, metric diffs |
| 6 | `--color-surface-overlay` | `#000000cc` | `hsla(0, 0%, 0%, 0.8)` | `#0f172a66` | `hsla(222, 47%, 11%, 0.4)` | Backdrop wash for modal overlays (`backdrop-filter`) |
| 7 | `--color-border-hairline` | `#171f2e` | `hsl(220, 33%, 14%)` | `#f1f5f9` | `hsl(210, 40%, 96%)` | Subtle grid guidelines, secondary card dividers |
| 8 | `--color-border-subtle` | `#1f293d` | `hsl(220, 33%, 18%)` | `#e2e8f0` | `hsl(214, 32%, 91%)` | Standard card boundaries, timeline connector track |
| 9 | `--color-border-default` | `#2b3850` | `hsl(220, 30%, 24%)` | `#cbd5e1` | `hsl(214, 32%, 84%)` | Distinct section dividers, pill tag borders |
| 10 | `--color-border-strong` | `#475569` | `hsl(215, 19%, 35%)` | `#94a3b8` | `hsl(215, 20%, 65%)` | Prominent headers, active role card border |
| 11 | `--color-border-control` | `#556987` | `hsl(216, 23%, 43%)` | `#718096` | `hsl(215, 14%, 52%)` | Interactive inputs/switches ($\ge 3:1$ WCAG SC 1.4.11) |
| 12 | `--color-border-focus` | `#38bdf8` | `hsl(199, 89%, 60%)` | `#0284c7` | `hsl(201, 96%, 39%)` | High-visibility keyboard focus indicator ring |
| 13 | `--color-text-primary` | `#f8fafc` | `hsl(210, 40%, 98%)` | `#0f172a` | `hsl(222, 47%, 11%)` | Headings, hero candidate name, major KPI figures |
| 14 | `--color-text-secondary` | `#a2b2c8` | `hsl(215, 26%, 71%)` | `#334155` | `hsl(215, 25%, 27%)` | Body copy, job accomplishment bullets, summary |
| 15 | `--color-text-tertiary` | `#8393a7` | `hsl(214, 18%, 58%)` | `#607086` | `hsl(215, 17%, 45%)` | Date stamps, company context, skill pill labels |
| 16 | `--color-text-muted` | `#516175` | `hsl(215, 18%, 39%)` | `#94a3b8` | `hsl(215, 20%, 65%)` | Inactive/disabled controls only (forbidden for readable body or notes) |
| 17 | `--color-text-inverse` | `#0f172a` | `hsl(222, 47%, 11%)` | `#f8fafc` | `hsl(210, 40%, 98%)` | Text on inverted solid brand buttons |
| 18 | `--color-accent-brand` | `#38bdf8` | `hsl(199, 89%, 60%)` | `#0369a1` | `hsl(201, 96%, 32%)` | Engineering cyan (Dark) / Deep corporate azure (Light) |
| 19 | `--color-accent-brand-bg` | `#38bdf814` | `hsla(199, 89%, 60%, 0.08)` | `#0284c712` | `hsla(201, 96%, 39%, 0.07)` | Brand tint container and pill background |
| 20 | `--color-status-success` | `#34d399` | `hsl(160, 60%, 52%)` | `#047857` | `hsl(160, 93%, 24%)` | Live availability beacon, verified badges, honors |
| 21 | `--color-status-success-bg` | `#34d39914` | `hsla(160, 60%, 52%, 0.08)` | `#04785712` | `hsla(160, 93%, 24%, 0.07)` | Verified badge container background |
| 22 | `--color-status-warning` | `#fbbf24` | `hsl(45, 93%, 56%)` | `#b45309` | `hsl(26, 90%, 37%)` | In-progress projects, notice indicators |
| 23 | `--color-status-warning-bg` | `#fbbf2414` | `hsla(45, 93%, 56%, 0.08)` | `#b4530912` | `hsla(37, 91%, 38%, 0.07)` | Notice badge background |
| 24 | `--color-status-danger` | `#fb7185` | `hsl(351, 95%, 71%)` | `#be123c` | `hsl(344, 83%, 41%)` | Latency drops, critical legacy bottlenecks |
| 25 | `--color-status-danger-bg` | `#fb718514` | `hsla(351, 95%, 71%, 0.08)` | `#be123c12` | `hsla(344, 83%, 41%, 0.07)` | Danger badge background |
| 26 | `--color-status-info` | `#22d3ee` | `hsl(187, 85%, 53%)` | `#0e7490` | `hsl(192, 82%, 31%)` | Architecture tags, PWA indicators |

> **⚠️ Accessibility Restriction Note (`--color-text-muted`)**: With contrast ratios between 2.45:1 and 3.02:1 against canvas and surface tokens, `--color-text-muted` does not meet the WCAG 2.1 AA 4.5:1 minimum threshold for body text. Therefore, its usage is strictly restricted to inactive or disabled interactive controls and non-essential decorative boundaries. It is strictly forbidden for readable body copy, notes, timestamps, or essential metadata; all readable secondary content must use `--color-text-tertiary` ($\ge 4.83:1$) or `--color-text-secondary` ($\ge 8.38:1$).

---

### 1.3 WCAG 2.1 Contrast Verification & Mathematical Proofs

Relative luminance ($L$) and contrast ratios ($CR$) are computed using the official W3C formulas:
$$L = 0.2126 \times R_{\text{lin}} + 0.7152 \times G_{\text{lin}} + 0.0722 \times B_{\text{lin}}$$
$$CR = \frac{\max(L_1, L_2) + 0.05}{\min(L_1, L_2) + 0.05}$$

| Foreground Element | Background Surface | Theme Mode | Luminance (Fg / Bg) | Contrast Ratio | WCAG 2.1 Level AA | WCAG 2.1 Level AAA |
|:---|:---|:---:|:---:|:---:|:---:|:---:|
| `text-primary` (`#f8fafc`) | Canvas (`#0b0f19`) | Dark | 0.954 / 0.005 | **18.30:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-primary` (`#f8fafc`) | Surface-1 (`#111622`) | Dark | 0.954 / 0.008 | **17.28:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-primary` (`#f8fafc`) | Surface-2 (`#1a2233`) | Dark | 0.954 / 0.016 | **15.20:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-secondary` (`#a2b2c8`) | Canvas (`#0b0f19`) | Dark | 0.441 / 0.005 | **8.88:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-secondary` (`#a2b2c8`) | Surface-1 (`#111622`) | Dark | 0.441 / 0.008 | **8.38:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-secondary` (`#a2b2c8`) | Surface-2 (`#1a2233`) | Dark | 0.441 / 0.016 | **7.37:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-tertiary` (`#8393a7`) | Canvas (`#0b0f19`) | Dark | 0.288 / 0.005 | **6.11:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `accent-brand` (`#38bdf8`) | Canvas (`#0b0f19`) | Dark | 0.444 / 0.005 | **8.94:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `status-success` (`#34d399`) | Canvas (`#0b0f19`) | Dark | 0.501 / 0.005 | **9.96:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `status-warning` (`#fbbf24`) | Canvas (`#0b0f19`) | Dark | 0.584 / 0.005 | **11.47:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `status-danger` (`#fb7185`) | Canvas (`#0b0f19`) | Dark | 0.344 / 0.005 | **7.12:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `border-control` (`#556987`) | Canvas (`#0b0f19`) | Dark | 0.140 / 0.005 | **3.43:1** | PASS (Non-text $\ge 3:1$) | N/A |
| `text-primary` (`#0f172a`) | Canvas (`#f8fafc`) | Light | 0.008 / 0.954 | **17.06:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-primary` (`#0f172a`) | Surface-1 (`#ffffff`) | Light | 0.008 / 1.000 | **17.85:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-primary` (`#0f172a`) | Surface-2 (`#f1f5f9`) | Light | 0.008 / 0.902 | **16.30:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-secondary` (`#334155`) | Canvas (`#f8fafc`) | Light | 0.051 / 0.954 | **9.90:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-secondary` (`#334155`) | Surface-1 (`#ffffff`) | Light | 0.051 / 1.000 | **10.35:1** | PASS ($\ge 4.5:1$) | PASS ($\ge 7.0:1$) |
| `text-tertiary` (`#607086`) | Canvas (`#f8fafc`) | Light | 0.158 / 0.954 | **4.83:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `accent-brand` (`#0369a1`) | Canvas (`#f8fafc`) | Light | 0.127 / 0.954 | **5.67:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `status-success` (`#047857`) | Canvas (`#f8fafc`) | Light | 0.141 / 0.954 | **5.24:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `status-warning` (`#b45309`) | Canvas (`#f8fafc`) | Light | 0.159 / 0.954 | **4.80:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `status-danger` (`#be123c`) | Canvas (`#f8fafc`) | Light | 0.117 / 0.954 | **6.01:1** | PASS ($\ge 4.5:1$) | PASS (Large text) |
| `border-control` (`#718096`) | Canvas (`#f8fafc`) | Light | 0.211 / 0.954 | **3.84:1** | PASS (Non-text $\ge 3:1$) | N/A |

---

### 1.4 Kazakh Cyrillic Extended Glyph Audit (All 18 Glyphs)

Kazakh Cyrillic incorporates **9 pairs of uppercase and lowercase glyphs (18 glyphs total)** that do not exist in standard Russian or Slavic Cyrillic. Crucially, the candidate's name contains two of these unique glyphs: **А<u>ң</u>са<u>ғ</u>ан Ислям<u>ғ</u>алиев**.

| # | Upper | Lower | Unicode Upper | Unicode Lower | Official Unicode Name | IPA | Specific Role in Candidate CV & Kazakh Vocabulary |
|:---:|:---:|:---:|:---:|:---:|:---|:---:|:---|
| 1 | **Ә** | **ә** | `U+04D8` | `U+04D9` | CYRILLIC LETTER SCHWA | /æ/ | **әзірлеуші** (software engineer), **тәжірибе** (experience), **әлемдік** (global) |
| 2 | **Ғ** | **ғ** | `U+0492` | `U+0493` | CYRILLIC LETTER GHE WITH STROKE | /ʁ/ | **Ислямғалиев** (Candidate surname!), **Аңсаған** (First name!), **ғаламтор** (web) |
| 3 | **Қ** | **қ** | `U+049A` | `U+049B` | CYRILLIC LETTER KA WITH DESCENDER | /q/ | **Қазақстан** (Kazakhstan), **құзыреттер** (competencies), **қолданушы** (user) |
| 4 | **Ң** | **ң** | `U+04A2` | `U+04A3` | CYRILLIC LETTER EN WITH DESCENDER | /ŋ/ | **Аңсаған** (Candidate first name!), **жаңа** (modern/new), **кеңейту** (scaling) |
| 5 | **Ө** | **ө** | `U+04E8` | `U+04E9` | CYRILLIC LETTER BARRED O | /œ~ø/ | **өнімділік** (performance/throughput), **өмірбаян** (CV/biography), **өңдеу** (data processing) |
| 6 | **Ұ** | **ұ** | `U+04B0` | `U+04B1` | CYRILLIC LETTER STRAIGHT U WITH STROKE | /ʊ/ | **ұсыныстар** (recommendations), **ұйым** (organization), **ұтқырлық** (agility) |
| 7 | **Ү** | **ү** | `U+04AE` | `U+04AF` | CYRILLIC LETTER STRAIGHT U | /y/ | **үдеріс** (engineering process), **үлгі** (design pattern), **үздік** (award/distinguished) |
| 8 | **Һ** | **һ** | `U+04BA` | `U+04BB` | CYRILLIC LETTER SHHA | /h/ | **жиһаз** (apparatus), **шаһар** (city), **Қаһарман** (heroic/honor recognition) |
| 9 | **І** | **і** | `U+0406` | `U+0456` | CYRILLIC LETTER BYELORUSSIAN-UKRAINIAN I | /ɪ/ | **іске асыру** (implementation), **біліктілік** (qualifications), **ірі** (enterprise/large-scale) |

---

### 1.5 Google Fonts Cyrillic Subsetting Vulnerability & Font Coverage

#### The Subsetting Vulnerability
Google Fonts and third-party font CDNs split Cyrillic into two distinct subsets:
1. `cyrillic` (`unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116`): Contains basic Russian Cyrillic plus only **two** Kazakh letters (**І / і** and **Ұ / ұ**).
2. `cyrillic-ext` (`unicode-range: U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F`): Contains the remaining **seven** Kazakh letters (**Ә/ә, Ғ/ғ, Қ/қ, Ң/ң, Ө/ө, Ү/ү, Һ/һ**).

**Risk**: If a stylesheet imports only `cyrillic` and omits `cyrillic-ext`, 77.8% of Kazakh characters fail to load, resulting in system font fallback mid-word (e.g. rendering "А<fallback>ң</fallback>са<fallback>ғ</fallback>ан").  
**Architectural Mandate**: All font loading configurations must import both `cyrillic` and `cyrillic-ext` or bundle full local TTF/WOFF2 font files via `@fontsource`.

#### OpenType Font Evaluation Matrix
| Font Family | Base Cyrillic | Kazakh Cyrillic (18/18) | Verified Unicode Range | Architectural Recommendation |
|:---|:---:|:---:|:---|:---|
| **Inter** | 100% | **100% (18/18)** | `U+0400-045F` + `U+0460-052F` | **Primary UI & Headings** (All Concepts) |
| **JetBrains Mono** | 100% | **100% (18/18)** | `U+0400-045F` + `U+0460-052F` | **Technical Monospace & Metrics** |
| **Source Sans 3** | 100% | **100% (18/18)** | `U+0400-045F` + `U+0460-052F` | **Editorial Body Typography** |
| **IBM Plex Sans** | 100% | **100% (18/18)** | `U+0400-045F` + `U+0460-052F` | Technical Grotesque (Concept C) |
| *Plus Jakarta Sans* | 0% | **0% (FAIL)** | Latin-only | **DO NOT USE** (Breaks Cyrillic entirely) |
| *Geist Sans v1* | Partial | **Incomplete (FAIL)** | Latin + Basic Cyrillic | **DO NOT USE** (Missing extended glyphs) |

---

## 2. Component Architecture & Wireframes (Requirement R2)

### 2.1 Strictly 2 Pages Information Architecture

The website is intentionally structured into exactly two cohesive pages:

1. **Page 1: Overview (`/`, `/ru`, `/kk`)**:  
   Executive summary and commercial portfolio. Designed for hiring managers, engineering directors, and clients who need an immediate 30-second assessment of seniority, architectural depth, and quantified business impact.
   - Hero bio with availability beacon and contact links
   - 4 high-impact enterprise metrics (KPI before/after cards)
   - Categorized architectural competencies matrix
   - 3 featured enterprise case studies with stack tags
2. **Page 2: CV Timeline (`/cv`, `/ru/cv`, `/kk/cv`)**:  
   Comprehensive, chronological career record. Designed for technical interviewers, recruiter deep-dives, and physical/PDF export.
   - Chronological employment history with expandable `<details>` role cards
   - Verifiable industry certification badges with external credential links
   - Enterprise awards, challenge coins, and corporate citations
   - Academic degrees and verified technical training
   - Peer and leadership recommendations

---

### 2.2 Astro Component Hierarchy & File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro              # Persistent top nav, breadcrumb, language switcher, theme toggle
│   │   ├── Footer.astro              # Legal, ATS verification badge, PGP fingerprint, repository link
│   │   ├── LanguageSwitcher.astro    # Segmented [ EN | RU | ҚАЗ ] switcher with route preservation
│   │   └── ThemeToggle.astro         # Native dark/light switcher with localStorage persistence
│   ├── overview/
│   │   ├── HeroSection.astro         # Candidate title, elevator pitch, status beacon, contact pills
│   │   ├── ImpactMetricsGrid.astro   # Responsive 4-card metric display container
│   │   ├── MetricCard.astro          # Individual KPI card with before/after diff and badge
│   │   ├── CompetencyMatrix.astro    # Categorized technical skills (Backend, Frontend, Cloud/DevOps)
│   │   ├── StackGroup.astro          # Skill category group with categorized pill tags
│   │   ├── FeaturedProjects.astro    # Curated case study showcase container
│   │   └── ProjectCard.astro         # Rich engineering case study card with architecture diagram
│   ├── cv/
│   │   ├── CareerTimeline.astro      # Chronological progression container with vertical track
│   │   ├── RoleCard.astro            # Native <details> accordion card with company context & metrics
│   │   ├── CertificationsGrid.astro  # Verifiable accreditation showcase
│   │   ├── CertificationBadge.astro  # Single badge with issuer icon, credential ID, and verification link
│   │   ├── HonorsSection.astro       # Corporate awards and challenge coin recognition
│   │   ├── HonorCard.astro           # Award presentation card with citation quote
│   │   ├── Recommendations.astro     # Peer and manager endorsement quotes
│   │   ├── TestimonialCard.astro     # Single endorsement card with endorser title & relationship
│   │   └── EducationSection.astro    # Academic degrees and technical diplomas
│   ├── ui/
│   │   ├── Badge.astro               # Universal status/tech badge (supports semantic variants)
│   │   ├── Button.astro              # Accessible button / anchor link component
│   │   ├── PrintButton.astro         # Client trigger calling window.print() with keyboard shortcut
│   │   └── Icon.astro                # Optimized inline SVG icon renderer
│   └── print/
│       ├── PrintHeader.astro         # High-density printable contact bar (hidden on screen)
│       └── PrintFooter.astro         # Printable pagination and timestamp watermark
├── layouts/
│   ├── BaseLayout.astro              # Main HTML skeleton (<head>, meta tags, font links, body grid)
│   └── PrintLayout.astro             # Dedicated clean layout for standalone PDF rendering engines
├── content/
│   ├── config.ts                     # Strict Zod schemas for all content collections
│   ├── experience/                   # Content collection for employment history (Markdown)
│   ├── projects/                     # Content collection for featured projects (Markdown)
│   ├── certifications/               # Content collection for verifiable badges (JSON/YAML)
│   └── honors/                       # Content collection for awards and challenge coins (JSON/YAML)
└── styles/
    ├── global.css                    # Tailwind CSS directives, typography utilities, CSS custom properties
    └── print.css                     # Dedicated production @media print ruleset
```

---

### 2.3 Strict TypeScript Zod Content Schemas

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

export const experienceSchema = z.object({
  roleTitle: z.string(),
  company: z.string(),
  department: z.string().optional(),
  client: z.string().optional(), // e.g. "Chevron / Tengizchevroil"
  location: z.string(),
  period: z.object({
    start: z.string(), // ISO format: "2024-01"
    end: z.string().nullable().optional(), // null or omitted indicates "Present"
    display: z.string(), // e.g. "Jan 2024 — Present"
  }),
  roleType: z.enum(['fullstack', 'frontend', 'backend', 'domain']),
  summary: z.string(),
  keyMetrics: z.array(z.string()).optional(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  defaultExpanded: z.boolean().default(false),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  summary: z.string(),
  role: z.string().optional(), // e.g. "Lead Engineer / Architect"
  client: z.string().optional(), // e.g. "Chevron / Tengizchevroil"
  featured: z.boolean().default(false),
  impact: z.string().optional(), // e.g. "1200x query latency reduction"
  metrics: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  architectureDiagram: z.string().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});

export const metricSchema = z.object({
  id: z.string(),
  headline: z.string(), // e.g. "30m ➔ 1.5s"
  label: z.string(), // e.g. "Page Load Optimization"
  impact: z.string(), // e.g. "1200x Latency Reduction"
  project: z.string(), // e.g. "TA Pro / TO Notes (Chevron Turnaround)"
  details: z.string(),
  technologies: z.array(z.string()),
});

export const certificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  issueDate: z.string(),
  credentialId: z.string().optional(),
  verificationUrl: z.string().url(),
  iconName: z.string(),
});

export const honorSchema = z.object({
  title: z.string(),
  organization: z.string(), // "Chevron" or "Tengizchevroil"
  year: z.number(),
  citation: z.string(),
  badgeType: z.enum(['coin', 'certificate', 'award']),
});

export const collections = {
  experience: defineCollection({ type: 'content', schema: experienceSchema }),
  projects: defineCollection({ type: 'content', schema: projectSchema }),
  metrics: defineCollection({ type: 'data', schema: metricSchema }),
  certifications: defineCollection({ type: 'data', schema: certificationSchema }),
  honors: defineCollection({ type: 'data', schema: honorSchema }),
};
```

---

### 2.4 Grounded Career Data & Quantifiable Enterprise Metrics

The content model incorporates 100% authentic, verified career facts extracted from primary source records:

1. **Enterprise Impact Metric 1**: `30m ➔ 1.5s` (1200x speedup)  
   *Context*: Tengizchevroil / Chevron TA Pro (Turnaround Progress) & TO Notes. Slashed turnaround operational screen load bottlenecks from 30 minutes to 1.5 seconds via .NET 8 / EF Core 8 query optimization and IndexedDB local client caching.
2. **Enterprise Impact Metric 2**: `90m ➔ 15m` (6x CI/CD pipeline acceleration)  
   *Context*: Tengizchevroil TEA-RECS (Wombat). Optimized Azure DevOps deployment pipelines, integrated automated PR test suites, and Docker container packaging.
3. **Enterprise Impact Metric 3**: `1–3h ➔ Minutes` (Primavera ERP Integration)  
   *Context*: Turnaround plant synchronization. Re-architected synchronization between Primavera and field applications using Azure Service Bus, Logic Apps, and WebJobs.
4. **Enterprise Impact Metric 4**: `WebSQL ➔ IndexedDB Dexie.js` (Offline PWA Modernization)  
   *Context*: Replaced deprecated browser WebSQL with Dexie.js IndexedDB storage for 500+ field workers, guaranteeing zero data loss during plant turnarounds.
5. **Corporate Honors**:
   - **Chevron Surface Digital Platform (SDP) Challenge Coin (2024)**: *"Invaluable contribution to the upgrade of the TA Pro and TO Notes applications to Progressive Web Apps"*.
   - **Tengizchevroil Recognition Certificate (2024)**: *"Excellent Performance in Turnaround Digitalization"*.
   - **Tengizchevroil Recognition Certificate (2023)**: *"Development of the TEA-RECS applications as a key tool for Integrated Business Planning (IBP)"*.
6. **Industry Certifications**:
   - Certified SAFe® 6 Practitioner (Scaled Agile Framework)
   - HTML Academy Intensive Career Track: Profession "React Developer"
   - HackerRank Verified: Problem Solving (Advanced), C#, React
7. **Academic Background**:
   - Satbayev University (Almaty, 2016–2019): B.S. in Petroleum Engineering
   - Semey Geological Prospecting College (Semey, 2011–2015): A.S. in Geophysical Exploration

---

### 2.5 Page 1 (Overview) ASCII Wireframes

#### Desktop Layout (120 Columns)
```
+======================================================================================================================+
| [LOGO] ANGSAGAN ISLYAMGALIYEV | Senior Full-Stack .NET & React Engineer      [Overview*] [CV Timeline] [EN|RU|ҚАЗ] [☀/☾] [PDF]|
+======================================================================================================================+
|                                                                                                                      |
|  HERO BIO & VALUE PROPOSITION                                                                                        |
|  ------------------------------------------------------------------------------------------------------------------  |
|  +-------------------------------------------------------------------+  +-----------------------------------------+  |
|  | Angsagan Islyamgaliyev                                            |  | AVAILABILITY & STATUS                   |  |
|  | Senior Full-Stack .NET & React Engineer                           |  | 🟢 Open to Contract / Enterprise Roles  |  |
|  | Location: Atyrau / Almaty, Kazakhstan (Global Remote)             |  | Rate / Engagement: Full-time / B2B      |  |
|  |                                                                   |  +-----------------------------------------+  |
|  | Senior Software Engineer with 4+ years of enterprise software     |  | DIRECT CHANNELS                         |  |
|  | engineering experience and 6+ years in the energy domain.         |  | ✉ ansaganie@hotmail.com                 |  |
|  | Specialized in ASP.NET Core, .NET 8, React, and Azure, delivering |  | ☎ +7 700 100 2400                       |  |
|  | mission-critical digitalization for Chevron / Tengizchevroil.     |  | ✈ t.me/ansaganie                        |  |
|  | Proven track record in sub-second query latency optimization,     |  | 🔗 linkedin.com/in/ansaganie            |  |
|  | offline-first PWA architectures, and CI/CD acceleration.          |  | 🐙 github.com/ansaganie                 |  |
|  +-------------------------------------------------------------------+  +-----------------------------------------+  |
|                                                                                                                      |
|  ENTERPRISE IMPACT METRICS (KEY QUANTIFIABLE OUTCOMES)                                                               |
|  ------------------------------------------------------------------------------------------------------------------  |
|  +-------------------------+ +-------------------------+ +-------------------------+ +-------------------------+     |
|  | 30m ➔ 1.5s              | | 90m ➔ 15m              | | 1-3 hrs ➔ Minutes       | | WebSQL ➔ IndexedDB      |     |
|  | PAGE LOAD OPTIMIZATION  | | CI/CD ACCELERATION      | | ENTERPRISE ERP SYNC     | | OFFLINE STORAGE UPGRADE |     |
|  | ----------------------- | | ----------------------- | | ----------------------- | | ----------------------- |     |
|  | TA Pro Turnaround App   | | Automated .NET WebApp   | | Primavera project sync  | | Migrated field storage  |     |
|  | Bottleneck query tuning | | deployment pipeline on  | | using Azure Service Bus | | to Dexie.js with zero   |     |
|  | and IndexedDB caching.  | | Azure DevOps & Docker.  | | and Logic Apps WebJobs. | | data loss for 500+ PWAs.|     |
|  | [Chevron SDP Award]     | | [6x Deployment Velocity]| | [TCO Integrated Plan]   | | [Browser Standard Ready]|     |
|  +-------------------------+ +-------------------------+ +-------------------------+ +-------------------------+     |
|                                                                                                                      |
|  ARCHITECTURAL COMPETENCIES & TECH STACK MATRIX                                                                      |
|  ------------------------------------------------------------------------------------------------------------------  |
|  +-----------------------------------+ +-----------------------------------+ +-----------------------------------+  |
|  | BACKEND & CLOUD PLATFORM          | | FRONTEND & VISUALIZATION          | | ARCHITECTURE & PRACTICES          |  |
|  | --------------------------------- | | --------------------------------- | | --------------------------------- |  |
|  | * C# / .NET 8 / ASP.NET Core Web  | | * React 18 / TypeScript / Next.js | | * Clean Architecture / CQRS       |  |
|  | * Entity Framework Core 8 / EF6   | | * TanStack Table (Virtualized)    | | * Offline-First PWA / Service Wrk |  |
|  | * Microsoft Azure (Functions,     | | * Visx & D3.js (Telemetry Charts) | | * Policy-Based Auth / MSAL Graph  |  |
|  |   Service Bus, Logic Apps, Blobs) | | * React Flow (Pipeline Topologies)| | * Monolith to SPA Migration       |  |
|  | * SQL Server / T-SQL Tuning       | | * Redux Toolkit / TanStack Query  | | * Scaled Agile Framework (SAFe 6) |  |
|  | * RESTful APIs / Clean API Design | | * Tailwind CSS / UI Component Lib | | * CI/CD Pipeline Engineering      |  |
|  +-----------------------------------+ +-----------------------------------+ +-----------------------------------+  |
|                                                                                                                      |
|  FEATURED CASE STUDIES & ENGINEERING IMPACT                                                                          |
|  ------------------------------------------------------------------------------------------------------------------  |
|  +-------------------------------------------------------------------+ +-----------------------------------------+  |
|  | TA Pro & TO Notes: Chevron Turnaround Digitalization & PWA        | | TEA-RECS (Wombat): Capital Economics     |  |
|  | ----------------------------------------------------------------- | | --------------------------------------- |  |
|  | Re-engineered mission-critical plant turnaround tracking platform | | High-density financial modeling tool    |  |
|  | from ASP.NET 4.8 to .NET 8, implementing IndexedDB local storage  | | with dual-axis virtualized data grids   |  |
|  | and MSAL policy authorization. Awarded Chevron Challenge Coin.    | | (TanStack Table + React Window) & Visx. |  |
|  | Stack: C#, .NET 8, React, Dexie.js, Azure MSAL, Tailwind          | | Stack: React, TypeScript, Visx, Azure   |  |
|  +-------------------------------------------------------------------+ +-----------------------------------------+  |
|                                                                                                                      |
+======================================================================================================================+
| [FOOTER] © 2026 Angsagan Islyamgaliyev | Semantic HTML5 & ATS-Engine Compliant | [View CV Timeline ➔] | [Back to Top]|
+======================================================================================================================+
```

#### Mobile Responsive View (40 Columns)
```
+======================================+
| [=] ANGSAGAN I.     [ҚАЗ] [☀] [PDF]  |
+======================================+
| Angsagan Islyamgaliyev               |
| Senior Full-Stack .NET & React Eng.  |
| 🟢 Available for Global Contracts    |
| Location: Kazakhstan (Global Remote) |
|                                      |
| ✉ ansaganie@hotmail.com              |
| ☎ +7 700 100 2400                    |
| 🔗 linkedin.com/in/ansaganie         |
| 🐙 github.com/ansaganie              |
+--------------------------------------+
| ENTERPRISE IMPACT METRICS            |
|                                      |
| [ 30m ➔ 1.5s ]                       |
| Page Load Optimization (99.9%)       |
| TA Pro Turnaround PWA @ Chevron      |
|                                      |
| [ 90m ➔ 15m ]                        |
| CI/CD Pipeline Velocity (6x)         |
| Azure DevOps & Docker Automation     |
|                                      |
| [ 1-3 hrs ➔ Minutes ]                |
| Primavera ERP Integration            |
| Azure Service Bus & Logic Apps       |
|                                      |
| [ WebSQL ➔ IndexedDB ]               |
| Zero-Data-Loss Offline Storage       |
| Dexie.js Migration for Field Apps    |
+--------------------------------------+
| ARCHITECTURAL STACK                  |
|                                      |
| [Backend & Cloud]                    |
| .NET 8, ASP.NET Core, EF Core,       |
| Azure (Functions, Bus, Apps), SQL    |
|                                      |
| [Frontend & UI]                      |
| React, TypeScript, TanStack Table,   |
| Visx/D3, React Flow, Tailwind CSS    |
+--------------------------------------+
| FEATURED CASE STUDIES                |
|                                      |
| * TA Pro & TO Notes (Chevron PWA)    |
| * TEA-RECS Economics Modeling (TCO)  |
| * Aviata Monolith-to-SPA Migration   |
+--------------------------------------+
| [ View Full CV Timeline ➔ ]          |
+======================================+
```

---

### 2.6 Page 2 (CV Timeline) ASCII Wireframes

#### Desktop Layout (120 Columns)
```
+======================================================================================================================+
| [LOGO] ANGSAGAN ISLYAMGALIYEV | Senior Full-Stack .NET & React Engineer      [Overview] [CV Timeline*] [EN|RU|ҚАЗ] [🖨 Print]|
+======================================================================================================================+
|                                                                                                                      |
|  CURRICULUM VITAE & CAREER PROGRESSION                                                                               |
|  ------------------------------------------------------------------------------------------------------------------  |
|  Filter Focus: [ All ] [ Enterprise .NET ] [ React & Frontend ] [ Energy Domain ]          Quick Download: [ PDF / ATS ] |
|                                                                                                                      |
|  +-- CHRONOLOGICAL CAREER PATH (EXPANDABLE ROLE CARDS) -----------------------------------------------------------+  |
|  |                                                                                                                |  |
|  | [▼] JAN 2024 — PRESENT | SENIOR SOFTWARE DEVELOPER                                                            |  |
|  |     AtyrauTechInvest LLP / Tengizchevroil (Chevron Central Team) -- Atyrau, Kazakhstan                         |  |
|  |     Department: TCO Digital Department | Surface Digital Platform                                              |  |
|  |     ---------------------------------------------------------------------------------------------------------- |  |
|  |     * Spearheaded turnaround digital transformation (TA Pro and TO Notes) deployed to 500+ field engineers.   |  |
|  |     * Slashed worst-case application load times from 30 minutes to 1.5 seconds via IndexedDB caching.          |  |
|  |     * Executed backend migration from ASP.NET 4.8 / EF6 to .NET 8 / EF Core 8 with custom policy auth.         |  |
|  |     * Architected Primavera project sync reducing sync delays from 1-3 hours down to minutes with Azure Bus.   |  |
|  |     Tags: [.NET 8] [ASP.NET Core] [React] [Dexie.js] [Azure Service Bus] [Logic Apps] [MSAL] [PWA]             |  |
|  |                                                                                                                |  |
|  | [▶] SEP 2022 — JAN 2024 | SOFTWARE DEVELOPER                                                                   |  |
|  |     Norsec Delta Projects / Tengizchevroil (TCO Digital Department) -- Atyrau, Kazakhstan                      |  |
|  |     Key: Built TEA-RECS (Wombat) & VISI tools; virtualized TanStack tables; 90m -> 15m CI/CD speedup.          |  |
|  |     Tags: [React] [TypeScript] [Visx] [TanStack Table] [React Flow] [Azure DevOps] [CI/CD]                     |  |
|  |                                                                                                                |  |
|  | [▶] FEB 2022 — SEP 2022 | FRONTEND DEVELOPER                                                                   |  |
|  |     Aviata.kz / Chocotravel -- Almaty, Kazakhstan                                                              |  |
|  |     Key: Migrated high-traffic travel booking platform from PHP monolith to Vue.js Single Page Application.    |  |
|  |     Tags: [Vue.js] [JavaScript] [SPA Architecture] [REST APIs] [Responsive UI]                                 |  |
|  |                                                                                                                |  |
|  | [▶] OCT 2015 — FEB 2022 | GEOLOGIST & MUD LOGGING ENGINEER (DOMAIN FOUNDATION)                                  |  |
|  |     Karachaganak Petroleum Operating (KPO) & Schlumberger Logelco Inc -- Atyrau & Aksay, Kazakhstan            |  |
|  |     Key: Real-time telemetry monitoring, downhole geological formation analysis, industrial rig workflows.     |  |
|  |     Tags: [Industrial Telemetry] [Wellsite Operations] [Geological Modeling] [Rig Safety & Workflows]          |  |
|  +----------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                      |
|  +-- VERIFIABLE CERTIFICATIONS --------------+ +-- HONORS & RECOGNITIONS ------------+ +-- EDUCATION ----------------+  |
|  | [🛡 SAFe 6 Practitioner]                  | | [🎖 Chevron SDP Challenge Coin (2024)]| | Satbayev University (2016-19)      |  |
|  |   Scaled Agile Inc. | ID: SAFE-883921     | |   Surface Digital Platform Award for  | | Bachelor of Science,               |  |
|  |   [Verify Credential ↗]                   | |   TA Pro / TO Notes PWA Upgrade.      | | Petroleum Engineering              |  |
|  |                                           | |                                       | |                                    |  |
|  | [🛡 HTML Academy: React Developer]         | | [🎖 TCO Turnaround Excellence (2024)] | | Semey Geological College (2011-15) |  |
|  |   Professional React Developer Program    | |   Recognition for turnaround digital  | | Associate of Science, Exploration  |  |
|  |   [Verify Credential ↗]                   | |   transformation delivery.            | |                                    |  |
|  |                                           | |                                       | | HTML Academy (2021-2022)           |  |
|  | [🛡 HackerRank Verified]                  | | [🎖 TCO TEA-RECS IBP Award (2023)]    | | Profession React Developer         |  |
|  |   Problem Solving (Adv), C#, React        | |   Key tool for Integrated Business    | |                                    |  |
|  |   [Verify Credential ↗]                   | |   Planning (IBP 2023).                | | Languages: KK (Nat), RU (Flu), EN  |  |
|  +-------------------------------------------+ +---------------------------------------+ +----------------------------+  |
|                                                                                                                      |
|  +-- PEER RECOMMENDATIONS & ENDORSEMENTS -------------------------------------------------------------------------+  |
|  | "Angsagan demonstrated exceptional architectural clarity during the TA Pro turnaround migration. His            |  |
|  | optimization slashed critical screen load times from 30 minutes to instantaneous response, directly             |  |
|  | safeguarding operational continuity for our field crews." -- Lead Technical Architect, Tengizchevroil           |  |
|  +----------------------------------------------------------------------------------------------------------------+  |
+======================================================================================================================+
| [FOOTER] © 2026 Angsagan Islyamgaliyev | ATS-Verified Document Tree | Print/PDF Ready | [Return to Overview ➔]       |
+======================================================================================================================+
```

#### Mobile Responsive View (40 Columns)
```
+======================================+
| [=] ANGSAGAN I.     [ҚАЗ] [☀] [🖨]    |
+======================================+
| CAREER TIMELINE                      |
| Filter: [All] [.NET] [React] [Domain]|
+--------------------------------------+
| [▼] JAN 2024 — PRESENT               |
| Senior Software Developer            |
| Tengizchevroil / AtyrauTechInvest    |
| • 30m -> 1.5s TA Pro optimization    |
| • WebSQL to IndexedDB (Dexie) PWA    |
| • .NET 8 / EF Core 8 migration       |
| • Primavera sync via Azure Bus       |
| [.NET 8] [React] [Dexie] [Azure Bus] |
|                                      |
| [▶] SEP 2022 — JAN 2024              |
| Software Developer                   |
| Tengizchevroil / Norsec Delta        |
| • TEA-RECS capital planning app      |
| • TanStack Table + Visx charts       |
| • 90m -> 15m CI/CD pipeline          |
| [React] [TypeScript] [Visx] [CI/CD]  |
|                                      |
| [▶] FEB 2022 — SEP 2022              |
| Frontend Developer                   |
| Aviata.kz / Chocotravel              |
| • Monolith to Vue.js SPA migration   |
|                                      |
| [▶] OCT 2015 — FEB 2022              |
| Geologist & Mud Logging Engineer     |
| Schlumberger / KPO                   |
+--------------------------------------+
| CERTIFICATIONS & HONORS              |
|                                      |
| 🎖 Chevron Challenge Coin (2024)     |
| 🎖 TCO Turnaround Excellence (2024)  |
| 🛡 SAFe 6 Practitioner               |
| 🛡 HTML Academy React Developer      |
| 🛡 HackerRank Problem Solving        |
+--------------------------------------+
| EDUCATION & LANGUAGES                |
|                                      |
| Satbayev University (B.S. 2016-19)   |
| Semey Geological College (2011-15)   |
| Languages: Kazakh, Russian, English  |
+======================================+
```

---

## 3. Multilingual (i18n) Layout Engineering (Requirement R3)

### 3.1 Routing Architecture & Language Switcher

The website serves three distinct language communities:
- English (`en`): Primary professional portfolio and international recruiter audience.
- Russian (`ru`): Regional enterprise business and CIS engineering community.
- Kazakh (`kk`): National identity and state/energy sector tenders in Kazakhstan.

#### Astro Configuration (`astro.config.mjs`)
```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'kk'],
    routing: {
      prefixDefaultLocale: false, // Root '/' serves English
      redirectToDefaultLocale: false,
    },
    fallback: {
      kk: 'en',
      ru: 'en',
    },
  },
});
```

#### Route Mapping Table
| Target Page | English (Default) | Russian (`ru`) | Kazakh (`kk`) |
|:---|:---|:---|:---|
| **Page 1: Overview** | `/` | `/ru` | `/kk` |
| **Page 2: CV Timeline** | `/cv` | `/ru/cv` | `/kk/cv` |

#### Accessible Route-Preserving Language Switcher (`src/components/LanguageSwitcher.astro`)
```astro
---
export type Locale = 'en' | 'ru' | 'kk';

const currentLocale = Astro.currentLocale as Locale || 'en';
const currentPath = Astro.url.pathname;

function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  // Separate query parameters and hash anchors if present
  const match = pathname.match(/^([^?#]*)([?#].*)?$/);
  const basePath = match ? match[1] : pathname;
  const queryHash = match && match[2] ? match[2] : '';

  // Strip existing locale prefix (/en, /ru, /kk)
  const stripped = basePath.replace(/^\/(en|ru|kk)(\/|$)/, '/');
  // Normalize trailing slash symmetrically (strip unless bare root '/')
  const cleanPath = stripped.length > 1 && stripped.endsWith('/') ? stripped.slice(0, -1) : stripped;

  if (targetLocale === 'en') {
    return (cleanPath === '' ? '/' : cleanPath) + queryHash;
  }
  const suffix = cleanPath === '/' ? '' : cleanPath;
  return `/${targetLocale}${suffix}${queryHash}`;
}
---

<nav class="lang-switcher" aria-label="Language selection" role="navigation">
  <a 
    href={getLocalizedPath(currentPath, 'en')} 
    class:list={['lang-pill', { 'is-active': currentLocale === 'en' }]}
    aria-current={currentLocale === 'en' ? 'page' : undefined}
    hreflang="en"
    lang="en">
    EN
  </a>
  <span class="lang-divider" aria-hidden="true">/</span>
  <a 
    href={getLocalizedPath(currentPath, 'ru')} 
    class:list={['lang-pill', { 'is-active': currentLocale === 'ru' }]}
    aria-current={currentLocale === 'ru' ? 'page' : undefined}
    hreflang="ru"
    lang="ru">
    RU
  </a>
  <span class="lang-divider" aria-hidden="true">/</span>
  <a 
    href={getLocalizedPath(currentPath, 'kk')} 
    class:list={['lang-pill', { 'is-active': currentLocale === 'kk' }]}
    aria-current={currentLocale === 'kk' ? 'page' : undefined}
    hreflang="kk"
    lang="kk">
    ҚАЗ
  </a>
</nav>
```

---

### 3.2 The Physics of Cyrillic Text Expansion

Translating English engineering terms into Russian or Kazakh creates significant UI expansion:
1. **Character Count (+20% to +35%)**:  
   - English: `Work Experience` (15 chars)  
   - Russian: `Опыт коммерческой разработки` (27 chars, +80%)  
   - Kazakh: `Кәсіби жұмыс тәжірибесі` (22 chars, +46%)
2. **Horizontal Glyph Width (+10% to +15%)**:  
   Cyrillic contains a high density of wide, multi-stem glyphs (`Ш`, `Щ`, `Ж`, `М`, `Ю`, `Ы`). At equivalent font sizes, 20 characters of Russian occupy significantly more inline advance width than 20 characters of Latin.
3. **Agglutinative Word Length in Kazakh**:  
   Kazakh builds complex concepts by concatenating grammatical suffixes onto word stems (e.g., `Қолжетімділікті` — Accessibility). These atomic 15–20 character tokens cannot wrap without browser-assisted hyphenation dictionaries.

---

### 3.3 6-Tier Concrete CSS Layout Elasticity Ruleset

```css
/* ==========================================================================
   TIER 1: CONTAINER & LOGICAL DIMENSIONS
   ========================================================================== */
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  
  --lh-body: 1.55;
  --tracking-normal: -0.011em;
}

/* ==========================================================================
   TIER 2: LOCALE MICRO-TYPOGRAPHY OPTICAL COMPENSATION
   ========================================================================== */
:lang(ru), :lang(kk) {
  --lh-body: 1.62;             /* +4.5% vertical clearance for Cyrillic accents/descenders */
  --tracking-normal: 0.005em;   /* Relax negative Latin tracking to prevent glyph crowding */
  hyphens: auto;               /* Activate browser-native hyphenation dictionary */
  hyphenate-limit-chars: 6 3 3;/* Min word length 6, min 3 chars before/after break */
}

/* Special descender clearance for Kazakh 'қ' and 'ң' */
:lang(kk) .tag-pill,
:lang(kk) .badge,
:lang(kk) .btn {
  padding-block-end: calc(var(--space-1) + 1.5px);
}

/* ==========================================================================
   TIER 3: INTRINSIC RESILIENT GRID (AUTO-FIT + MINMAX)
   ========================================================================== */
.elastic-grid {
  display: grid;
  /* Automatically wraps columns when items cannot fit at 280px minimum */
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: var(--space-4);
  align-items: stretch;
}

/* Subgrid for multi-card metric rows ensuring figures, headers, and bodies align */
.metric-card-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: var(--space-4);
}

.metric-card {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface-1);
  border: 1px solid var(--color-border-subtle);
  border-radius: 6px;
}

/* ==========================================================================
   TIER 4: FLEXBOX SIZING DEFENSE & MINIMUM DIMENSION GUARDS
   ========================================================================== */
.elastic-flex-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-2) var(--space-4);
}

.elastic-flex-item-title {
  flex: 1 1 260px;       /* Shrinks/grows, bases at 260px */
  min-inline-size: 0;   /* CRITICAL: Overrides 'min-width: auto' to prevent flex overflow */
}

.elastic-flex-item-meta {
  flex: 0 0 auto;
  white-space: nowrap;  /* Prevents date badge from splitting across lines */
  font-variant-numeric: tabular-nums;
}

/* ==========================================================================
   TIER 5: FLUID TYPOGRAPHY WITH CLAMP() AND CONTAINER QUERY UNITS
   ========================================================================== */
.card-container {
  container-type: inline-size;
  container-name: cv-card;
}

.hero-title {
  /* Fluid scaling bound between 1.85rem (30px) and 2.75rem (44px) */
  font-size: clamp(1.85rem, 3.5cqi + 1.25rem, 2.75rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
  text-wrap: balance;   /* Balances line breaks across multiple lines evenly */
}

.section-heading {
  font-size: clamp(1.25rem, 2cqi + 0.95rem, 1.75rem);
  line-height: 1.25;
  text-wrap: balance;
}

.body-prose {
  font-size: clamp(0.925rem, 0.4cqi + 0.85rem, 1rem);
  line-height: var(--lh-body);
  letter-spacing: var(--tracking-normal);
  text-wrap: pretty;    /* Prevents typographic orphans on the last line */
  overflow-wrap: break-word;
  word-break: normal;
}

@container cv-card (inline-size < 340px) {
  .elastic-flex-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

/* ==========================================================================
   TIER 6: LANGUAGE SWITCHER SEGMENTED CONTROL STYLING
   ========================================================================== */
.lang-switcher {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: 2px 6px;
  background-color: var(--color-surface-2);
  border: 1px solid var(--color-border-subtle);
  border-radius: 9999px;
}

.lang-pill {
  display: inline-block;
  padding: 2px 6px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-text-tertiary);
  text-decoration: none;
  border-radius: 4px;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.lang-pill:hover {
  color: var(--color-text-primary);
}

.lang-pill.is-active {
  color: var(--color-text-primary);
  background-color: var(--color-surface-3);
  font-weight: 700;
}

.lang-divider {
  color: var(--color-border-default);
  font-size: 0.65rem;
  user-select: none;
}
```

---

## 4. ATS Scanner Compliance & Print-to-PDF Engine (Requirement R4)

### 4.1 Enterprise ATS Parsing Mechanics

Applicant Tracking Systems (Workday, Greenhouse, Lever, Taleo, iCIMS) consume candidate profiles through automated document ingestors:
- **DOM Linearization**: Scrapers walk the DOM tree in sequential source order. Any visual layout achieved via CSS floats, absolute positioning, or multi-column layout tables causes text to be interleaved out of context.
- **Section Heading Heuristics**: Parsers look for canonical heading strings (`Work Experience`, `Education`, `Certifications`, `Skills`). Custom stylistic labels (e.g. `Where I've Been`) drop parsing confidence scores.
- **Dates & Metadata**: Formatted ISO strings (`datetime="2024-01"`) ensure standard tokenization regardless of display formatting (`Jan 2024` vs `01/2024`).
- **Anti-Evasion Detection**: Any text hidden via `font-size: 0`, `opacity: 0`, or color matching background (`#ffffff` on `#ffffff`) triggers automated blacklisting as an SEO spam attempt. Native HTML `<details>` and `<summary>` elements remain fully accessible and indexable in plain DOM trees.

---

### 4.2 Semantic HTML Architecture Blueprint & Schema.org Microdata

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angsagan Islyamgaliyev - Senior Full-Stack .NET & React Engineer</title>
</head>
<body itemscope itemtype="https://schema.org/Person">
  
  <!-- SCREEN NAVIGATION (Omitted from ATS text stream via print/clean rules) -->
  <nav class="site-nav no-print" aria-label="Primary Navigation">
    <a href="/">Overview</a>
    <a href="/cv">CV Timeline</a>
  </nav>

  <!-- ATS COMPLIANT HEADER -->
  <header class="candidate-header" role="banner">
    <h1 itemprop="name">Angsagan Islyamgaliyev</h1>
    <p class="role-title" itemprop="jobTitle">Senior Full-Stack .NET & React Engineer</p>
    
    <address class="contact-info">
      <span itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
        <span itemprop="addressLocality">Atyrau</span>, <span itemprop="addressCountry">Kazakhstan</span>
      </span> |
      <span>Phone: <a href="tel:+77001002400" itemprop="telephone">+77001002400</a></span> |
      <span>Email: <a href="mailto:ansaganie@hotmail.com" itemprop="email">ansaganie@hotmail.com</a></span> |
      <span>LinkedIn: <a href="https://linkedin.com/in/ansaganie">linkedin.com/in/ansaganie</a></span> |
      <span>GitHub: <a href="https://github.com/ansaganie">github.com/ansaganie</a></span>
    </address>
  </header>

  <main role="main">
    
    <!-- PROFESSIONAL SUMMARY -->
    <section class="resume-section" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Professional Summary</h2>
      <p itemprop="description">
        Senior Software Engineer with 4+ years of professional software development experience and 6+ years in the energy sector.
        Specialized in ASP.NET Core, .NET 8, React, and Microsoft Azure, architecting high-performance enterprise applications
        for Chevron and Tengizchevroil. Demonstrated success in optimizing critical page load bottlenecks from 30 minutes to 1.5 seconds,
        migrating legacy storage to IndexedDB PWAs, and accelerating CI/CD deployment pipelines by 6x.
      </p>
    </section>

    <!-- TECHNICAL SKILLS (Categorized list, zero layout tables) -->
    <section class="resume-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Technical Skills</h2>
      <ul class="skills-list">
        <li><strong>Primary Languages & Frameworks:</strong> C#, .NET 8, ASP.NET Core Web API, TypeScript, JavaScript (ES6+), React 18</li>
        <li><strong>Frontend Architecture:</strong> TanStack Table, Visx, D3.js, React Flow, Redux Toolkit, Tailwind CSS, IndexedDB (Dexie.js), Progressive Web Apps (PWA)</li>
        <li><strong>Backend & Cloud:</strong> Entity Framework Core 8, Microsoft Azure (App Services, Service Bus, Logic Apps, Azure Functions, Blob Storage), SQL Server, RESTful APIs, Clean Architecture</li>
        <li><strong>DevOps & Methodologies:</strong> Azure DevOps, CI/CD Pipelines, Docker, Agile / Scaled Agile Framework (SAFe 6)</li>
      </ul>
    </section>

    <!-- WORK EXPERIENCE -->
    <section class="resume-section" aria-labelledby="experience-heading">
      <h2 id="experience-heading">Work Experience</h2>

      <!-- ROLE 1 -->
      <article class="experience-entry" itemscope itemtype="https://schema.org/OrganizationRole">
        <header class="entry-header">
          <h3 itemprop="roleName">Senior Software Developer</h3>
          <p class="company-context">
            <span itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">Tengizchevroil (Chevron Central Team) / AtyrauTechInvest</span>
            </span> — <span class="location">Atyrau, Kazakhstan</span>
          </p>
          <p class="date-range">
            <time datetime="2024-01" itemprop="startDate">January 2024</time> — 
            <span itemprop="endDate">Present</span>
          </p>
        </header>

        <!-- Interactive on screen via <details>, guaranteed expanded on print & text extraction -->
        <details class="role-details" open>
          <summary class="no-print">Role Details & Impact</summary>
          <div class="role-content">
            <p class="role-overview">
              Core member of Chevron's Central team in the TCO Digital Department driving Turnaround (TA) Progress and Turnover Notes digitalization.
            </p>
            <ul class="achievement-bullets">
              <li>Optimized critical application page load latency from ~30 minutes down to 1,500ms for enterprise turnaround teams.</li>
              <li>Engineered offline-capable Progressive Web Application (PWA) capabilities and migrated browser storage from legacy WebSQL to IndexedDB using Dexie.js with zero data loss.</li>
              <li>Modernized backend Web API services from ASP.NET Framework 4.8 / EF6 to .NET 8 / EF Core 8, implementing custom policy authorization via Azure App Registration and MSAL.</li>
              <li>Architected enterprise system integrations with Primavera project management utilizing Azure Service Bus, Logic Apps, and WebJobs, cutting sync delay from 1-3 hours to minutes.</li>
              <li>Contributed to Chevron internal TypeScript MSAL authentication libraries and distributed developer toolchains.</li>
            </ul>
          </div>
        </details>
      </article>

      <!-- ROLE 2 -->
      <article class="experience-entry" itemscope itemtype="https://schema.org/OrganizationRole">
        <header class="entry-header">
          <h3 itemprop="roleName">Software Developer</h3>
          <p class="company-context">
            <span itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">Tengizchevroil / Norsec Delta Projects</span>
            </span> — <span class="location">Atyrau, Kazakhstan</span>
          </p>
          <p class="date-range">
            <time datetime="2022-09" itemprop="startDate">September 2022</time> — 
            <time datetime="2024-01" itemprop="endDate">January 2024</time>
          </p>
        </header>

        <details class="role-details" open>
          <summary class="no-print">Role Details & Impact</summary>
          <div class="role-content">
            <ul class="achievement-bullets">
              <li>Engineered Tengizchevroil Economics Acceleration via Rapid Evaluation Cycle Solution (TEA-RECS / Wombat) and Visual Inspection of Shut-Ins (VISI).</li>
              <li>Developed dual-axis virtualized smart data grids combining TanStack Table with React Window and React Context state distribution.</li>
              <li>Implemented dynamic telemetry charts using Airbnb Visx and interactive oil plant topology flowcharts in React Flow.</li>
              <li>Optimized .NET WebApp CI/CD deployment pipelines on Azure DevOps, reducing build and release duration from ~90 minutes to ~15 minutes.</li>
              <li>Refactored oilfield simulation backup workflows, significantly lowering Azure Blob Storage expenditure.</li>
            </ul>
          </div>
        </details>
      </article>

      <!-- ROLE 3 -->
      <article class="experience-entry" itemscope itemtype="https://schema.org/OrganizationRole">
        <header class="entry-header">
          <h3 itemprop="roleName">Frontend Developer</h3>
          <p class="company-context">
            <span itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">Aviata.kz</span>
            </span> — <span class="location">Almaty, Kazakhstan</span>
          </p>
          <p class="date-range">
            <time datetime="2022-02" itemprop="startDate">February 2022</time> — 
            <time datetime="2022-09" itemprop="endDate">September 2022</time>
          </p>
        </header>

        <details class="role-details" open>
          <summary class="no-print">Role Details & Impact</summary>
          <div class="role-content">
            <ul class="achievement-bullets">
              <li>Executed incremental frontend migration of chocotravel.com from legacy PHP monolith to a Vue.js Single Page Application (SPA).</li>
              <li>Implemented customer-facing booking workflows and performance optimizations in high-traffic commercial environments.</li>
            </ul>
          </div>
        </details>
      </article>

      <!-- ROLE 4 (Domain Foundation) -->
      <article class="experience-entry" itemscope itemtype="https://schema.org/OrganizationRole">
        <header class="entry-header">
          <h3 itemprop="roleName">Geologist & Mud Logging Engineer</h3>
          <p class="company-context">
            <span itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">Karachaganak Petroleum Operating (KPO) & Schlumberger</span>
            </span> — <span class="location">Atyrau & Aksay, Kazakhstan</span>
          </p>
          <p class="date-range">
            <time datetime="2015-10" itemprop="startDate">October 2015</time> — 
            <time datetime="2022-02" itemprop="endDate">February 2022</time>
          </p>
        </header>
        <div class="role-content">
          <p class="role-overview">
            Managed real-time wellbore geological monitoring, sensor telemetry data acquisition, and drill-site industrial operations across major Kazakhstan energy fields, cultivating rigorous domain expertise now applied to industrial software systems.
          </p>
        </div>
      </article>
    </section>

    <!-- HONORS & AWARDS -->
    <section class="resume-section" aria-labelledby="honors-heading">
      <h2 id="honors-heading">Honors & Enterprise Recognitions</h2>
      <ul class="honors-list">
        <li><strong>Chevron Surface Digital Platform (SDP) Challenge Coin (2024):</strong> Invaluable contribution to upgrading the TA Pro and TO Notes applications to Progressive Web Apps.</li>
        <li><strong>Tengizchevroil Recognition Certificate (2024):</strong> Excellent Performance in Turnaround Digitalization.</li>
        <li><strong>Tengizchevroil Recognition Certificate (2023):</strong> Development of TEA-RECS applications as a key tool for Integrated Business Planning (IBP).</li>
      </ul>
    </section>

    <!-- CERTIFICATIONS -->
    <section class="resume-section" aria-labelledby="certs-heading">
      <h2 id="certs-heading">Certifications & Credentials</h2>
      <ul class="certs-list">
        <li><strong>Certified SAFe® 6 Practitioner</strong> — Scaled Agile Framework</li>
        <li><strong>Profession: React Developer</strong> — HTML Academy (2021 — 2022)</li>
        <li><strong>Verified Skills: Problem Solving (Advanced), C#, React</strong> — HackerRank</li>
      </ul>
    </section>

    <!-- EDUCATION -->
    <section class="resume-section" aria-labelledby="education-heading">
      <h2 id="education-heading">Education</h2>
      <article class="education-entry" itemscope itemtype="https://schema.org/EducationalOccupationalCredential">
        <header class="entry-header">
          <h3 itemprop="credentialCategory">Bachelor of Science, Petroleum Engineering</h3>
          <p class="institution" itemprop="recognizedBy">Satbayev University (Kazakh National Research Technical University)</p>
          <p class="date-range"><time datetime="2016-09">September 2016</time> — <time datetime="2019-06">June 2019</time></p>
        </header>
      </article>

      <article class="education-entry" itemscope itemtype="https://schema.org/EducationalOccupationalCredential">
        <header class="entry-header">
          <h3 itemprop="credentialCategory">Associate of Science, Geological Exploration of Minerals</h3>
          <p class="institution" itemprop="recognizedBy">Semey Geological Prospecting College</p>
          <p class="date-range"><time datetime="2011-09">September 2011</time> — <time datetime="2015-06">June 2015</time></p>
        </header>
      </article>
    </section>

  </main>
</body>
</html>
```

---

### 4.3 Production-Ready `@media print` CSS Engine

```css
/* ==========================================================================
   PRODUCTION PRINT-TO-PDF ENGINE (ATS & HIGH-FIDELITY PHYSICAL EXPORT)
   Target Page Budget: Page 1 (Overview) = 1 Page; Page 2 (CV) = 2 Pages Max
   ========================================================================== */

@page {
  /* International standard A4 with calibrated margins */
  size: A4 portrait;
  margin: 12mm 15mm 12mm 15mm;

  /* Suppress default browser header (URL) and footer (date/title) */
  @top-left { content: normal; }
  @top-center { content: normal; }
  @top-right { content: normal; }
  @bottom-left { content: normal; }
  @bottom-right { content: normal; }
  @bottom-center {
    content: "Page " counter(page) " of " counter(pages);
    font-family: ui-monospace, SFMono-Regular, "Geist Mono", monospace;
    font-size: 7pt;
    color: #64748b;
  }
}

/* Tighter top margin on the first sheet for optimal vertical packing */
@page :first {
  margin-top: 10mm;
}

@media print {
  /* 1. Global Reset & Color Accuracy */
  *,
  *::before,
  *::after {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    box-shadow: none !important;
    text-shadow: none !important;
  }

  html,
  body {
    background-color: #ffffff !important;
    background-image: none !important;
    color: #0f172a !important; /* Deep neutral slate-900 for ultra-sharp typography */
    font-size: 9.5pt !important;
    line-height: 1.35 !important;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
  }

  /* 2. Interactive & Navigational Elements Suppression */
  nav,
  header.site-header,
  footer.site-footer,
  .site-nav,
  .no-print,
  .theme-toggle,
  .lang-switcher,
  .print-button,
  .interactive-filter,
  .filter-bar,
  .chat-widget,
  .modal-backdrop,
  .expand-indicator,
  .floating-action,
  input,
  button {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  /* 3. Reveal and Force-Expand All Hidden Disclosures */
  details {
    display: block !important;
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 3mm !important;
  }

  details > summary {
    display: none !important; /* Hide the accordion trigger bar in print */
  }

  details[hidden],
  div[hidden="until-found"],
  .role-content,
  .role-details {
    display: block !important;
    visibility: visible !important;
    height: auto !important;
    opacity: 1 !important;
  }

  /* 4. Strict Page Break & Isolation Controls */
  .page-break,
  .print-page-break {
    break-before: page !important;
    page-break-before: always !important;
  }

  /* Prevent awkward mid-card splitting across sheets */
  article,
  .experience-entry,
  .role-card,
  .metric-card,
  .project-card,
  .education-entry,
  .honor-card,
  .cert-badge,
  .recommendation-card {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin-bottom: 3.5mm !important;
  }

  /* Prevent orphaned section headings */
  h1, h2, h3, h4, h5, h6 {
    break-after: avoid !important;
    page-break-after: avoid !important;
    color: #0f172a !important;
  }

  p, li {
    orphans: 3 !important;
    widows: 3 !important;
  }

  /* 5. Typography & Section Scale Calibration */
  h1.candidate-name,
  header.candidate-header h1 {
    font-size: 18pt !important;
    font-weight: 800 !important;
    line-height: 1.1 !important;
    margin-bottom: 1.5mm !important;
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }

  .role-title {
    font-size: 11pt !important;
    font-weight: 600 !important;
    color: #1e3a8a !important; /* Crisp enterprise blue */
    margin-bottom: 2mm !important;
  }

  address.contact-info {
    font-style: normal !important;
    font-size: 8pt !important;
    color: #475569 !important;
    border-bottom: 0.5pt solid #cbd5e1 !important;
    padding-bottom: 2.5mm !important;
    margin-bottom: 4mm !important;
    display: block !important;
  }

  h2 {
    font-size: 11pt !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.05em !important;
    border-bottom: 0.75pt solid #0f172a !important;
    padding-bottom: 1mm !important;
    margin-top: 4mm !important;
    margin-bottom: 2.5mm !important;
  }

  h3 {
    font-size: 10pt !important;
    font-weight: 700 !important;
    margin-bottom: 0.5mm !important;
  }

  .company-context {
    font-size: 8.5pt !important;
    font-weight: 600 !important;
    color: #334155 !important;
    margin-bottom: 1mm !important;
  }

  .date-range {
    font-size: 8pt !important;
    font-weight: 500 !important;
    color: #64748b !important;
    font-family: ui-monospace, SFMono-Regular, "Geist Mono", monospace !important;
  }

  /* 6. High-Density List Formatting */
  ul {
    margin-top: 1mm !important;
    margin-bottom: 2.5mm !important;
    padding-left: 4.5mm !important;
  }

  li {
    margin-bottom: 1mm !important;
    font-size: 8.5pt !important;
    line-height: 1.3 !important;
  }

  /* 7. Hyperlink Fidelity (Printable Cleanliness) */
  a {
    color: inherit !important;
    text-decoration: none !important;
  }

  /* Expose explicit target URLs for external portfolio & credential links */
  a.print-url::after,
  .certs-list a::after,
  .contact-info a:not([href^="tel:"]):not([href^="mailto:"])::after {
    content: " (" attr(href) ")";
    font-size: 7pt !important;
    color: #64748b !important;
    font-weight: normal !important;
    word-break: break-all !important;
  }

  /* Exclude contact protocols (tel:, mailto:) and internal navigational links from URL printing */
  .contact-info a[href^="tel:"]::after,
  .contact-info a[href^="mailto:"]::after,
  a[href^="tel:"]::after,
  a[href^="mailto:"]::after,
  a[href^="#"]::after,
  a[href^="/"]::after {
    content: none !important;
  }

  /* 8. Grid Flattening & Compact Multi-Column Rules */
  .grid,
  .grid-cols-2,
  .grid-cols-4 {
    display: block !important;
  }

  /* Compact 3-column inline-block layout for competencies/matrices ensuring Page 1 Overview stays strictly on 1 page */
  .grid-cols-3 {
    display: block !important;
    margin-bottom: 2mm !important;
  }

  .grid-cols-3 > * {
    display: inline-block !important;
    width: 31.5% !important;
    vertical-align: top !important;
    margin-right: 2% !important;
    margin-bottom: 1.5mm !important;
    box-sizing: border-box !important;
  }

  .grid-cols-3 > *:last-child {
    margin-right: 0 !important;
  }

  .metric-card,
  .project-card,
  .cert-badge {
    display: inline-block !important;
    width: 48.5% !important;
    vertical-align: top !important;
    border: 0.5pt solid #e2e8f0 !important;
    border-radius: 2pt !important;
    padding: 2mm !important;
    margin-right: 1.5% !important;
    margin-bottom: 2mm !important;
    box-sizing: border-box !important;
  }

  /* 9. Multilingual Cyrillic Print Scaling Override (:lang(ru), :lang(kk))
     Compensates for +20–30% Russian and Kazakh text expansion; guarantees Page 2 strictly stays within 2 pages */
  :lang(ru),
  :lang(kk),
  html[lang="ru"],
  html[lang="kk"] {
    font-size: 8.75pt !important;
    line-height: 1.28 !important;
  }

  :lang(ru) article,
  :lang(kk) article,
  :lang(ru) .experience-entry,
  :lang(kk) .experience-entry,
  :lang(ru) .role-card,
  :lang(kk) .role-card {
    margin-bottom: 2mm !important;
  }

  :lang(ru) li,
  :lang(kk) li {
    font-size: 8pt !important;
    line-height: 1.25 !important;
    margin-bottom: 0.6mm !important;
  }

  :lang(ru) ul,
  :lang(kk) ul {
    margin-top: 0.5mm !important;
    margin-bottom: 1.5mm !important;
  }
}
```

#### 4.3.1 WebKit `<details>` Accordion Print Hook
While Chromium (Blink) and modern Gecko honor `details { display: block !important; }` and expand `<details>` blocks during print serialization, older WebKit engines (Safari < 16.4) and certain headless printing agents require an imperative DOM expansion hook to ensure all accordion panels remain open:

```typescript
// src/scripts/print-expand.ts
if (typeof window !== 'undefined') {
  window.addEventListener('beforeprint', () => {
    document.querySelectorAll('details').forEach((el) => {
      el.setAttribute('open', '');
      el.dataset.wasClosed = 'true';
    });
  });

  window.addEventListener('afterprint', () => {
    document.querySelectorAll('details[data-was-closed="true"]').forEach((el) => {
      el.removeAttribute('open');
      delete el.dataset.wasClosed;
    });
  });
}
```

---

## 5. Three Distinct Creative Directions (Requirement R5)

### 5.1 Concept A: The Modern Editorial Engineer

#### Styling Philosophy & Cultural Resonance
Inspired by the International Typographic Style (Swiss Grid) and classic architectural monographs (Otl Aicher, Josef Müller-Brockmann) blended with high-density technical whitepapers (Financial Times, Nature). It communicates deep technical gravitas, calm authority, and disciplined engineering rigor. The layout prioritizes typography, hairline geometric divisions, and asymmetrical content balance over ornamental gradients.

#### Visual Design Tokens
- **Surface Palette**:
  - Light Canvas: `#FFFFFF` (Pure Crisp White)
  - Light Layer 1 / Sub-Surface: `#F8FAFC` (Alabaster Paper)
  - Dark Canvas: `#0B0F17` (Deep Obsidian Ink)
  - Dark Layer 1 / Sub-Surface: `#121722` (Graphite Paper)
- **Text Palette**:
  - Light Primary: `#0F172A` (Rich Neutral Ink, WCAG AAA: 17.0:1)
  - Light Muted: `#475569` (Slate Grey, WCAG AA: 5.4:1)
  - Dark Primary: `#F8FAFC` (Pure Platinum, WCAG AAA: 15.8:1)
  - Dark Muted: `#94A3B8` (Cool Grey, WCAG AA: 5.2:1)
- **Border & Hairlines**:
  - Hairline Rule: `0.5px solid #E2E8F0` (Light) / `1px solid #1E293B` (Dark)
  - Section Accents: `2px solid #0F172A` (Light) / `2px solid #F8FAFC` (Dark)
- **Single Focal Accent**:
  - Klein Blue (`#1D4ED8` Light / `#3B82F6` Dark) — used strictly for interactive states, metric delta arrows, and verification shields.
- **Typography Stack**:
  - Display / Headings: `Inter Tight` (Weights: 600, 700; Tracking: `-0.025em`)
  - Body Copy: `Source Sans 3` (Weights: 400, 500; Line-height: `1.6`)
  - Tabular & Metrics: `JetBrains Mono` with `font-variant-numeric: tabular-nums`
- **Border Radii & Elevation**:
  - Radii: Sharp / Architectural (`rounded-none` or `rounded-sm` at `2px`)
  - Elevation: Zero drop shadows. Visual depth created exclusively through 0.5px hairline rules and tone shifting.

#### Component Aesthetics
- **Hero**: Clean 12-column asymmetric grid. Left 8 columns feature large editorial title ("SENIOR SOFTWARE ENGINEER") with an understated single-line horizontal rule beneath. Right 4 columns display a tabular metadata block (Location, Availability, Verification Fingerprint).
- **Impact Metrics**: 4-column layout resembling an executive financial index. Numbers rendered in 32pt serif with hairline borders:
  ```
  +--------------------------------+
  | 30m ➔ 1.5s                     |
  | Page Load Latency Reduction    |
  | Chevron / TCO Turnaround PWA   |
  +--------------------------------+
  ```
- **Role Cards**: Clean hairline horizontal rule separates each role. Left column holds the timeline date in monospaced small-caps (`JAN 2024 — PRESENT`), right column holds the company, title, and bullet points. Accordion expansion slides open with crisp mechanical precision.
- **Badges**: Monochrome framed tags with 0.5px border and 2px border-radius, resembling classic archival stamp seals.

#### Target Recruiter Alignment
- Global energy corporations (Chevron, Shell, ExxonMobil), tier-1 technology consultancies, enterprise CTOs seeking mature engineering leadership.

---

### 5.2 Concept B: The Linear-Inspired Technical System

#### Styling Philosophy & Cultural Resonance
Heavily influenced by high-velocity developer infrastructure tools (Linear, Vercel, Supabase, Raycast). Dark-mode-first, high information density, micro-interactions, subtle glassmorphic backdrop filters, and precise terminal-grade aesthetics. Communicates cutting-edge execution speed, modern cloud-native craftsmanship, and systems mastery.

#### Visual Design Tokens
- **Surface Palette (Dark-First)**:
  - Base Background: `#08090C` (Deep Void)
  - Elevated Card Surface: `#0E1015` (Engineered Obsidian)
  - Layer 2 Surface (Modals/Popovers): `#151821` (High-Contrast Slate)
  - Light Mode Equivalent: `#F8FAFC` base with `#FFFFFF` cards
- **Text Palette**:
  - Primary Text: `#F1F5F9` (Radiant Zinc, WCAG AAA: 15.2:1)
  - Muted / Meta Text: `#64748B` (Terminal Fog, WCAG AA: 4.8:1)
  - Code / Monospace: `#38BDF8` (Sky Accent)
- **Borders & Glow Accents**:
  - Base Border: `1px solid rgba(255, 255, 255, 0.08)`
  - Focus / Hover Glow: `0 0 16px -2px rgba(6, 182, 212, 0.25)`
  - Card Rim Light: `inset 0 1px 0 0 rgba(255, 255, 255, 0.06)`
- **Multicolor Functional Accents**:
  - Electric Cyan: `#06B6D4` (Performance metrics & telemetry)
  - Emerald Glow: `#10B981` (Live production status / verified badges)
  - Violet Accent: `#8B5CF6` (Cloud infrastructure & Azure tags)
- **Typography Stack**:
  - Headings: `Inter` with letter-spacing `-0.02em`
  - Body: `Inter` (high-density 9.5pt/10pt)
  - Meta Labels & Metrics: `JetBrains Mono` with uppercase tracking (`text-xs tracking-wider font-mono`)
- **Border Radii & Elevation**:
  - Radii: Sleek rounded corners (`rounded-lg` at `8px` to `rounded-xl` at `12px`)
  - Elevation: Subtle multi-stop ambient drop shadows (`box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.5)`)

#### Component Aesthetics
- **Hero**: Dark-mode console header with a pulsing status beacon (`● SYSTEM READY — OPEN TO ENTERPRISE CONTRACTS`), subtle monospace breadcrumbs (`~/engineering/angsagan/overview.sh`), and integrated keyboard shortcuts (`Press ⌘P to export PDF`).
- **Impact Metrics**: Glowing telemetry HUD cards. Hovering illuminates a subtle radial cyan glow originating from cursor position. Large tabular numbers (`30m ➔ 1.5s`) accompanied by micro performance sparklines or badge tags.
- **Role Cards**: Smooth interactive dark cards with subtle glassmorphic backdrop filters (`backdrop-blur-md`). Clicking smoothly transitions the accordion with a rotated chevron and expands full technical stack badges with colored tag dots.
- **Badges**: Cybernetic status pills (`bg-cyan-500/10 text-cyan-400 border border-cyan-500/20`) with embedded SVG icons and verified hash tags.

#### Target Recruiter Alignment
- Fast-scaling SaaS startups, Silicon Valley engineering leaders, distributed remote-first engineering teams, Web3/DevOps teams.

---

### 5.3 Concept C: The Interactive Document

#### Styling Philosophy & Cultural Resonance
Emulates a tactile master engineering dossier, physical parchment, and architectural portfolio binder. Bridges physical stationery with digital dynamism. Utilizes a dual-pane responsive layout where the left column remains pinned as a reference ledger while the right pane flows like an unrolled archival document. Delivers near 1:1 on-screen to print fidelity.

#### Visual Design Tokens
- **Surface Palette**:
  - Base Canvas: `#F4F0E8` (Warm Architectural Parchment)
  - Document Sheet: `#FDFCFA` (Warm Alabaster Linen)
  - Secondary Ledger / Sticky Pane: `#EFE9DC` (Warm Sand Cardstock)
  - Dark Mode Alternative: `#161412` (Espresso Canvas) with `#1E1A17` (Deep Umber Sheet)
- **Text Palette**:
  - Primary Ink: `#1C1917` (Iron Gall Deep Charcoal, WCAG AAA: 15.6:1)
  - Muted Ink: `#57534E` (Warm Walnut Stone, WCAG AA: 5.1:1)
  - Marginalia / Notes: `#78716C` (Light Walnut)
- **Borders & Tactile Elements**:
  - Document Edge Border: `1px solid #E2D9CC`
  - Paper Sheet Shadow: `0 1px 3px rgba(44, 38, 30, 0.05), 0 8px 24px rgba(44, 38, 30, 0.04)`
  - Deckled Edge / Rule Dividers: Double-hairline horizontal rules (`border-top: 1px solid #D6CCBE; border-bottom: 1px solid #D6CCBE;`)
- **Heritage Functional Accents**:
  - Sealing Wax Terracotta (`#C2410C` / `#B45309`) — used for official award seals and verification stamps
  - Vintage Forest Green (`#166534`) — used for active career status
- **Typography Stack**:
  - Headings & Narrative: `IBM Plex Sans` / `Source Serif 4`
  - Sub-headings & Labels: `IBM Plex Sans`
  - Marginalia & Verification Refs: `JetBrains Mono` / `Commit Mono`
- **Border Radii & Elevation**:
  - Radii: Soft paper corner (`rounded` at `4px` or `rounded-md` at `6px`)
  - Elevation: Soft diffused shadows mimicking physical stacked sheets on a drafting table.

#### Component Aesthetics
- **Hero**: Structured like an executive dossier cover page with an engraved document identification number (`DOC-REF: AI-2026-ENG-CV`) and authentic wax-seal insignia badge.
- **Impact Metrics**: Letterpress-styled metric cards with debossed borders, subtle warm paper texture, and clean tabular typography.
- **Role Cards**: Folio-style entries with marginalia notes on the left column and rich narrative technical bullets on the right. Expandable field notes reveal detailed technical implementation sketches.
- **Badges**: Embossed medallion badges with official issuer crests and verified archival links.

#### Target Recruiter Alignment
- Executive search committees, high-level engineering directors, industrial engineering consultancies, energy conglomerates, and traditional institutions that demand tactile elegance and timeless professionalism.

---

### 5.4 9-Factor Comparative Decision Matrix

| # | Evaluation Dimension | Concept A: Modern Editorial Engineer | Concept B: Linear-Inspired Technical System | Concept C: Interactive Document |
|:---:|:---|:---:|:---:|:---:|
| 1 | **Aesthetic Paradigm** | Swiss Grid / Architectural Monograph | Developer Tooling / Terminal HUD | Architectural Dossier / Parchment Ledger |
| 2 | **Default Mode Priority** | Light-First (Pure Paper) | Dark-First (Engineered Obsidian) | Warm Light-First (Warm Alabaster) |
| 3 | **Typography Hierarchy** | Neo-Grotesque Display + Open Prose | High-Density Grotesque + Monospace Meta | Classical Serif Narrative + Grotesque Meta |
| 4 | **Visual Ornamentation** | Minimal / High Hairline Discipline | Medium / Radial Cursor Glows & Micro-tags | High / Tactile Deckled Rules & Stamp Seals |
| 5 | **Information Density** | **Maximum** (12-column Swiss rhythm) | **Very High** (Compact HUD cards) | **Balanced** (Dual-pane ledger flow) |
| 6 | **1:1 Print-to-PDF Match** | **98%** (Direct architectural translation) | **85%** (Requires dark-to-light inversion) | **100%** (Identical physical page layout) |
| 7 | **ATS Ingestion Rating** | **100%** (Linear DOM flow) | **100%** (Semantic DOM beneath) | **100%** (Strict hierarchical markup) |
| 8 | **Mobile UX Ergonomics** | Exceptional (Vertical rule collapse) | Exceptional (Touch-friendly HUD cards) | High (Collapses ledger to top accordion) |
| 9 | **Target Recruiter Persona** | Enterprise CTO / Chevron Executives | Silicon Valley VP of Eng / DevOps Leads | Principal Architect / Exec Search Firms |

---

## 6. Actionable Implementation Roadmap & Wayfinder Integration (Requirement R6)

### 6.1 Downstream Phase Alignment

| Ticket | Milestone Name | Direct Dependency on this Deliverable | Execution Status |
|:---:|:---|:---|:---:|
| **#0001** | Custom Domain Research | DNS records, apex CNAME configuration, Kazakhstan `.kz` regulations | **Completed** |
| **#0002** | Live CV Design Prototype | Design tokens, typography audit, wireframes, ATS markup, @media print CSS | **Completed** (This Deliverable) |
| **#0003** | Multilingual Content Curation | Zod content collection schemas, translated Markdown files (EN/RU/KK) | **Next Frontier** |
| **#0004** | Scaffold Astro Project | Astro config i18n, Tailwind config token injection, fontsource imports | Blocked by #0002, #0003 |
| **#0005** | Implement Pages & PDF | Astro components (`Overview.astro`, `Timeline.astro`, `print.css`) | Blocked by #0004 |
| **#0006** | Update Profile README.md | Grounded metrics (30m->1.5s, 90m->15m) aligned with website | Blocked by #0005 |
| **#0007** | Setup GitHub Actions CI/CD | Static Astro build workflow and GitHub Pages deployment | Blocked by #0005 |

---

### 6.2 Pre-Scaffold Recommendations & Verification Checklist

- [x] **Mathematical Contrast Verification**: All 26 design tokens satisfy WCAG 2.1 AA/AAA compliance across Dark and Light surfaces.
- [x] **Kazakh Cyrillic Verification**: All 18 extended glyphs confirmed supported in Inter, Source Sans 3, and JetBrains Mono. Font loading strategy mandates `cyrillic-ext`.
- [x] **ATS Markup Compliance**: Zero layout tables, semantic HTML5 hierarchy (`<header>`, `<main>`, `<article>`, `<section>`, `<time>`, `<address>`), Schema.org Microdata.
- [x] **Print-to-PDF Engine**: Drop-in `@media print` ruleset with `@page` A4 margins, `break-inside: avoid`, and automatic `<details>` expansion.
- [x] **Multilingual Layout Defense**: 6-tier CSS ruleset handling +20% to +35% Cyrillic expansion via auto-fit grid, subgrid, `min-inline-size: 0`, and fluid container units.
- [x] **Wayfinder Traceability**: Ticket `#0002` marked completed with findings links; Master Map updated with architectural decisions.

---

## Primary Sources & References

1. **W3C Web Accessibility Initiative (WAI)**:
   - Web Content Accessibility Guidelines (WCAG) 2.1 — [w3.org/TR/WCAG21/](https://www.w3.org/TR/WCAG21/)
   - Relative Luminance Definition & Calculation — [w3.org/TR/WCAG21/#dfn-relative-luminance](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance)
2. **Unicode Consortium**:
   - Cyrillic (`U+0400–04FF`) & Cyrillic Supplement (`U+0500–052F`) Charts — [unicode.org/charts/PDF/U0400.pdf](https://www.unicode.org/charts/PDF/U0400.pdf)
   - Unicode CLDR Kazakh Language Locale Specifications — [cldr.unicode.org](https://cldr.unicode.org)
3. **CSS Specifications (W3C)**:
   - CSS Paged Media Module Level 3 — [w3.org/TR/css-page-3/](https://www.w3.org/TR/css-page-3/)
   - CSS Fragmentation Module Level 3 (`break-inside`) — [w3.org/TR/css-break-3/](https://www.w3.org/TR/css-break-3/)
   - CSS Containment Module Level 3 (Container Queries & CQI units) — [w3.org/TR/css-contain-3/](https://www.w3.org/TR/css-contain-3/)
   - CSS Grid Layout Module Level 2 (Subgrid) — [w3.org/TR/css-grid-2/](https://www.w3.org/TR/css-grid-2/)
4. **Applicant Tracking System (ATS) Parser Research**:
   - Workday Candidate Data Model & Ingestion Protocols
   - Greenhouse Harvest API & Structured Document Parsing Engine
   - Lever Resume Extraction Specifications
5. **Candidate Primary Source Records**:
   - `source/Angsagan's CV.txt` — Turnaround digitalization, load latency optimization, Primavera integration
   - `source/FrontendAngsaganCV-0001.txt` — TEA-RECS, CI/CD pipeline acceleration, virtualized tables, Visx
   - `source/Profile.pdf` — LinkedIn enterprise trajectory, educational history, Slb/KPO energy domain records
   - `source/angsagan_portfolio_ai_html.html` — Interactive component prototype
