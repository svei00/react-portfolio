'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/motion/gsap-setup'
import styles from './custom-cursor.module.scss'

// A small follower cursor — the Cuberto-flavoured micro-interaction from
// phase-3-plan.md §3.1 step 4. Deliberately NOT their cursor's blob
// morphology (see §6, the anti-copycat table): this is a plain ring that
// scales up over interactive elements, nothing more elaborate.
//
// Two independent gates, both required before this ever renders anything:
//   1. `(pointer: fine)` — touch devices have no cursor to replace, and
//      faking one there would just add dead-weight JS.
//   2. `(prefers-reduced-motion: reduce)` — a cursor that chases the real
//      one at a slight delay is exactly the kind of motion that setting
//      exists to suppress.
// Both are checked once on mount rather than through the shared
// gsap.matchMedia() gate in reduced-motion.ts, because this effect needs
// the extra (pointer: fine) condition that other components don't.
export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasFinePointer || prefersReducedMotion) return

    const ring = ringRef.current
    if (!ring) return

    const moveX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const moveY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })

    function handlePointerMove(event: PointerEvent) {
      moveX(event.clientX)
      moveY(event.clientY)
    }

    function handlePointerOver(event: PointerEvent) {
      const target = event.target
      const isInteractive = target instanceof Element && target.closest('a, button, [role="button"]')
      gsap.to(ring, { scale: isInteractive ? 2.2 : 1, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerover', handlePointerOver)
    gsap.set(ring, { autoAlpha: 1 })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerover', handlePointerOver)
    }
  }, [])

  return <div ref={ringRef} className={styles.ring} aria-hidden="true" />
}
