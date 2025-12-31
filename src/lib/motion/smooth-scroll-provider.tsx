'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, registerGsapPlugins } from './gsap-setup'

// Mounts Lenis smooth scrolling for the whole app and wires it to GSAP so
// ScrollTrigger positions stay correct while Lenis is intercepting scroll.
// Renders nothing — it only runs an effect — so it can wrap {children} in
// the root layout without changing the DOM.
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerGsapPlugins()

    // Respect the OS-level setting directly (not just the component-level
    // reduced-motion gate in reduced-motion.ts): smooth scrolling itself
    // is exactly the kind of large, screen-filling motion
    // prefers-reduced-motion exists to suppress, so Lenis never even
    // initializes when the user has asked for reduced motion — the page
    // falls back to native browser scrolling.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis()

    // Keep ScrollTrigger's cached element positions in sync with Lenis's
    // virtual scroll position on every frame Lenis reports.
    lenis.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP's ticker instead of its own requestAnimationFrame
    // loop, so there is exactly one animation frame loop driving both
    // smooth scroll and every ScrollTrigger-based reveal — two competing
    // rAF loops is how scroll animations end up visibly out of sync.
    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onTick)
    }
  }, [])

  return <>{children}</>
}
