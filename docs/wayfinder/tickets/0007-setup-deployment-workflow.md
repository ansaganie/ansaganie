# [Task] Set up the GitHub Actions → Vercel deployment workflow

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (HITL for the account steps, AFK for the workflow)
- **Status**: completed
- **Assignee**: Ansagan Islamgali (Claude session)
- **Blocked by**: none (#0005, #0008, #0009, #0010 are closed)

## Question

Build the deploy pipeline decided in [Hosting topology](0008-hosting-topology.md) and [ADR 0002](../../adr/0002-vercel-hosting-via-github-actions.md): GitHub Actions in this repo deploy to Vercel at `https://ansaganie.vercel.app`.

### Owner steps (HITL)

1. Re-authorize the Vercel connector for the `ansaganie-projects` scope, or run `vercel login` after installing the CLI.
2. Create the Vercel project `ansaganie` (framework: Astro) **without** connecting the Git repo. Check that it gets `ansaganie.vercel.app`.
3. Create a Vercel access token, then add these repo secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID` (`team_3rHWKlDpx4eLJk04X4X5qthL`) and `VERCEL_PROJECT_ID`.
4. Leave Vercel Authentication on for preview deployments.

### Workflow (AFK)

- `vercel.json`: `"git": { "deploymentEnabled": false }`. Add trailing-slash settings only if [SEO launch basics](0012-seo-launch-basics.md) needs them.
- `.github/workflows/deploy.yml`:
  - **On `pull_request`**: `npm ci` → `npm run check` → `vercel pull --environment=preview` → `vercel build` → `vercel deploy --prebuilt`, then comment the preview URL on the PR.
  - **On push to `main` and `workflow_dispatch`**: the same checks, then `vercel pull --environment=production` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.
  - Use `permissions: contents: read` (plus `pull-requests: write` for the comment) and a concurrency group per ref.
- Set `site: 'https://ansaganie.vercel.app'` in `astro.config.mjs`, and update the fallback in `BaseLayout.astro`.
- Change the Profile README badges and the website link to `https://ansaganie.vercel.app`.
- Check that `dist/` keeps the committed PDFs under `/cv/` and that the build emits a single CSS bundle (the `generate:pdf` assumption still holds).

Done when a merge to `main` produces a live production deploy, a test PR gets a protected preview URL, and the README links resolve.

## Progress (2026-10-10)

Done:

- [x] Owner step 1: the Vercel CLI (63.1.2) is logged in as `ansaganie`, with scope `ansaganie-projects`. The Vercel MCP connector still gets a 403 on that scope, so use the CLI.
- [x] Owner step 2: created the project `ansaganie` with no Git connection. `VERCEL_PROJECT_ID` = `prj_R0C7OuID2jnf3RaxuetalJD9hS9X`, `VERCEL_ORG_ID` = `team_3rHWKlDpx4eLJk04X4X5qthL`. The repo is linked locally (`.vercel/`, gitignored). `ansaganie.vercel.app` returned 404 (unclaimed) before the first deploy.
- [x] Owner step 4: the new project defaults to Standard Protection (`ssoProtection.deploymentType = all_except_custom_domains`). Production domains, including `ansaganie.vercel.app`, stay public, and previews and deployment URLs need Vercel Authentication. Nothing to change.
- [x] `vercel.json`: `framework: astro` and `git.deploymentEnabled: false`. Trailing-slash settings are left to [SEO launch basics](0012-seo-launch-basics.md).
- [x] `.github/workflows/deploy.yml`: one job. PRs deploy a preview and post or update a single comment with the URL. Push to `main` and `workflow_dispatch` deploy production. Every run does `deno install --frozen` → `deno task check` → `vercel pull` → `vercel build` → an output check (exactly 1 CSS bundle, 3 PDFs under `/cv/`) → `vercel deploy --prebuilt`. Fork PRs are skipped because they get no secrets. The concurrency group is per ref, and only PR runs cancel in-progress runs.
- [x] `site` and the `BaseLayout` fallback point to `https://ansaganie.vercel.app`, and the README badges and website link do too, using `/cv/` with a trailing slash to match ticket 0012's `always` policy. The origin appears only in head metadata, so the PDFs don't need regenerating.
- [x] Verified locally: `npm run check` (0 errors) and `npm run build` pass, and canonical URLs are `https://ansaganie.vercel.app/...`. A local `vercel pull --environment=preview` and `vercel build` produce Astro output that passes the workflow's output check.
- [x] Switched the toolchain to Deno ([ADR 0003](../../adr/0003-deno-toolchain.md)). The workflow uses `denoland/setup-deno` (version from `.dvmrc`) and runs the Vercel CLI as `deno run -A npm:vercel@63`, and `vercel.json` sets the Deno install and build commands. Re-verified with Node off `PATH`: check, build, dev, `generate:pdf`, and the CLI's `vercel pull` + `vercel build` with the output check passing. The regenerated PDFs belong in the same commit, because afdf779 had changed `CvContent` and `print.css` without regenerating them.

- [x] Owner step 3: the repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are set (owner-confirmed).
- [x] Pre-push review: the pinned actions (`checkout@v7`, `setup-deno@v2` with `deno-version-file`/`cache`, `github-script@v9`) and Deno 2.9.7 for Linux all exist. `deno.lock` has the linux-x64 native bindings, and a clean copy passes `deno install --frozen`. Running `npm:vercel@63` leaves the lockfile untouched, so the second frozen install inside `vercel build` passes too. Two fixes: a manual run now deploys only from `main`, not from any branch, and the production environment URL is `https://ansaganie.vercel.app`, because Standard Protection keeps the production deployment URL that `vercel deploy` prints private.
- [x] First PR run ([38034478935](https://github.com/ansaganie/ansaganie/actions/runs/38034478935)): everything through the output check passed in about 20s, but `vercel deploy --prebuilt` under Deno hung for more than 15 minutes, and Vercel listed no deployments. The workflow now runs the Vercel CLI on Node 24 (`actions/setup-node`, `npx --yes vercel@63`). The project still installs and builds with Deno, and the job has a 15-minute timeout. ADR 0003 has an update recording this.

- [x] Second PR run ([38035781719](https://github.com/ansaganie/ansaganie/actions/runs/38035781719)): green in 53s, and the PR comment has the deployment URL, which redirects to Vercel login. Vercel assigns a project's first deployment to production, so this PR build was aliased to `https://ansaganie.vercel.app`, which now returns 200 publicly. This was a one-time effect: the CLI says later deploys without `--prod` are previews.

- [x] Merged PR #2 (`0eb00b2`). The push run ([38036193357](https://github.com/ansaganie/ansaganie/actions/runs/38036193357)) passed in 44s and ran `vercel deploy --prebuilt --prod`. Vercel lists the new deployment as Production, aliased to `https://ansaganie.vercel.app`.
- [x] Checked production with Playwright (2026-10-10):
  - **Pages**: all six (`/`, `/cv/`, `/ru/`, `/ru/cv/`, `/kk/`, `/kk/cv/`) return 200 without login, with the right `lang`, localized title and `h1`, a canonical on `https://ansaganie.vercel.app/...`, hreflang en/ru/kk/x-default, valid JSON-LD, the CSS bundle applied, and no broken images.
  - **Links**: every internal link returns 200. That includes the README links (`/`, `/cv/`, `/ru/cv/`, `/kk/cv/`) and the three PDFs, served as `application/pdf` at the same byte sizes as the committed files.
  - **UI**: the theme toggle switches `.dark` and stores it in `localStorage`. The Overview renders at 1024 px and the RU CV at 390 px.
  - **Console**: the only error is a 404 for `/favicon.ico`.
- Follow-up: the first PR after this one should show a Vercel deploy listed as **Preview**, not Production (the first-deployment rule no longer applies).
- Gaps seen on production that already belong to [SEO launch basics](0012-seo-launch-basics.md): no favicon, `robots.txt` and the sitemap return 404, unknown paths get Vercel's default 404 page, and both `/cv` and `/cv/` return 200 (nav and hreflang use the slashless form, canonical uses the slash).
