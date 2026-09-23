import fs from 'node:fs'
import path from 'node:path'
import projectsJson from '@/content/projects.json'
import type {ProjectCard, ProjectDetail, ProjectPlatform} from './types'

// TEMPORARY BRIDGE — deleted in step 4.6 together with src/content/projects.json.
//
// Until the content is imported into Sanity (scripts/seed-sanity.mts), the
// Work pages would be empty if they read only from Sanity. projects.ts uses
// this file only while Sanity holds zero projects. Once Sanity has content
// this is never consulted; if the CMS later holds zero projects again the site
// shows its empty state, not this file (it will be gone).

type JsonProject = (typeof projectsJson)[number]

const asPlatform = (value: string): ProjectPlatform => value as ProjectPlatform

// A plain-text description becomes one Portable Text paragraph, so the page
// renders the same component for both sources.
const paragraphBlocks = (text: string): ProjectDetail['description'] => [
  {
    _type: 'block',
    _key: 'json-description',
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: 'json-description-span', text, marks: []}],
  },
]

// The JSON lists a cover path for every project, but three screenshots do not
// exist yet. Mirror what the Sanity path does for a project with no cover
// (null, which renders the placeholder) instead of pointing <Image> at a
// missing file and causing a 404 + broken image on every visit.
function coverFromJson(project: JsonProject): ProjectCard['coverImage'] {
  const file = path.join(process.cwd(), 'public', project.coverImage.src)
  if (!fs.existsSync(file)) return null
  return {url: project.coverImage.src, alt: project.coverImage.alt}
}

export function cardFromJson(project: JsonProject): ProjectCard {
  return {
    slug: project.slug,
    title: project.title,
    summary: project.summary,
    platform: asPlatform(project.platform),
    year: project.year,
    techStack: project.techStack,
    coverImage: coverFromJson(project),
  }
}

export function detailFromJson(project: JsonProject): ProjectDetail {
  return {
    ...cardFromJson(project),
    description: paragraphBlocks(project.description),
    liveUrl: project.liveUrl,
    repoUrl: project.repoUrl,
    gallery: [],
  }
}

export const jsonProjects: JsonProject[] = [...projectsJson].sort(
  (a, b) => a.orderRank - b.orderRank,
)
