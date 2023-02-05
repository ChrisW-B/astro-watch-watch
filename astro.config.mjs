// @ts-ignore
import netlify from '@astrojs/netlify/functions';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://watch-watch-mints.chriswb.dev',
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
});
