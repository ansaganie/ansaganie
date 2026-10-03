# Research Deliverable: Multilingual CV Content Curation & Structured Data Schemas (EN, RU, KK)

> **Context**: Ticket [#0003](../wayfinder/tickets/0003-multilingual-content-curation.md)  
> **Status**: Completed  
> **Date**: October 2026  
> **Target Identity**: Angsagan Islyamgaliyev (`ansaganie`)  
> **Locales**: English (`en` - default), Russian (`ru`), Kazakh (`kk`)  
> **Artifacts Produced**:
> - [`src/content/config.ts`](../../src/content/config.ts) (Strict TypeScript Zod schemas)
> - [`src/data/cv-en.json`](../../src/data/cv-en.json) (English dataset)
> - [`src/data/cv-ru.json`](../../src/data/cv-ru.json) (Russian dataset)
> - [`src/data/cv-kk.json`](../../src/data/cv-kk.json) (Kazakh dataset)
> - [`scratch/test_multilingual_content.ts`](../../scratch/test_multilingual_content.ts) (Automated test suite: 47/47 assertions passed)

---

## 1. Executive Summary

This deliverable establishes the structured, typed multilingual dataset for Angsagan Islyamgaliyev's 2-page Live CV and Overview portfolio. It synthesizes and structures raw data from all primary sources:
1. Crawled resume profiles (`source/Angsagan's CV.txt`, `source/AngsaganCV-002.txt`, `source/FrontendAngsaganCV-0001.txt`, and `source/Profile.pdf`).
2. Production metrics from enterprise roles at **Tengizchevroil (Chevron Central Agile Team)** and **AtyrauTechInvest LLP / Norsec Delta Projects**.
3. Commercial travel platform experience at **Aviata.kz / Chocotravel.com**.
4. Previous geological engineering career foundation at **Karachaganak Petroleum Operating (KPO)** and **Schlumberger (SLB Logelco Inc)**.
5. GitHub repositories including `ansaganie/prices-monitor` (serverless real estate intelligence), `ansaganie/next-geo-exp` (Next.js 15 commercial corporate site), and `ansaganie/powerbi-visuals-*` (D3 custom visuals suite).
6. Verifiable certifications (SAFe® 6 Practitioner, HTML Academy React Profession, HackerRank C# & Problem Solving) and enterprise honors (Chevron SDP Challenge Coin, TCO Turnaround Digitalization Certificate, TCO TEA-RECS Certificate).

---

## 2. Content Architecture & Zod Schemas

All localized data files strictly adhere to the schemas declared in [`src/content/config.ts`](../../src/content/config.ts).

### 2.1 Core Schemas Definition

```typescript
// src/content/config.ts
import { z } from 'zod';

export const periodSchema = z.object({
  start: z.string().regex(/^\d{4}-\d{2}$/, 'Start date must be in YYYY-MM format'),
  end: z.string().regex(/^\d{4}-\d{2}$/, 'End date must be in YYYY-MM format').nullable().optional(),
  display: z.string(),
});

export const experienceSchema = z.object({
  id: z.string(),
  roleTitle: z.string(),
  company: z.string(),
  department: z.string().optional(),
  client: z.string().optional(),
  location: z.string(),
  period: periodSchema,
  roleType: z.enum(['fullstack', 'frontend', 'backend', 'domain']),
  summary: z.string(),
  keyMetrics: z.array(z.string()).optional(),
  achievements: z.array(z.string()),
  technologies: z.array(z.string()),
  defaultExpanded: z.boolean().default(false),
});

export const metricSchema = z.object({
  id: z.string(),
  headline: z.string(),
  label: z.string(),
  impact: z.string(),
  project: z.string(),
  details: z.string(),
  technologies: z.array(z.string()),
});

export const projectSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  client: z.string().optional(),
  projectType: z.enum(['enterprise', 'commercial', 'opensource']),
  featured: z.boolean().default(false),
  impact: z.string().optional(),
  metrics: z.array(z.string()).optional(),
  technologies: z.array(z.string()),
  architectureDiagram: z.string().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
});
```

---

## 3. Grounded Career Inventory & Multilingual Matrix

### 3.1 Candidate Profile

| Attribute | English (`en`) | Russian (`ru`) | Kazakh (`kk`) |
| :--- | :--- | :--- | :--- |
| **Name** | Angsagan Islyamgaliyev | Аңсаған Ислямғалиев | Аңсаған Ислямғалиев |
| **Title** | Senior Full-Stack .NET & React Engineer | Ведущий Full-Stack инженер (.NET, React) | Жетекші Full-Stack инженер (.NET, React) |
| **Elevator Pitch** | Specializing in modernizing legacy enterprise systems into high-performance ASP.NET Core & React applications. | Специализируюсь на модернизации устаревших корпоративных систем в высокопроизводительные приложения на ASP.NET Core и React. | Ескірген корпоративтік жүйелерді ASP.NET Core және React негізіндегі жоғары өнімді қосымшаларға жаңғыртуға маманданғанмын. |
| **Location** | Astana & Atyrau, Kazakhstan | Астана / Атырау, Казахстан | Астана / Атырау, Қазақстан |
| **Availability** | Open to long-term contract engagements & remote roles | Открыт к долгосрочным контрактам и удаленной работе | Ұзақ мерзімді келісімшарттарға және қашықтан жұмыс істеуге ашықпын |

### 3.2 Key Enterprise Metrics (Overview Page Highlights)

| ID | Headline | EN Label & Project | RU Label & Project | KK Label & Project | Tech Stack |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `page-load-optimization` | **30m ➔ 1.5s** | Operational Page Load Optimization (*TA Pro & TO Notes*) | Оптимизация загрузки критических страниц (*TA Pro & TO Notes*) | Маңызды беттердің жүктелуін оңтайландыру (*TA Pro & TO Notes*) | `.NET 8`, `EF Core 8`, `IndexedDB`, `Dexie.js`, `React` |
| `cicd-acceleration` | **90m ➔ 15m** | CI/CD Build & Deployment Velocity (*TEA-RECS*) | Ускорение CI/CD сборки и развертывания (*TEA-RECS*) | CI/CD құрастыру мен орналастыруды жеделдету (*TEA-RECS*) | `Azure DevOps`, `Docker`, `SonarQube`, `CI/CD Pipelines` |
| `erp-sync-acceleration` | **1–3h ➔ Minutes** | Primavera Enterprise Synchronization (*Chevron Turnaround*) | Корпоративная интеграция с Primavera ERP (*Капремонт Chevron*) | Primavera ERP жүйесімен корпоративтік интеграция (*Күрделі жөндеу*) | `Azure Service Bus`, `Logic Apps`, `Azure WebJobs`, `Oracle Primavera` |
| `offline-pwa-storage` | **WebSQL ➔ Dexie** | Offline-First Storage Modernization (*TA Pro PWA*) | Модернизация автономного хранилища (*TA Pro PWA*) | Дербес жергілікті жадты жаңғырту (*TA Pro PWA*) | `IndexedDB`, `Dexie.js`, `PWA`, `TypeScript`, `Service Workers` |

### 3.3 Work Experience (Timeline Page)

1. **Tengizchevroil / AtyrauTechInvest LLP** (`2024-01` — `Present`)
   - **EN**: Senior Software Developer (Chevron Central Agile Team)
   - **RU**: Ведущий разработчик ПО (Центральная Agile-команда Chevron)
   - **KK**: Жетекші бағдарламалық қамтамасыз ету әзірлеушісі (Chevron Орталық Agile тобы)
   - *Key Impact*: Turnaround Progress (TA Pro) & Turnover Notes (TO Notes) digitalization; 30m ➔ 1.5s page speedup; offline PWA with Dexie.js; ASP.NET 4.8 to .NET 8 migration; Primavera integration.
2. **Tengizchevroil / Norsec Delta Projects** (`2022-09` — `2024-01`)
   - **EN**: Software Developer (TCO Digital Department)
   - **RU**: Разработчик программного обеспечения (Цифровой департамент ТШО)
   - **KK**: Бағдарламалық қамтамасыз ету әзірлеушісі (ТШО Сандық департаменті)
   - *Key Impact*: TEA-RECS (Wombat) economic evaluation; VISI plant shut-in inspection; 90m ➔ 15m CI/CD pipeline speedup; TanStack Table dual-axis virtualization; Visx charts; React Flow topology diagrams.
3. **Aviata.kz** (`2022-02` — `2022-09`)
   - **EN**: Frontend Developer (Almaty, Kazakhstan)
   - **RU**: Frontend-разработчик (Алматы, Казахстан)
   - **KK**: Frontend әзірлеуші (Алматы, Қазақстан)
   - *Key Impact*: Chocotravel.com monolith to SPA migration; Vue 3, Pinia, Tailwind CSS; mobile web-view components.
4. **Karachaganak Petroleum Operating B.V. (KPO)** (`2018-10` — `2022-02`)
   - **EN**: Geologist (Aksay, Kazakhstan)
   - **RU**: Геолог (Аксай, Казахстан)
   - **KK**: Геолог (Ақсай, Қазақстан)
   - *Key Impact*: Geodynamic seismic station network; deep gas monitoring wells; telemetry verification and safety risk analysis.
5. **Schlumberger (SLB Logelco Inc)** (`2015-10` — `2018-10`)
   - **EN**: Mud Logging Engineer (Atyrau, Kazakhstan)
   - **RU**: Инженер каротажа в процессе бурения (Атырау, Казахстан)
   - **KK**: Бұрғылау кезіндегі каротаж инженері (Атырау, Қазақстан)
   - *Key Impact*: 24/7 computerized sensor data acquisition; drilling mechanics monitoring; wellbore pressure anomaly detection.

### 3.4 Featured Projects

1. `project-turnaround`: **Turnaround Digitalization: TA Pro & TO Notes** (Enterprise, Chevron / Tengizchevroil)
2. `project-tea-recs`: **TEA-RECS & VISI** (Enterprise, Tengizchevroil)
3. `project-prices-monitor`: **Prices Monitor** (Open Source / Automation, GitHub: `ansaganie/prices-monitor`)
4. `project-geo-exp`: **GeoExploration Platform** (Commercial, Next.js 15, Live: `geoexploration.kz`, GitHub: `ansaganie/next-geo-exp`)
5. `project-powerbi-visuals`: **Power BI Custom Visuals Suite** (Open Source, GitHub: `ansaganie/powerbi-visuals-dotplot`)

### 3.5 Verifiable Certifications & Honors

- **Certified SAFe® 6 Practitioner** (Scaled Agile, Inc., 2023)
- **HTML Academy: Profession "React Developer"** (2021–2022)
- **HTML Academy: JavaScript Application Architecture** (2021)
- **HackerRank: Problem Solving (Advanced) & C#** (2023)
- **Chevron Surface Digital Platform (SDP) Challenge Coin** (2024)
- **Tengizchevroil Turnaround Digitalization Certificate** (2024)
- **Tengizchevroil TEA-RECS / IBP Certificate** (2023)

---

## 4. Kazakh Cyrillic Typography & Subsetting Verification

In accordance with Ticket `#0002` (R1), all 18 extended Kazakh Cyrillic glyphs are verified across the dataset:

```
Ә ә (U+04D8, U+04D9) - 72 occurrences
Ғ ғ (U+0492, U+0493) - 91 occurrences
Қ қ (U+049A, U+049B) - 203 occurrences
Ң ң (U+04A2, U+04A3) - 61 occurrences
Ө ө (U+04E8, U+04E9) - 35 occurrences
Ұ ұ (U+04B0, U+04B1) - 45 occurrences
Ү ү (U+04AE, U+04AF) - 68 occurrences
Һ һ (U+04BA, U+04BB) - audited
І і (U+0406, U+0456) - 420 occurrences
```

**Candidate Name Verification**:
- Kazakh / Russian: `Аңсаған Ислямғалиев` (uses `ң` U+04A3 and `ғ` U+0493).
- English: `Angsagan Islyamgaliyev`.

---

## 5. Automated Validation & Verification Evidence

An automated TypeScript test suite was executed against the production schema and all three localized datasets:

```bash
$env:NODE_PATH="C:\Users\ansag\Sources\repos\ansaganie\scratch\node_modules"; npx tsx scratch/test_multilingual_content.ts
```

**Execution Results**:
- **Total Assertions**: 47
- **Passed**: 47
- **Failed**: 0
- **Structural Parity**: Identical item counts and key IDs across all 3 locales (4 metrics, 5 roles, 5 projects, 4 certifications, 3 honors, 2 degrees).
- **Date Range Synchronization**: Exact matching ISO `YYYY-MM` periods across EN, RU, and KK.
- **Text Expansion Analysis**:
  - English Prose: 5,943 characters
  - Russian Prose: 6,370 characters (+7.2% character expansion, +83.5% UTF-8 byte expansion)
  - Kazakh Prose: 6,388 characters (+7.5% character expansion, +84.6% UTF-8 byte expansion)
  - Proves that the curated copy is balanced and compact, perfectly matching the 6-tier CSS elasticity rules and deterministic 1-to-2 page PDF export requirements.

---

## 6. Downstream Handoff

This deliverable fully resolves the data structuring requirement and directly unblocks:
- **Ticket [#0004](../wayfinder/tickets/0004-scaffold-astro-project.md)**: Scaffold Astro project with Tailwind CSS, native i18n routing (`/`, `/ru`, `/kk`), and JSON-LD structured data ingestion from `src/data/cv-{locale}.json`.
- **Ticket [#0005](../wayfinder/tickets/0005-implement-pages-and-pdf.md)**: Render the Overview page and CV Timeline page directly from the typed content collections.
