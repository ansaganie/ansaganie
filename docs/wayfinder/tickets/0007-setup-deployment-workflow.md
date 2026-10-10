# [Task] Set up the GitHub Actions → Vercel deployment workflow

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (HITL for the account steps, AFK for the workflow)
- **Status**: in progress
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

Remaining (HITL, owner):

- [ ] Create a Vercel access token (scope `ansaganie-projects`) and add the repo secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` (values above).
- [ ] Push the branch and open a PR. Check that the workflow posts a protected preview URL.
- [ ] Merge to `main`. Check that `https://ansaganie.vercel.app` serves production publicly and that the README links resolve.
