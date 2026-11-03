// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  markdown: {
    shikiConfig: {
      // Choose any VS Code dark theme
      theme: 'nord',
      // Enable line numbers if desired
      wrap: true,
    },
  },
});
