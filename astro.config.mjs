// @ts-ignore
import netlify from '@astrojs/netlify/functions';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://watch-watch-mints.chriswb.dev',
  output: 'server',
  adapter: netlify(),
  integrations: [react()],
});
