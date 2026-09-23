import {sanityFetch} from '@/sanity/fetch'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {FALLBACK_COPY} from './fallback'
import {mergeSiteCopy} from './merge'
import type {SiteCopy} from './types'

const SITE_SETTINGS_TAGS = ['siteSettings']

// The shared copy for the page being rendered: the `siteSettings` document,
// field by field over the coded fallback. Several parts of one page ask for it
// (the layout's metadata, the footer, the page itself); Next de-duplicates
// identical fetches within a render, so Sanity is asked once.
//
// If Sanity cannot be reached, the pages render with the coded copy rather
// than failing the build or the request: an unreachable CMS must never produce
// a blank or broken site. The error is logged so it is not silent.
export async function getSiteCopy(): Promise<SiteCopy> {
  try {
    const settings = await sanityFetch({query: SITE_SETTINGS_QUERY, tags: SITE_SETTINGS_TAGS})
    return mergeSiteCopy(settings)
  } catch (error) {
    console.error('Could not load siteSettings from Sanity; using the coded fallback copy.', error)
    return FALLBACK_COPY
  }
}
