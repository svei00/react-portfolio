import { ImageResponse } from 'next/og'

// Regenerated on the real navy/gold palette in Phase 3.7 — notes.md entry
// 57 built the original version on the old CRA blue as a deliberate
// placeholder, "trivial to regenerate once the real palette lands." This
// is that moment. Still no photo here (per phase-3-plan.md §5, the real
// face belongs on the About page and eventually here too, once Svei
// supplies a real headshot — this stays type-only until then).
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
          background: '#131f30',
          color: '#f1ebdf',
        }}
      >
        <div style={{ fontSize: 72, fontFamily: 'Georgia, "Times New Roman", serif' }}>
          Ivan E. Villanueva
        </div>
        <div style={{ fontSize: 32, color: '#b38e5d', marginTop: 20, letterSpacing: 2 }}>
          FULLSTACK DEVELOPER
        </div>
      </div>
    ),
    { ...size },
  )
}
