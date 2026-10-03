# Research: Custom Domain Options, Pricing, and DNS Architecture

> **Ticket**: [#0001](file:///C:/Users/ansag/Sources/repos/ansaganie/docs/wayfinder/tickets/0001-custom-domain-research.md) — *[Research] Custom domain pricing, registrar rules (.kz vs .xyz vs .net), and DNS configuration*  
> **Date**: October 2026  
> **Status**: Completed  
> **Target Identity**: Ansagan Islamgali (`ansagan` / `ansaganie`)

---

## Executive Summary

1. **Free Default (`ansaganie.github.io`)**:  
   Available immediately at **$0.00 / year**, includes automated Let's Encrypt SSL/TLS, global Fastly CDN caching, DDoS mitigation, and IPv4/IPv6 dual-stack. Recommended for initial site launch.
2. **Best Paid Option (`ansagan.net` or `ansagan.xyz`)**:  
   - `ansagan.net` is **available** ($11.86/yr on Cloudflare Registrar at-cost; $12.52/yr on Porkbun). Provides maximum credibility for a tech CV.  
   - `ansagan.xyz` is **available** ($11.20/yr on Cloudflare; beware Namecheap/Porkbun first-year promos that renew at $14–$21/yr).  
   - Zero regulatory friction with GitHub Pages or Cloudflare Pages.
3. **Kazakhstan National TLD (`.kz`) Warning**:  
   - `ansagan.kz` is **already registered and parked** (registered via Hoster.kz, pointing to `185.98.5.220`).  
   - `ansaganie.kz` is **available** at **9,580 – 9,590 KZT/year** (~$19.20 USD).  
   - **Crucial blocker**: Under Order No. 38/НҚ of the Republic of Kazakhstan, internet resources in `.kz` **must physically host their origin server equipment inside Kazakhstan**. Direct DNS delegation to GitHub Pages (Fastly CDN in US/EU) or Cloudflare proxy without domestic origin hosting triggers automated KZ-CERT flags and delegation suspension (`clientHold`). Using `.kz` with GitHub Pages requires paying for and maintaining a domestic reverse proxy VPS (~18,000 – 36,000 KZT/yr extra).

---

## 1. Domain Availability & Pricing Breakdown

### 1.1 Availability Audit (Live WHOIS / DNS Verification)

Live checks conducted on October 3, 2026 across Verisign, KazNIC/Hoster.kz, and CentralNic (.xyz):

| Domain Candidate | Status | Primary Source / Evidence |
| :--- | :--- | :--- |
| `ansaganie.github.io` | **Available / Active** | Bound directly to user GitHub account `ansaganie`. |
| `ansagan.net` | **Available** | Verisign Registry WHOIS: `No match for "ANSAGAN.NET"` |
| `ansaganie.net` | **Available** | Verisign Registry WHOIS: `No match for "ANSAGANIE.NET"` |
| `ansagan.xyz` | **Available** | nic.xyz Registry WHOIS: `DOMAIN NOT FOUND` |
| `ansaganie.xyz` | **Available** | nic.xyz Registry WHOIS: `DOMAIN NOT FOUND` |
| `ansagan.kz` | **Taken (Parked)** | Active NS `ns1.hoster.kz`, `185.98.5.220` (Hoster.KZ parking page) |
| `ansaganie.kz` | **Available** | KazNIC DNS lookup: `DNS name does not exist` (RCODE 3 / NXDOMAIN) |

### 1.2 Multi-Registrar Price Comparison

*Note: In Kazakhstan, effective June 15, 2025, KazNIC revised `.kz` registry wholesale fees to index to the Monthly Calculation Index (МРП / MRP), raising retail prices from historical ~3,500 KZT to ~9,580 KZT.*

| TLD / Domain | Registrar | 1st Year Price | Renewal Price | WHOIS Privacy | Notes & Traps |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`ansaganie.github.io`** | GitHub Pages | **$0.00** | **$0.00** | N/A (Subdomain) | Free forever, automated SSL |
| **`ansagan.net`** | **Cloudflare Registrar** | **$11.86** | **$11.86 / yr** | Free for life | **Recommended at-cost registrar**; no markup |
| `ansagan.net` | Porkbun | $11.08 (promo) | $12.52 / yr | Free for life | Good alternative with Kaspi/KZ card support |
| `ansagan.net` | Namecheap | $12.48 (promo) | $18.58 / yr | Free for life | +$0.20 ICANN fee, steep renewal bump |
| **`ansagan.xyz`** | **Cloudflare Registrar** | **$11.20** | **$11.20 / yr** | Free for life | **Recommended flat at-cost price** |
| `ansagan.xyz` | Porkbun | $2.04 (promo) | $14.21 / yr | Free for life | 1st year bait-and-switch; standard renewal |
| `ansagan.xyz` | Namecheap | $2.00 (promo) | $21.48 / yr | Free for life | Extreme renewal markup (10x first year) |
| **`ansaganie.kz`** | **Hoster.kz** | **9,580 KZT** (~$19.16) | **9,580 KZT / yr** | Restricted | KazNIC accredited, Kaspi QR payment |
| **`ansaganie.kz`** | **PS.kz** | **9,590 KZT** (~$19.18) | **9,590 KZT / yr** | Restricted | KazNIC accredited, Kaspi QR payment |

---

## 2. Kazakhstan `.kz` Regulations & Technical Constraints

### 2.1 The Legal Mandate: Server Physical Location
The `.kz` top-level domain is governed by the **Rules for registration, use and allocation of domain space in the Kazakhstan segment of the Internet**, approved by the Order of the Minister of Defense and Aerospace Industry of the Republic of Kazakhstan dated March 13, 2018 No. 38/НҚ (with amendments up to 2026 by the Ministry of Digital Development, Innovations and Aerospace Industry — МЦРИАП РК / КИБ).

- **Clause 16**: The hardware and software complexes (server equipment) hosting an Internet resource operating under a domain name in the `.KZ` and `.ҚАЗ` zones **must be physically located within the territory of the Republic of Kazakhstan**.
- **Enforcement & Sanctions**: KZ-CERT and the Committee for Information Security (КИБ МЦРИАП) run automated periodic scanners analyzing the autonomous system (AS) and geolocation of A/AAAA/CNAME records for all `.kz` domains.
- If an A record resolves to an international IP range (such as GitHub Pages Fastly CDN addresses `185.199.108.153` in US/EU):
  1. The registrar (PS.kz / Hoster.kz) receives an official infraction notice.
  2. The registrant is emailed a warning requiring proof of domestic server placement within **3 to 10 business days**.
  3. Failure to comply leads to **delegation suspension (`clientHold`)** and eventual domain revocation.

### 2.2 Cloudflare Proxying with `.kz`
Registrars (e.g. PS.kz Knowledge Base) explicitly advise on using Cloudflare with `.kz`:
- Pointing a `.kz` domain to Cloudflare proxy (orange cloud) hides the origin server behind Cloudflare's Anycast IP addresses (which are geographically international).
- By law, utilizing DDoS mitigation or CDN networks like Cloudflare for a `.kz` domain requires registrants to submit a copy of their domestic Kazakhstan hosting contract to the Committee for Information Security (КИБ) to prove that the **origin server is in Kazakhstan** and Cloudflare is merely an intermediary.
- Because **GitHub Pages is hosted abroad**, a developer cannot legitimately claim domestic hosting.

### 2.3 Viable Workaround for `.kz` (If Desired)
To run a `.kz` domain pointing to a GitHub Pages static site lawfully:
```
[User Browser]
       │
       ▼ (DNS: ansaganie.kz -> KZ Datacenter IP)
[Kazakhstan VPS (PS.kz / Hoster.kz)]
  - Nginx / Caddy reverse proxy
  - Let's Encrypt SSL
  - proxy_pass https://ansaganie.github.io
       │
       ▼ (Forward request over HTTPS)
[GitHub Pages Origin Server / Fastly CDN]
```
- **Cost**: Domain (9,580 KZT/yr) + Smallest KZ VPS (~1,500 – 2,500 KZT/month = 18,000 – 30,000 KZT/yr) = **~27,500 – 39,500 KZT/year ($55 – $80/yr)**.
- **Maintenance**: Requires updating OS packages, handling reverse-proxy cert renewals, and maintaining server uptime.
- **Verdict**: Impractical for a personal CV that Astro can serve for free on edge static CDNs.

---

## 3. DNS Configuration Blueprints

### 3.1 GitHub Pages DNS Blueprint (for `ansagan.net` / `ansagan.xyz`)

When using a standard custom apex domain and `www` subdomain on GitHub Pages:

#### Step 1: DNS Records at Registrar / DNS Provider (Cloudflare DNS or Porkbun)

| Type | Name / Host | Target / Value | TTL | Proxy Status (Cloudflare) |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` (apex) | `185.199.108.153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **A** | `@` (apex) | `185.199.109.153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **A** | `@` (apex) | `185.199.110.153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **A** | `@` (apex) | `185.199.111.153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **AAAA** | `@` (apex) | `2606:50c0:8000::153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **AAAA** | `@` (apex) | `2606:50c0:8001::153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **AAAA** | `@` (apex) | `2606:50c0:8002::153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **AAAA** | `@` (apex) | `2606:50c0:8003::153` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **CNAME** | `www` | `ansaganie.github.io.` | Auto / 3600 | DNS Only (Grey Cloud)* |
| **TXT** | `_github-pages-challenge-ansaganie` | `<verification-code-from-github>` | Auto | N/A |

*\*Note on Cloudflare Proxy (Orange Cloud)*: If Cloudflare proxy is enabled, you **must** set Cloudflare SSL/TLS encryption mode to **Full** (or Full Strict). Setting it to "Flexible" creates an infinite redirect loop (`ERR_TOO_MANY_REDIRECTS`) because GitHub Pages enforces HTTPS redirection. For initial setup and certificate provisioning, "DNS Only (Grey Cloud)" is recommended.

#### Step 2: Astro Repository Integration
Create a static file in the Astro project root at `public/CNAME` containing exactly one line:
```
ansagan.net
```
When Astro builds, it copies `public/CNAME` directly into `dist/CNAME`. GitHub Pages reads this file upon deployment and binds the custom domain automatically.

#### Step 3: Domain Verification in GitHub
1. In repository: **Settings > Pages > Custom domain**.
2. Under user account: **Settings > Pages > Verified domains > Add a domain**.
3. Add the TXT challenge record provided by GitHub to DNS.
4. Click **Verify**. Once verified, check **Enforce HTTPS**.

---

### 3.2 Cloudflare Pages DNS Blueprint (Alternative Static Hosting)

If deploying the Astro project to **Cloudflare Pages** instead of GitHub Pages:

- **Apex Domain Handling**: Cloudflare utilizes automated **CNAME Flattening** at the zone apex. No manual A records are required.
- **DNS Records**:
  | Type | Name | Target | Proxy Status |
  | :--- | :--- | :--- | :--- |
  | **CNAME** | `@` (apex) | `<project-name>.pages.dev` | Proxied (Orange) |
  | **CNAME** | `www` | `<project-name>.pages.dev` | Proxied (Orange) |
- **SSL Certificate**: Automated Universal SSL certificate generated within 60 seconds; automatic HSTS and TLS 1.3 support.

---

## 4. Architectural Comparison & Trade-Off Matrix

| Dimension | `ansaganie.github.io` (Default) | `ansagan.net` / `ansagan.xyz` | `ansaganie.kz` |
| :--- | :--- | :--- | :--- |
| **Total Annual Cost** | **$0.00 / yr** | **~$11.50 – $12.50 / yr** | **~$55 – $80 / yr** (incl. KZ VPS) |
| **Setup Complexity** | Zero configuration | 10 mins (DNS records + CNAME) | High (VPS setup, Nginx reverse proxy, certbot) |
| **Maintenance Overhead** | Zero | Zero (auto-renew at registrar) | Server patching, monitoring, renewals |
| **Regulatory Risk** | None | None | High (Order No. 38/НҚ compliance checks) |
| **Professional Branding** | High (familiar to developers) | Exceptional (clean apex personal brand) | Regional prestige, but operational liability |
| **SSL / HTTPS** | Automatic (Let's Encrypt) | Automatic (Let's Encrypt / Cloudflare) | Must manage on VPS or hoster |
| **Astro Compatibility** | 100% native | 100% native via `public/CNAME` | Requires custom proxy header handling |

---

## 5. Actionable Implementation Checklist for Ansagan

### Phase 1: Zero-Cost Immediate Deployment (Recommended First Step)
- [ ] Deploy Astro static build directly to GitHub Pages under repository `ansaganie/ansaganie`.
- [ ] Configure Astro configuration `astro.config.mjs`:
  ```javascript
  export default defineConfig({
    site: 'https://ansaganie.github.io',
    // ...
  });
  ```
- [ ] Access site at `https://ansaganie.github.io` with zero DNS delays and full SSL.

### Phase 2: Upgrading to Custom Domain (When Ready)
- [ ] **Selection**: Buy `ansagan.net` (first preference for classic CV authority) or `ansagan.xyz` (modern tech developer identity). Avoid `.kz` due to domestic origin server regulations.
- [ ] **Registrar Choice**:
  - **Option A (Lowest cost, no markups)**: Cloudflare Registrar ($11.86/yr flat for `.net`).
  - **Option B (Easiest checkout with local cards)**: Porkbun ($11.08 first year, $12.52 renewal).
- [ ] **Verification**:
  - Add domain to GitHub account under `Settings > Pages > Verified domains`.
  - Add TXT record `_github-pages-challenge-ansaganie` at DNS provider.
- [ ] **DNS Binding**:
  - Set 4 apex A records (`185.199.108.153` to `.111.153`) and 4 AAAA records.
  - Set `www` CNAME to `ansaganie.github.io.`
- [ ] **Codebase**:
  - Create `public/CNAME` with `ansagan.net`.
  - Update `site` in `astro.config.mjs` to `https://ansagan.net`.
- [ ] **Security**:
  - Enable **Enforce HTTPS** in GitHub repository settings once certificate is issued.

---

## Primary Sources & References

1. **Kazakhstan Network Information Center (KazNIC)**:
   - Official Registry: [nic.kz](https://www.nic.kz)
   - Rules for Registration, Use and Allocation of Domain Space in the Kazakhstan Segment of the Internet ([Adilet Legal Database: Order No. 38/НҚ](https://adilet.zan.kz))
2. **Accredited KZ Registrars**:
   - PS Cloud Services: [ps.kz](https://ps.kz) — *Cloudflare and Origin Server Regulations in Kazakhstan*
   - Hoster.KZ: [hoster.kz](https://hoster.kz) — *Domain Registration and Tariff Pegging to MRP*
3. **ICANN Registrars**:
   - Cloudflare Registrar: [cloudflare.com/products/registrar](https://www.cloudflare.com/products/registrar/) (At-cost pricing model)
   - Porkbun: [porkbun.com](https://porkbun.com)
   - Namecheap: [namecheap.com](https://www.namecheap.com)
4. **Platform Documentation**:
   - GitHub Pages: [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
   - GitHub Pages: [Verifying your custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
   - Cloudflare Pages: [Custom domains documentation](https://developers.cloudflare.com/pages/configuration/custom-domains/)
