import { Fraunces } from 'next/font/google'
import localFont from 'next/font/local'

// Display font: Fraunces, loaded as a variable font directly from Google
// Fonts. It ships a SOFT axis (0-100) and a WONK axis (0-1) in addition to
// the usual weight axis — the Home hero (Phase 3.2) animates those two axes
// during the name reveal, so the letterforms visibly change character as
// they land instead of just sliding into place. That axis animation is the
// one deliberately non-derivative piece of the whole redesign (see
// phase-3-plan.md §6, the anti-copycat table).
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
})

// Body font: General Sans. Not on Google Fonts, so it is self-hosted here
// from a variable woff2 downloaded from Fontshare (free, self-hostable
// under the ITF Free Font License — see licenses/general-sans-FFL.txt at
// the repo root for the full terms).
export const generalSans = localFont({
  src: [
    {
      path: '../assets/fonts/general-sans/GeneralSans-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../assets/fonts/general-sans/GeneralSans-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
})
