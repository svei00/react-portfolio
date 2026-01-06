// Shaped to match the Phase 4 Sanity `project` schema exactly (handoff.md
// §9), so that migration is a data-source swap — read from Sanity via
// GROQ instead of this JSON file — with no changes needed to the
// components that render a Project. `description` is a plain string for
// now; Phase 4 replaces it with real Portable Text blocks and updates the
// one place that renders it.
export type Project = {
  title: string
  slug: string
  summary: string
  description: string
  coverImage: {
    src: string
    alt: string
  }
  gallery: Array<{ src: string; alt: string }>
  techStack: string[]
  liveUrl: string | null
  repoUrl: string | null
  featured: boolean
  orderRank: number
}
