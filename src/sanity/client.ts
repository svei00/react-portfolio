import {createClient} from '@sanity/client'
import {apiVersion, dataset, projectId} from './env'

// Read-only client for the public website. Imported only from server code
// (Server Components and route handlers) — nothing in the browser ever talks
// to Sanity.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  perspective: 'published',
  // false on purpose. With Sanity's CDN on, two caches stacked — up to ~60s at
  // the CDN plus Next's own — so "I published and nothing changed" was
  // ambiguous to debug. The sister project tours-web hit exactly this (see
  // its src/lib/sanity/client.ts). Next's cache is the only cache here, which
  // keeps the worst case understandable (phase-4-plan.md step 4.2).
  useCdn: false,
})
