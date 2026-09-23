import type {PortableTextProps} from '@portabletext/react'

// What the Work pages render. Deliberately independent of where the data came
// from (Sanity, or the temporary JSON bridge in from-json.ts), so the views
// never need to know — and 4.6 can delete the bridge without touching them.
//
// The Portable Text type is derived from @portabletext/react, a direct
// dependency, rather than imported from @portabletext/types, which is only a
// transitive one (the prop-types incident in notes.md entry 73 is why).
export type PortableTextBlocks = PortableTextProps['value']

export type WorkImage = {
  url: string
  alt: string
}

export type ProjectPlatform = 'web' | 'mobile' | 'desktop'

// Everything the Work grid needs.
export type ProjectCard = {
  slug: string
  title: string
  summary: string
  platform: ProjectPlatform
  year: number
  techStack: string[]
  // null when the project has no cover yet: the grid shows a placeholder frame.
  coverImage: WorkImage | null
}

// Everything a project's own page needs.
export type ProjectDetail = ProjectCard & {
  description: PortableTextBlocks
  liveUrl: string | null
  repoUrl: string | null
  gallery: WorkImage[]
}
