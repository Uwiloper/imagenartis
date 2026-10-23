import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: 'https://imagenartis.pe',
  adapter: isDev ? node({ mode: 'standalone' }) : cloudflare(),
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/admin'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    server: {
      watch: {
        ignored: ['**/.git/**', '**/.git_old/**', '**/dist/**', '**/.claude/**', '**/.wrangler/**'],
      },
    },
  },
});
