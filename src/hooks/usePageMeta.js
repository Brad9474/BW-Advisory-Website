import { useEffect } from 'react';
import { getPageMeta, SITE } from '../seo/pageMeta';

const setMeta = (selector, attr, value) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

// Updates document head per route. The SPA ships a single static index.html,
// so without this every route serves the homepage's title/description and —
// critically — the homepage's canonical URL, which tells search engines every
// other page is a duplicate of "/" and can keep them out of the index.
export default function usePageMeta(pathname) {
  useEffect(() => {
    const { title, description, noindex } = getPageMeta(pathname);
    const url = `${SITE}${pathname}`;

    document.title = title;
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, follow' : 'index, follow');
  }, [pathname]);
}
