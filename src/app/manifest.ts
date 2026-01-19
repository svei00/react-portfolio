import type { MetadataRoute } from 'next'

// The old public/manifest.json was untouched CRA boilerplate — literally
// "short_name": "React App", "name": "Create React App Sample"
// (handoff.md §4.8). Colors and icons updated in Phase 3.7 to the real
// navy/gold palette (src/styles/tokens.scss) and the generated gold
// monogram (app/icon.tsx, app/apple-icon.tsx) — this used to point at
// the old CRA blue (#022c43) and the stock React logo PNGs, neither of
// which matched the brand this site actually has now.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ivan E. Villanueva | Fullstack Developer',
    short_name: 'Ivan Villanueva',
    start_url: '/',
    display: 'standalone',
    background_color: '#131f30',
    theme_color: '#131f30',
    icons: [{ src: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  }
}
