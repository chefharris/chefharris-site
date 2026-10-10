// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFileSync } from 'node:fs';
import { SITE } from './src/site.config.ts';

// SITE_URL / BASE_PATH come from the GitHub Actions workflow.
// Preview (default):  https://<account>.github.io + /chefharris-site
// Production:         https://chefharris.ch + /
const site = process.env.SITE_URL ?? SITE.productionUrl;
const base = process.env.BASE_PATH ?? '/';
const isProduction = site === SITE.productionUrl;

/** Markdown links written as "/app" or "/about" get the base path prefixed. */
function rehypeBaseLinks() {
  const prefix = base.endsWith('/') ? base.slice(0, -1) : base;
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a') {
      const href = node.properties?.href;
      if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
        node.properties.href = prefix + href;
      }
    }
    for (const child of node.children ?? []) walk(child);
  };
  return (tree) => walk(tree);
}

/** Writes the CNAME file GitHub Pages reads for the custom domain (production builds only). */
function cname() {
  return {
    name: 'cname',
    hooks: {
      'astro:build:done': ({ dir }) => {
        if (isProduction) writeFileSync(new URL('CNAME', dir), new URL(site).hostname + '\n');
      },
    },
  };
}

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap(), cname()],
  markdown: { rehypePlugins: [rehypeBaseLinks] },
  vite: { define: { __IS_PRODUCTION__: JSON.stringify(isProduction) } },
});
