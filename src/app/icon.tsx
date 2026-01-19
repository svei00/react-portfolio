import { ImageResponse } from 'next/og'

// Gold monogram on navy, generated rather than a static asset (same
// ImageResponse approach as opengraph-image.tsx) — no external font file
// to load for a shape this simple, so this leans on a serif system font
// stack rather than embedding Fraunces.
//
// Per phase-3-plan.md §5: a favicon renders at 16-32px, where a
// photograph resolves to an ambiguous smudge — a real face belongs on
// the About page and the OG image, not here. A single letterform is what
// actually survives the size and stays identifiable as a tab icon.
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#131f30',
          color: '#b38e5d',
          fontSize: 22,
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontWeight: 700,
        }}
      >
        I
      </div>
    ),
    { ...size },
  )
}
