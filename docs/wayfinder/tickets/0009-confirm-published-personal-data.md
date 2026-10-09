# [Grilling] Confirm published personal data: certifications, phone number, and name spelling

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:grilling (HITL)
- **Status**: open
- **Assignee**: unassigned
- **Blocked by**: none

## Question

Which personal facts should the public site show? The [deployment readiness review](../../research/deployment-readiness-review.md) (C1, C2, I4) found three open owner decisions:

1. **Certifications (P0)**: SAFe 6 Practitioner, its credential ID `SAFE-883921`, and HackerRank "Problem Solving (Advanced) & C#" don't appear in any source document. All four "Verify" links point to issuer homepages. For each certification: confirm it with a real credential URL, keep it without a "Verify" link, or remove it.
2. **Phone number (P1)**: the mobile number is rendered as a `tel:` link and in JSON-LD `telephone`. Keep it, show it only in print/PDF, or remove it. If it's removed, does it also need to come out of git history?
3. **Name spelling (P1)**: "Angsagan Islyamgaliyev" / "Аңсаған Ислямғалиев" (site, README) or "Ansagan Islamgali" (map, git, LICENSE). Pick one Latin form and one Cyrillic form per locale.
