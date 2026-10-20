import type {QueryParams} from '@sanity/client'
import {client} from './client'
import {DEFAULT_LOCALE} from './locale'

// A page that is not rebuilt by a webhook still refreshes itself this often.
// It is only a safety net: if a Sanity webhook ever fails to arrive, content
// can be at most one hour stale instead of stale forever.
const FALLBACK_REVALIDATE_SECONDS = 3600

type SanityFetchArgs<Query extends string> = {
  query: Query
  params?: QueryParams
  // Cache tags for this request. The webhook route (step 4.6) invalidates by
  // document type — 'project', 'excelPiece', 'siteSettings' — so every query
  // must be tagged with the document types it reads.
  tags: string[]
}

// Every Sanity read in the app goes through this one function, so caching and
// language are decided in exactly one place.
//
// In this Next.js version fetch() is NOT cached unless asked
// (node_modules/next/dist/docs/01-app/03-api-reference/04-functions/fetch.md,
// "Caching is opt-in"). Passing `next.tags` + `next.revalidate` is what makes
// a page static-with-refresh. `<const Query>` keeps the query as a literal
// type, which is how TypeGen's generated types give the result its shape.
export async function sanityFetch<const Query extends string>({
  query,
  params = {},
  tags,
}: SanityFetchArgs<Query>) {
  return client.fetch(
    query,
    {locale: DEFAULT_LOCALE, ...params},
    {next: {revalidate: FALLBACK_REVALIDATE_SECONDS, tags}},
  )
}
