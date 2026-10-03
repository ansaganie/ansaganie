import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-bg-canvas)',
        surface: {
          1: 'var(--color-surface-1)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
          inset: 'var(--color-surface-inset)',
          overlay: 'var(--color-surface-overlay)',
        },
        border: {
          hairline: 'var(--color-border-hairline)',
          subtle: 'var(--color-border-subtle)',
          default: 'var(--color-border-default)',
          strong: 'var(--color-border-strong)',
          control: 'var(--color-border-control)',
          focus: 'var(--color-border-focus)',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        brand: {
          DEFAULT: 'var(--color-accent-brand)',
          bg: 'var(--color-accent-brand-bg)',
        },
        status: {
          success: 'var(--color-status-success)',
          'success-bg': 'var(--color-status-success-bg)',
          warning: 'var(--color-status-warning)',
          'warning-bg': 'var(--color-status-warning-bg)',
          danger: 'var(--color-status-danger)',
          'danger-bg': 'var(--color-status-danger-bg)',
          info: 'var(--color-status-info)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Source Sans 3', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    typography,
  ],
};
