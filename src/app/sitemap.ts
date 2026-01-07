import type { MetadataRoute } from 'next'
import projects from '@/content/projects.json'

const BASE_URL = 'https://portfolio.excelsolutionsv.com'

const STATIC_ROUTES = ['/', '/about', '/work', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))

  const projectEntries = projects.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: new Date(),
  }))

  return [...staticEntries, ...projectEntries]
}
