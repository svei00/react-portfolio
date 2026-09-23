import type {SITE_SETTINGS_QUERY_RESULT} from '@/sanity/types'
import {FALLBACK_COPY} from './fallback'
import type {BackgroundGroup, SiteCopy, SkillGroup, SocialLink} from './types'

// Combines the `siteSettings` document with the coded fallback, FIELD BY FIELD:
// a field the editor filled in wins; a field that is missing, empty, or only
// whitespace falls back to the coded copy. So a half-filled document never
// blanks part of a page, and clearing a field in the Studio brings back the
// default instead of leaving a hole.
//
// Pure functions on purpose (no fetching here), so every rule below can be
// checked with plain data.

function textOrFallback(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim()
  return trimmed ? trimmed : fallback
}

// Rich text counts as filled only if it is a non-empty list of blocks.
function blocksOrFallback<T>(value: unknown, fallback: T): T {
  return Array.isArray(value) && value.length > 0 ? (value as T) : fallback
}

function validBackgroundGroups(groups: NonNullable<SITE_SETTINGS_QUERY_RESULT>['background']): BackgroundGroup[] {
  return (groups ?? [])
    .map((group) => ({
      label: group.label?.trim() ?? '',
      items: (group.items ?? []).map((item) => item.trim()).filter(Boolean),
    }))
    .filter((group) => group.label && group.items.length > 0)
}

function validSkillGroups(groups: NonNullable<SITE_SETTINGS_QUERY_RESULT>['skillGroups']): SkillGroup[] {
  return (groups ?? [])
    .map((group) => ({
      label: group.label?.trim() ?? '',
      skills: (group.skills ?? []).map((skill) => skill.trim()).filter(Boolean),
    }))
    .filter((group) => group.label && group.skills.length > 0)
}

// Only https links are rendered: the footer puts these straight into href.
function validSocialLinks(links: NonNullable<SITE_SETTINGS_QUERY_RESULT>['socialLinks']): SocialLink[] {
  return (links ?? [])
    .map((link) => ({label: link.label?.trim() ?? '', url: link.url?.trim() ?? ''}))
    .filter((link) => link.label && link.url.startsWith('https://'))
}

function listOrFallback<T>(list: T[], fallback: T[]): T[] {
  return list.length > 0 ? list : fallback
}

export function mergeSiteCopy(settings: SITE_SETTINGS_QUERY_RESULT): SiteCopy {
  if (!settings) return FALLBACK_COPY

  return {
    name: textOrFallback(settings.name, FALLBACK_COPY.name),
    title: textOrFallback(settings.title, FALLBACK_COPY.title),
    location: textOrFallback(settings.location, FALLBACK_COPY.location),
    email: textOrFallback(settings.email, FALLBACK_COPY.email),
    positioningStatement: blocksOrFallback(settings.positioningStatement, FALLBACK_COPY.positioningStatement),
    aboutBody: blocksOrFallback(settings.aboutBody, FALLBACK_COPY.aboutBody),
    background: listOrFallback(validBackgroundGroups(settings.background), FALLBACK_COPY.background),
    skillGroups: listOrFallback(validSkillGroups(settings.skillGroups), FALLBACK_COPY.skillGroups),
    contactIntro: textOrFallback(settings.contactIntro, FALLBACK_COPY.contactIntro),
    socialLinks: listOrFallback(validSocialLinks(settings.socialLinks), FALLBACK_COPY.socialLinks),
    seoDescription: textOrFallback(settings.seoDescription, FALLBACK_COPY.seoDescription),
  }
}
