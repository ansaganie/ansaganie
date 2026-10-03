# [Task] Update GitHub Profile README.md aligned with latest overview

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: #0005

## Question

How should the root `README.md` of `ansaganie/ansaganie` be rewritten to present a modern, polished GitHub profile overview that features your role at Tengizchevroil/Chevron, key projects (`prices-monitor`, `next-geo-exp`, Power BI visual contributions), tech stack badges, and prominent links to your live multilingual CV website?

## Findings & Deliverables

Rewrote [README.md](../../../README.md) from the default template. Content comes from cv-en.json.

- Headline role (Senior Full-Stack .NET & React Engineer, Tengizchevroil / Chevron) and a one-line pitch.
- Live CV badges for EN, RU and KK pointing at https://ansaganie.github.io/cv, /ru/cv and /kk/cv, plus the site root.
- Four headline metrics, a featured projects table (prices-monitor, 
ext-geo-exp, Power BI visuals), tech stack badges, and contact badges.

### Open issues for later tickets

- Links resolve only once #0007 deploys the site.
- Name spelling follows the dataset ("Angsagan Islyamgaliyev"); the map says "Ansagan Islamgali". Confirm the preferred spelling.
- The gh CLI is not installed here, so the map stays in local markdown despite docs/agents/issue-tracker.md naming GitHub.
