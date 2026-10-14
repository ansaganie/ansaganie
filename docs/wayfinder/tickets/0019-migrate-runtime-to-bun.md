# [Task] Migrate runtime and Vercel CLI to Bun.js

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: none

## Context

The repository previously ran on Deno for local development and build tasks, while using Node 24 in CI solely to run the Vercel CLI because `vercel deploy` hung under Deno ([ADR 0003](../../adr/0003-deno-toolchain.md)).

## Scope

1. Replace Deno and Node with Bun (`1.4.2`), pinned via `.bun-version` and declared in `package.json` (`"packageManager": "bun@1.4.2"`).
2. Remove `.dvmrc` and `deno.lock`; track `bun.lock`.
3. Update package scripts and helper scripts (`scripts/generate-pdf.mjs`, `scripts/generate-images.mjs`, `scripts/submit-indexnow.mjs`) to run with Bun.
4. Update `vercel.json` commands to `bun install --frozen-lockfile` and `bun run build`.
5. Update `.github/workflows/deploy.yml` to use `oven-sh/setup-bun@v2` and run Vercel CLI directly under Bun via `bun x --bun vercel@63`.
6. Record ADR 0005 (`0005-bun-toolchain-and-vercel-cli.md`) superseding ADR 0003, and update `CLAUDE.md`.

## Resolution (2026-10-14)

Completed migration of runtime and Vercel CLI to Bun.js 1.4.2:
- Pinned Bun `1.4.2` in `.bun-version` and declared `"packageManager": "bun@1.4.2"` in `package.json`.
- Removed `.dvmrc` and `deno.lock`; committed `bun.lock`.
- Updated package scripts and `scripts/generate-pdf.mjs` to run under Bun.
- Configured `vercel.json` with `bun install --frozen-lockfile` and `bun run build`.
- Updated `.github/workflows/deploy.yml` with `oven-sh/setup-bun@v2`, removed `setup-node` / `setup-deno`, and set `VERCEL: bun x --bun vercel@63`.
- Authored ADR 0005 superseding ADR 0003 and updated `CLAUDE.md` and `MAP.md`.
- Verified `bun install --frozen-lockfile`, `bun run check`, `bun run build`, and script executions pass cleanly.
