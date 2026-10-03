import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://ansaganie.github.io',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ru', 'kk'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
