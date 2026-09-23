import type {MetadataRoute} from 'next'
import {getProjectSlugs} from '@/lib/work/projects'

const BASE_URL = 'https://portfolio.excelsolutionsv.com'

const STATIC_ROUTES = ['/', '/about', '/work', '/excel-lab', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }))

  const projectSlugs = await getProjectSlugs()
  const projectEntries = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/work/${slug}`,
    lastModified: new Date(),
  }))

  return [...staticEntries, ...projectEntries]
}
