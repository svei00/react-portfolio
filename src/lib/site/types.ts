import type {PortableTextBlocks} from '@/lib/work/types'

// The shared copy the pages render, as plain data. Same idea as
// src/lib/work/types.ts: components never see a raw Sanity result, so they
// also never need to know whether a value came from the CMS or from the coded
// fallback in src/content/site-copy.ts.

export type BackgroundGroup = {
  label: string
  items: string[]
}

export type SkillGroup = {
  label: string
  skills: string[]
}

export type SocialLink = {
  label: string
  url: string
}

export type SiteCopy = {
  name: string
  title: string
  location: string
  email: string
  positioningStatement: PortableTextBlocks
  aboutBody: PortableTextBlocks
  background: BackgroundGroup[]
  skillGroups: SkillGroup[]
  contactIntro: string
  socialLinks: SocialLink[]
  seoDescription: string
}
