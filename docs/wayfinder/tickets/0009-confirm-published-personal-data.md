# [Grilling] Confirm published personal data: certifications, phone number, and name spelling

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:grilling (HITL)
- **Status**: completed (credential URLs pending; applied in #0013)
- **Assignee**: unassigned
- **Blocked by**: none

## Question

Which personal facts should the public site show? The [deployment readiness review](../../research/deployment-readiness-review.md) (C1, C2, I4) found three open owner decisions:

1. **Certifications (P0)**: SAFe 6 Practitioner, its credential ID `SAFE-883921`, and HackerRank "Problem Solving (Advanced) & C#" don't appear in any source document. All four "Verify" links point to issuer homepages. For each certification: confirm it with a real credential URL, keep it without a "Verify" link, or remove it.
2. **Phone number (P1)**: the mobile number is rendered as a `tel:` link and in JSON-LD `telephone`. Keep it, show it only in print/PDF, or remove it. If it's removed, does it also need to come out of git history?
3. **Name spelling (P1)**: "Angsagan Islyamgaliyev" / "Аңсаған Ислямғалиев" (site, README) or "Ansagan Islamgali" (map, git, LICENSE). Pick one Latin form and one Cyrillic form per locale.

## Resolution (2026-10-10)

Answered while grilling the [portfolio audit](../../research/portfolio-ux-seo-audit.md#owner-decisions-2026-10-10):

1. **Certifications**: the credential links are on the owner's LinkedIn (D3). Reading them on 2026-10-10 showed the site's four entries do not match LinkedIn: wrong SAFe date and ID, different HTML Academy titles and dates, and a HackerRank "Problem Solving (Advanced) & C#" certificate that does not exist. The dataset gets rebuilt from LinkedIn under #0013 ([audit §4.2](../../research/portfolio-ux-seo-audit.md#42-linkedin-certifications-vs-the-dataset-read-2026-10-10)). Which entries to show is D12.
2. **Phone number**: keep it on the site, in JSON-LD and in the PDF CV (D9). Git history stays as it is.
3. **Name spelling**: Latin "Ansagan Islamgaliev" (D4), RU "Ансаган Исламгалиев", KK "Аңсаған Исламғалиев" (D8). The older spellings go only into JSON-LD `alternateName`.

Also decided: the published location is "Astana, Kazakhstan" (D10).
