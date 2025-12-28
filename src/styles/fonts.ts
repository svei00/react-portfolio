import localFont from 'next/font/local'

// These three custom fonts are the tutorial-era font stack (handoff.md
// §8.2 replaces them in Phase 3). Ported here as-is for feature parity.
// next/font/local also fixes a bug in the original @font-face block: it
// declared format('ttf'), which is not a valid CSS format keyword, so this
// font was almost certainly never loading on the live CRA site.
export const helveticaNeue = localFont({
  src: '../assets/fonts/helvetica-neu.ttf',
  variable: '--font-helvetica-neue',
  display: 'swap',
})

export const laBelleAurore = localFont({
  src: '../assets/fonts/LaBelleAurore.woff2',
  variable: '--font-la-belle-aurore',
  display: 'swap',
})

export const coolvetica = localFont({
  src: '../assets/fonts/CoolveticaRg-Regular.woff2',
  variable: '--font-coolvetica',
  display: 'swap',
})
