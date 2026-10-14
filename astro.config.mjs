import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  adapter: isDev ? node({ mode: 'standalone' }) : cloudflare(),
  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});