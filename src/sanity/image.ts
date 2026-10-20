import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {dataset, projectId} from './env'

const builder = createImageUrlBuilder({projectId, dataset})

// Turns a Sanity image (the `{asset, crop, hotspot}` object our queries
// return) into a cdn.sanity.io URL. `auto('format')` lets Sanity serve WebP or
// AVIF to browsers that support it; `fit('max')` never upscales. Callers add
// their own `.width()` — the result is meant to be passed to next/image, which
// then does its own responsive resizing.
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}
