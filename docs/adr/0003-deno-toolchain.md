# Deno Toolchain Instead of Node.js

> **Status: Superseded by [ADR 0005](0005-bun-toolchain-and-vercel-cli.md)**

The owner chose Deno over Node.js to run the site locally and in the deploy pipeline. Deno 2 reads `package.json` directly: `deno install` fills `node_modules`, and `deno task` runs the `package.json` scripts with `node_modules/.bin` tools resolved, so Astro, Tailwind 4 and astro-check need no source changes. `package.json` stays the dependency manifest and script list, `deno.lock` replaces `package-lock.json`, and `.dvmrc` pins one Deno version for local use and for `denoland/setup-deno` in CI. In the GitHub Actions deploy (ADR 0002), `vercel.json` sets `installCommand: deno install --frozen` and `buildCommand: deno task build`, and the Vercel CLI runs on Node as `npx vercel@63` (see the 2026-10-10 update below). Deno builds the site, and Node runs only the Vercel CLI.

Verified on 2026-10-10 with Deno 2.9.7 (Windows ARM64) and Node removed from `PATH`: `check`, `build`, `dev`, `generate:pdf` and the CLI's `vercel pull` + `vercel build` all ran. The built HTML and CSS matched the earlier Node build apart from the Astro version in the generator meta tag.

## Considered Options

- **Stay on Node with npm**: the default for Astro and what Vercel assumes. Rejected by owner preference.
- **Deno for the build, Node for the Vercel CLI**: the planned fallback if the CLI didn't run under Deno. Adopted after the first CI run, see the update below.
- **Everything under Deno, including the Vercel CLI**: the first choice. `vercel pull` and `vercel build` worked, but `vercel deploy --prebuilt` hung in CI (run 38034478935) without creating a deployment.
- **Move dependencies into `deno.json` imports**: rejected. Astro, Vite and editor tooling expect a `package.json`, and Deno supports it fully.

## Consequences

- Contributors need Deno (version in `.dvmrc`). `npm`/`npx` commands in older tickets and research notes are historical.
- Deno resolves fresh within `package.json` ranges, so the switch moved `astro` from 7.3.5 to 7.3.8. Upgrades now go through `deno install` / `deno outdated`.
- Deno skips npm lifecycle scripts. None are needed today. If a dependency that needs one is added, approve it with `--allow-scripts=npm:<pkg>` in the install command (locally, in the workflow and in `vercel.json`).
- Vercel's own Git builds would need Deno on Vercel's build image. They're off (ADR 0002), so builds only run on GitHub's runners, where `setup-deno` provides it.

## Update (2026-10-10)

The local check above covered `vercel pull` and `vercel build` but not `vercel deploy`. In the first CI run, `deno run -A npm:vercel@63 deploy --prebuilt` hung for more than 15 minutes and never created a deployment, while `pull` and `build` finished in seconds. The workflow now installs Node 24 with `actions/setup-node` and runs the CLI as `npx --yes vercel@63`. The project itself still installs and builds with Deno: `vercel build` runs the `deno install --frozen` and `deno task build` commands from `vercel.json`. The job has a 15-minute timeout so a hang fails fast.
