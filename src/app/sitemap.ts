import type { MetadataRoute } from 'next'

const BASE_URL = 'https://portfolio.excelsolutionsv.com'

const ROUTES = ['/', '/about', '/skills', '/portfolio', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))
}
