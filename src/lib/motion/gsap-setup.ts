import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Every plugin the site's motion system needs, registered exactly once.
// This module must only ever run in the browser (GSAP's plugins touch the
// DOM immediately on registration), so call registerGsapPlugins() from a
// client component's effect — never at module scope in a file that could
// be imported by a Server Component.
let registered = false

export function registerGsapPlugins() {
  if (registered) return
  gsap.registerPlugin(ScrollTrigger, SplitText)
  registered = true
}

export { gsap, ScrollTrigger, SplitText }
