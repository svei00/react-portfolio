import { ImageResponse } from 'next/og'

// Same gold-monogram-on-navy mark as icon.tsx, at the larger size iOS
// wants for a home-screen icon (Apple ignores small favicons entirely).
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
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
          fontSize: 110,
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
