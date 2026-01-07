'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import { trapFocus } from '@/components/motion/focus-trap'
import styles from './nav-bar.module.scss'

// Replaces the old icon sidebar (Phase 3.1 — phase-3-plan.md §3.1 step 1).
// Text links only, no icons: Svei specifically dislikes the oversized
// icons on the Dennis Snellenberg reference this design otherwise takes
// cues from. /portfolio became /work in Phase 3.3, and /skills folded
// into /about in Phase 3.4 — both have permanent redirects in
// next.config.ts.
const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
]

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const releaseFocusTrapRef = useRef<(() => void) | null>(null)

  // Close the mobile overlay on every route change so navigating never
  // leaves it open over the new page.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Overlay open/close choreography, gated behind the one shared
  // reduced-motion check (handoff.md §8.3). The reduced branch just shows
  // or hides the overlay instantly with no stagger.
  useEffect(() => {
    const overlay = overlayRef.current
    if (!overlay) return

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      releaseFocusTrapRef.current = trapFocus(overlay)

      const links = overlay.querySelectorAll(`.${styles.overlayLink}`)
      registerMotion({
        full: () => {
          gsap.fromTo(
            overlay,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.3, ease: 'power2.out' },
          )
          gsap.fromTo(
            links,
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.06, delay: 0.1, ease: 'power3.out' },
          )
        },
        reduced: () => {
          gsap.set(overlay, { autoAlpha: 1 })
          gsap.set(links, { autoAlpha: 1, y: 0 })
        },
      })
    } else {
      releaseFocusTrapRef.current?.()
      releaseFocusTrapRef.current = null
      document.body.style.overflow = ''
      gsap.set(overlay, { autoAlpha: 0 })
      hamburgerRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMenuOpen])

  // Escape closes the overlay from anywhere inside it.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isMenuOpen])

  return (
    <header className={styles.navBar}>
      <Link href="/" className={styles.wordmark} aria-label="Ivan E. Villanueva, home">
        Iván<span className={styles.wordmarkAccent}>.</span>
      </Link>

      <nav className={styles.desktopNav} aria-label="Primary">
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={styles.navLink}
            aria-current={pathname === href ? 'page' : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        ref={hamburgerRef}
        type="button"
        className={styles.hamburger}
        onClick={() => setIsMenuOpen(true)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-nav-overlay"
        aria-label="Open menu"
      >
        <span />
        <span />
      </button>

      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          Close
        </button>

        <nav aria-label="Mobile primary">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={styles.overlayLink}
              aria-current={pathname === href ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default NavBar
