import type { MetadataRoute } from 'next'

// The old public/robots.txt allowed everything but pointed at no sitemap
// (handoff.md §4.8). This is the same permissive policy, now with the
// sitemap reference it was missing.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://portfolio.excelsolutionsv.com/sitemap.xml',
  }
}
