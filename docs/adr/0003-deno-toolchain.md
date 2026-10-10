# Deno Toolchain Instead of Node.js

The owner chose Deno over Node.js to run the site locally and in the deploy pipeline. Deno 2 reads `package.json` directly: `deno install` fills `node_modules`, and `deno task` runs the `package.json` scripts with `node_modules/.bin` tools resolved, so Astro, Tailwind 4 and astro-check need no source changes. `package.json` stays the dependency manifest and script list, `deno.lock` replaces `package-lock.json`, and `.dvmrc` pins one Deno version for local use and for `denoland/setup-deno` in CI. In the GitHub Actions deploy (ADR 0002), `vercel.json` sets `installCommand: deno install --frozen` and `buildCommand: deno task build`, and the Vercel CLI itself runs as `deno run -A npm:vercel@63`. No step needs Node.

Verified on 2026-10-10 with Deno 2.9.7 (Windows ARM64) and Node removed from `PATH`: `check`, `build`, `dev`, `generate:pdf` and the CLI's `vercel pull` + `vercel build` all ran. The built HTML and CSS matched the earlier Node build apart from the Astro version in the generator meta tag.

## Considered Options

- **Stay on Node with npm**: the default for Astro and what Vercel assumes. Rejected by owner preference.
- **Deno for the build, Node for the Vercel CLI**: the planned fallback if the CLI didn't run under Deno. It did, so it wasn't needed.
- **Move dependencies into `deno.json` imports**: rejected. Astro, Vite and editor tooling expect a `package.json`, and Deno supports it fully.

## Consequences

- Contributors need Deno (version in `.dvmrc`). `npm`/`npx` commands in older tickets and research notes are historical.
- Deno resolves fresh within `package.json` ranges, so the switch moved `astro` from 7.3.5 to 7.3.8. Upgrades now go through `deno install` / `deno outdated`.
- Deno skips npm lifecycle scripts. None are needed today. If a dependency that needs one is added, approve it with `--allow-scripts=npm:<pkg>` in the install command (locally, in the workflow and in `vercel.json`).
- Vercel's own Git builds would need Deno on Vercel's build image. They're off (ADR 0002), so builds only run on GitHub's runners, where `setup-deno` provides it.
