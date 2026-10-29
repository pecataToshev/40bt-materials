import { defineConfig } from 'astro/config';

// Локално (npm run dev) сайтът е на корена. В CI (GitHub Actions) base и site
// се подават от deploy.yml, за да работи на https://<user>.github.io/<repo>/
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
});
