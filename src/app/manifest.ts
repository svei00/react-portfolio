import type { MetadataRoute } from 'next'

// The old public/manifest.json was untouched CRA boilerplate — literally
// "short_name": "React App", "name": "Create React App Sample"
// (handoff.md §4.8). This is the first real manifest the site has had.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ivan E. Villanueva | Fullstack Developer',
    short_name: 'Ivan Villanueva',
    start_url: '/',
    display: 'standalone',
    background_color: '#022c43',
    theme_color: '#022c43',
    icons: [
      { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
      { src: '/logo512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
