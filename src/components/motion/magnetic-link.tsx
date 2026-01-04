'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'

interface MagneticLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

// Reusable "magnetic" CTA primitive (phase-3-plan.md §3.1 step 5) — the
// button pulls slightly toward the cursor within its own bounds, then
// springs back on mouse leave. Built once here so Home's hero CTA,
// Contact's submit button and any future CTA all share one implementation
// instead of three copies of the same GSAP code.
export default function MagneticLink({ href, children, className }: MagneticLinkProps) {
  const elementRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    let isFullMotion = false

    registerMotion({
      full: () => {
        isFullMotion = true
      },
      reduced: () => {
        isFullMotion = false
      },
    })

    // getBoundingClientRect() reflects the element's current VISUAL
    // position, transform included — not its original layout position.
    // The first version of this component called it fresh on every
    // pointermove, so once GSAP had already shifted the button toward the
    // cursor, the next move measured that shifted box, computed a new
    // offset from ITS center, and fed that back in — a compounding loop
    // that flung the button (and its text) off toward a corner instead of
    // settling near the cursor. Real bug, caught by Svei hovering the
    // Home CTA. Fixed by measuring the rect once on pointerenter, while
    // the element is still untransformed, and reusing that cached rect
    // for every move until the pointer leaves.
    let restBounds: DOMRect | null = null

    function handlePointerEnter() {
      if (!element) return
      restBounds = element.getBoundingClientRect()
    }

    function handlePointerMove(event: PointerEvent) {
      if (!isFullMotion || !restBounds) return
      const relativeX = event.clientX - restBounds.left - restBounds.width / 2
      const relativeY = event.clientY - restBounds.top - restBounds.height / 2

      // Pull is a fraction of the cursor's offset from center, not a 1:1
      // follow — this is what keeps the effect feeling magnetic rather
      // than like the button is glued to the cursor.
      gsap.to(element, {
        x: relativeX * 0.3,
        y: relativeY * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    function handlePointerLeave() {
      restBounds = null
      gsap.to(element, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.4)' })
    }

    element.addEventListener('pointerenter', handlePointerEnter)
    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      element.removeEventListener('pointerenter', handlePointerEnter)
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <Link ref={elementRef} href={href} className={className}>
      {children}
    </Link>
  )
}
