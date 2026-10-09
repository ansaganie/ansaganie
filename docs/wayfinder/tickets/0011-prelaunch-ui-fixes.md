# [Task] Fix pre-launch UI bugs: mobile reflow, theme toggle, dark-mode print, landmarks, reduced motion

Part of [Wayfinder Map](../MAP.md)

- **Type**: wayfinder:task (AFK)
- **Status**: completed
- **Assignee**: agent:wayfinder
- **Blocked by**: none

## Question

Fix the P1 UI defects from the [deployment readiness review](../../research/deployment-readiness-review.md) (recommendations 5, 6, 7, 12, 13; findings A1–A5, P2):

- Header overflows horizontally at 320–375 px. The language pills and theme toggle end up off-screen (WCAG 1.4.10).
- When the OS prefers dark, the theme toggle can't reach light mode: `.light` is never set. Expose the toggle's state with `aria-pressed`.
- Printing from dark mode prints pale text on white (about 2.1:1). Reset the tokens to their light values in `@media print`.
- `/cv` has two `banner` landmarks, and no page has a skip link.
- `animate-pulse` and smooth scrolling ignore `prefers-reduced-motion`.

Done when each issue is re-checked in a browser at 320 px, in both themes and in print, and the print budget still holds.

## Resolution

All five defects are fixed and checked with Playwright (Chromium) against `astro dev` and a production build served by `astro preview`. `npm run check` reports 0 errors and 0 warnings, and the build produces 6 pages.

| Defect | Fix | Verified |
| :--- | :--- | :--- |
| Header overflow at phone width | The header row wraps (`flex-wrap`). The language switcher and theme toggle wrap together as a group, the divider is hidden below `sm`, and the header is sticky only from `sm` up, so a 2–3-row mobile header doesn't cover content (`Header.astro`) | `scrollWidth == clientWidth` at 320, 360, 375, 414, 640 and 1280 px on `/`, `/ru/cv`, `/kk/cv`. Before: 454–482 px at 360 |
| Theme toggle can't reach light mode | The init script and the toggle now set exactly one of `.dark` / `.light`, so the `:root:not(.light)` OS fallback only applies when scripts are off. `color-scheme` follows the class, the toggle has `aria-label` "Dark theme" plus `aria-pressed`, and `localStorage` access is wrapped in `try` (`BaseLayout.astro`, `ThemeToggle.astro`, `global.css`) | With the OS set to dark: click → light background, `aria-pressed=false`, `theme=light`. The choice survives a reload. A second click returns to dark |
| Dark-mode print is pale | `@media print` resets every colour token to its light value on `:root`, `:root.dark` and `:root:not(.light)` (`print.css` §0) | Lowest text contrast printed from dark: was 1.05:1 (primary text near-white). Now every text element is ≥ 4.5:1, apart from the decorative `aria-hidden` `\|` separators, which match light mode |
| Two `banner` landmarks, no skip link | Removed `role="banner"` from the CV header and the redundant `role="main"`. Added a localized "Skip to content" link that targets `<main id="main" tabindex="-1">` (`CvContent.astro`, `BaseLayout.astro`, `i18n.ts`) | One banner per page. The first Tab press shows the skip link ("Перейти к содержанию" on `/ru/cv`) |
| Motion ignores reduced-motion | `motion-safe:animate-pulse`. Smooth scrolling only under `prefers-reduced-motion: no-preference` (`global.css`, `Header.astro`, `OverviewContent.astro`) | With `reduce`: `animation-name: none`, `scroll-behavior: auto`. With `no-preference`: `pulse` / `smooth` |

The print budget is unchanged: 1/2/1/2/1/2 A4 pages for `/`, `/cv`, `/ru`, `/ru/cv`, `/kk`, `/kk/cv` in both themes. That matches a baseline build of `1c34953` measured the same way.

### Also fixed (review P2 items, small enough to do here)

- **JS-only controls (recommendation 16)**: the print buttons and theme toggle carry `.js-only`, which stays hidden until the init script adds `html.js`. "Back to Top" is now a plain `<a href="#top">`, and its script is gone. With JS disabled, no button is visible.
- **`lang` on switcher labels (recommendation 23)**: every language pill has `lang="en|ru|kk"`.

### Notes

- Measure print page counts with `emulateMedia({ media: 'print' })` or with no media emulation. `page.pdf()` respects `media: 'screen'`, which inflates the counts to 3/4/5.
- Screenshots and PDFs from this pass are in `scratch/qa/` (gitignored).
