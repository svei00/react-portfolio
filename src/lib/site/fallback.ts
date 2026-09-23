import {SITE_COPY} from '@/content/site-copy'
import type {SiteCopy} from './types'

// The coded copy, shaped like what the CMS returns. It is what every page
// shows when the `siteSettings` document is missing, half filled, or Sanity
// cannot be reached (handoff.md section 7, Phase 4 exit criterion: the build
// passes with zero content). The words themselves live in
// src/content/site-copy.ts, which is also what seeded the CMS.

// The two rich-text fields are stored in Sanity as Portable Text blocks, so the
// plain paragraphs in site-copy.ts are wrapped into minimal blocks here: one
// "normal" block per paragraph, no formatting.
function paragraphsToBlocks(paragraphs: readonly string[], keyPrefix: string): SiteCopy['aboutBody'] {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `${keyPrefix}-${index}`,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${keyPrefix}-${index}-span`, text, marks: []}],
  }))
}

export const FALLBACK_COPY: SiteCopy = {
  name: SITE_COPY.name,
  title: SITE_COPY.title,
  location: SITE_COPY.location,
  email: SITE_COPY.email,
  positioningStatement: paragraphsToBlocks(SITE_COPY.positioningStatement, 'statement'),
  aboutBody: paragraphsToBlocks(SITE_COPY.aboutBody, 'about'),
  background: SITE_COPY.background.map((group) => ({label: group.label, items: [...group.items]})),
  skillGroups: SITE_COPY.skillGroups.map((group) => ({label: group.label, skills: [...group.skills]})),
  contactIntro: SITE_COPY.contactIntro,
  socialLinks: SITE_COPY.socialLinks.map((link) => ({...link})),
  seoDescription: SITE_COPY.seoDescription,
}
