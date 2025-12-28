import { ImageResponse } from 'next/og'

// One branded OG image, generated rather than a static asset — the site
// has no finalized brand palette yet (that's Phase 3, handoff.md §8.1),
// so this uses the current live colors and is trivial to swap out once
// the real palette lands. Covers both Open Graph and Twitter cards
// (handoff.md §4.8: no og:image/twitter:image existed before this).
export const alt = 'Ivan E. Villanueva | Fullstack Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#022c43',
          color: '#fff',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>Ivan E. Villanueva</div>
        <div style={{ fontSize: 36, color: '#599DFB', marginTop: 20 }}>
          Fullstack Developer
        </div>
      </div>
    ),
    { ...size },
  )
}
