import {urlFor} from '@/sanity/image'
import type {PROJECT_QUERY_RESULT, PROJECTS_QUERY_RESULT} from '@/sanity/types'
import type {ProjectCard, ProjectDetail, WorkImage} from './types'

// Cover width requested from Sanity's CDN. next/image then resizes again for
// each device, so this only needs to be comfortably larger than the biggest
// slot (the 16:9 hero on a project page).
const IMAGE_WIDTH = 1600

type SanityImageField = {
  image: {asset: unknown; crop: unknown; hotspot: unknown} | null
  alt: string | null
} | null

// The generated types say a required field is always present, but a document
// can be saved without one (the seed script creates projects before their
// screenshots exist, and drafts can be invalid), so this checks at runtime too
// and returns null instead of crashing the page.
function toWorkImage(field: SanityImageField): WorkImage | null {
  if (!field?.image?.asset) return null
  return {
    url: urlFor(field.image as Parameters<typeof urlFor>[0])
      .width(IMAGE_WIDTH)
      .url(),
    alt: field.alt ?? '',
  }
}

export function cardFromSanity(project: PROJECTS_QUERY_RESULT[number]): ProjectCard {
  return {
    slug: project.slug,
    title: project.title ?? 'Untitled project',
    summary: project.summary ?? '',
    platform: project.platform,
    year: project.year,
    techStack: project.techStack ?? [],
    coverImage: toWorkImage(project.coverImage),
  }
}

export function detailFromSanity(project: NonNullable<PROJECT_QUERY_RESULT>): ProjectDetail {
  return {
    slug: project.slug,
    title: project.title ?? 'Untitled project',
    summary: project.summary ?? '',
    platform: project.platform,
    year: project.year,
    techStack: project.techStack ?? [],
    coverImage: toWorkImage(project.coverImage),
    description: (project.description ?? []) as ProjectDetail['description'],
    liveUrl: project.liveUrl ?? null,
    repoUrl: project.repoUrl ?? null,
    gallery: (project.gallery ?? [])
      .map((item) => toWorkImage(item))
      .filter((image): image is WorkImage => image !== null),
  }
}
