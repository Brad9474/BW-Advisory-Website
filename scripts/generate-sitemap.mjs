// Regenerates public/sitemap.xml from the route list in src/App.jsx so it
// cannot drift. Run automatically as a `prebuild` step — see package.json.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = 'https://bwadvisorysolutions.com.au';
const PURCHASE_SURFACE_ENABLED = process.env.VITE_PURCHASE_SURFACE_ENABLED === 'true';

// Every route in src/App.jsx, excluding purchase result pages (never indexable)
// and, until the purchase surface launches, /pricing and /solution-map.
const ALWAYS_EXCLUDED = new Set(['/purchase/confirmed', '/purchase/cancelled']);
const GATED_ROUTES = new Set(['/pricing', '/solution-map']);

const ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/loss-intelligence', priority: '0.8', changefreq: 'monthly' },
  { path: '/diagnostics', priority: '0.8', changefreq: 'monthly' },
  { path: '/investigations', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/ai-readiness', priority: '0.7', changefreq: 'monthly' },
  { path: '/consultation', priority: '0.7', changefreq: 'monthly' },
  { path: '/strategic-diagnostic', priority: '0.6', changefreq: 'monthly' },
  { path: '/operational-diagnostic', priority: '0.6', changefreq: 'monthly' },
  { path: '/loss-intelligence-diagnostic', priority: '0.6', changefreq: 'monthly' },
  { path: '/investigations-diagnostic', priority: '0.6', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.7', changefreq: 'monthly' },
  { path: '/solution-map', priority: '0.7', changefreq: 'monthly' },
  { path: '/purchase/confirmed', priority: '0.1', changefreq: 'yearly' },
  { path: '/purchase/cancelled', priority: '0.1', changefreq: 'yearly' },
];

const today = new Date().toISOString().slice(0, 10);

const urls = ROUTES
  .filter((r) => !ALWAYS_EXCLUDED.has(r.path))
  .filter((r) => PURCHASE_SURFACE_ENABLED || !GATED_ROUTES.has(r.path))
  .map((r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`[sitemap] wrote ${ROUTES.length - (PURCHASE_SURFACE_ENABLED ? 2 : 4)} URLs to public/sitemap.xml`);
