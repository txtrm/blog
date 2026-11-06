// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://txtrm.github.io',
  base: '/blog',
  markdown: {
    shikiConfig: {
      // Choose any VS Code dark theme
      theme: 'nord',
      // Enable line numbers if desired
      wrap: true,
    },
  },
});
