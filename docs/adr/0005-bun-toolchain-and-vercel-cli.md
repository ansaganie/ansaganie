# Bun Toolchain and Vercel CLI (Supersedes ADR 0003)

We migrated the project's runtime, package manager, and CLI execution toolchain from Deno and Node to Bun. Bun reads `package.json` natively, produces a text-based `bun.lock`, pins runtime versions via `.bun-version`, and executes Astro, Tailwind 4, `astro-check`, and internal build scripts without runtime translation overhead. In CI (`.github/workflows/deploy.yml`), `oven-sh/setup-bun@v2` replaces both `denoland/setup-deno` and `actions/setup-node`, and the Vercel CLI runs directly under Bun via `bun x --bun vercel@63`, resolving the dual-toolchain split introduced in ADR 0003.

## Considered Options

- **Keep Deno for site builds and Node 24 for Vercel CLI (ADR 0003)**: preserved stability during the initial launch, but maintained cognitive overhead and two separate runtime setup actions in CI.
- **Node.js only with npm/pnpm**: standard ecosystem default, but rejected by owner preference in favor of high-performance modern runtimes.
- **Bun for site builds, Node for Vercel CLI**: unnecessary because Bun executes Vercel CLI via `bun x --bun` without hanging, allowing full elimination of Node from the pipeline.

## Consequences

- Contributors need Bun (version pinned in `.bun-version`, matching `packageManager` in `package.json`). Deno is no longer required.
- `.dvmrc` and `deno.lock` are removed; `bun.lock` is committed to version control.
- Script invocations use `bun run <script>` (e.g., `bun run build`, `bun run check`, `bun run generate:pdf`, `bun run generate:images`, `bun run submit:indexnow`).
- `vercel.json` defines `installCommand: bun install --frozen-lockfile` and `buildCommand: bun run build`.
- CI job execution is unified under a single setup step (`oven-sh/setup-bun@v2`) with a 15-minute fail-fast timeout and output artifact verification.
