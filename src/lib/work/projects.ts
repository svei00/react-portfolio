import {sanityFetch} from '@/sanity/fetch'
import {PROJECT_QUERY, PROJECT_SLUGS_QUERY, PROJECTS_QUERY} from '@/sanity/queries'
import {cardFromJson, detailFromJson, jsonProjects} from './from-json'
import {cardFromSanity, detailFromSanity} from './from-sanity'
import type {ProjectCard, ProjectDetail} from './types'

// The Work pages' only data access. Everything the pages need from "projects"
// comes through these three functions.
//
// Source rule (temporary, until step 4.6): if Sanity holds at least one
// published project, Sanity is the source; if it holds none yet, the JSON
// bridge is. Deciding once per call from the slug list keeps the two sources
// from ever mixing. Fetches are deduplicated within a render by Next, so the
// extra slug query is free.

const PROJECT_TAGS = ['project']

async function sanitySlugs(): Promise<string[]> {
  const rows = await sanityFetch({query: PROJECT_SLUGS_QUERY, tags: PROJECT_TAGS})
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug))
}

async function sanityIsSeeded(): Promise<boolean> {
  return (await sanitySlugs()).length > 0
}

export async function getProjectSlugs(): Promise<string[]> {
  if (await sanityIsSeeded()) return sanitySlugs()
  return jsonProjects.map((project) => project.slug)
}

export async function getProjects(): Promise<ProjectCard[]> {
  if (await sanityIsSeeded()) {
    const rows = await sanityFetch({query: PROJECTS_QUERY, tags: PROJECT_TAGS})
    return rows.map(cardFromSanity)
  }
  return jsonProjects.map(cardFromJson)
}

// null when no such project exists (the page then calls notFound()).
export async function getProject(slug: string): Promise<ProjectDetail | null> {
  if (await sanityIsSeeded()) {
    const row = await sanityFetch({query: PROJECT_QUERY, params: {slug}, tags: PROJECT_TAGS})
    return row ? detailFromSanity(row) : null
  }
  const project = jsonProjects.find((item) => item.slug === slug)
  return project ? detailFromJson(project) : null
}
