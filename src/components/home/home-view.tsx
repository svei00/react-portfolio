'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, registerGsapPlugins } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import MagneticLink from '@/components/motion/magnetic-link'
import styles from './home.module.scss'

// Home's hero name reveal — the "signature moment" phase-3-plan.md §3.2
// asks for. Replaces AnimatedLetters + the three 3D letter images + the
// Excel logo swap-in + the Pacman loader entirely (all four are named in
// handoff.md's Phase 3 exit criteria as things that must not survive).
// AnimatedLetters and PacmanLoader themselves stay in the codebase for
// now — About/Contact/Portfolio/Skills still use them until their own
// sub-phases (3.4/3.6/3.3) rebuild those pages.
//
// The reveal does two things at once on the name heading:
//   1. SplitText breaks it into characters and staggers them in.
//   2. Fraunces's SOFT and WONK variable-font axes (registered in
//      src/styles/fonts.ts) animate from exaggerated values down to
//      normal, so the letterforms visibly change character as they land
//      instead of just sliding into place. This is the deliberately
//      non-derivative piece of the whole redesign — see
//      phase-3-plan.md §6, the anti-copycat table.
const HomeView = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const workTeaserRef = useRef<HTMLDivElement>(null)
  const contactCtaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsapPlugins()

    const context = gsap.context(() => {
      const nameEl = nameRef.current
      if (!nameEl) return

      // SplitText's aria: 'auto' puts the real, full text in an aria-label
      // on the heading and marks every generated character span
      // aria-hidden — screen readers announce "Ivan E. Villanueva", not
      // "I", "v", "a", "n"... one letter at a time. This is the exact
      // accessibility fix handoff.md §4.9 [C] requires for any
      // letter-stagger heading.
      const split = SplitText.create(nameEl, { type: 'chars', aria: 'auto' })

      registerMotion({
        full: () => {
          gsap.set(nameEl, { '--soft': 100, '--wonk': 1 } as gsap.TweenVars)
          gsap.set(split.chars, { opacity: 0, y: '0.6em' })

          const timeline = gsap.timeline({ delay: 0.2 })
          timeline
            .to(nameEl, {
              '--soft': 0,
              '--wonk': 0,
              duration: 1.1,
              ease: 'power2.out',
            } as gsap.TweenVars)
            .to(
              split.chars,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: 'power3.out',
              },
              0,
            )

          if (heroRef.current) {
            gsap.from(heroRef.current.querySelectorAll(`.${styles.fadeIn}`), {
              opacity: 0,
              y: 16,
              duration: 0.8,
              delay: 1,
              stagger: 0.1,
              ease: 'power2.out',
            })
          }
        },
        reduced: () => {
          gsap.set(nameEl, { '--soft': 0, '--wonk': 0 } as gsap.TweenVars)
          gsap.set(split.chars, { opacity: 1, y: 0 })
        },
      })

      // Scroll-revealed sections below the hero (phase-3-plan.md §3.2 step
      // 2): the positioning statement, the work teaser, the closing
      // contact CTA. Simple opacity/y reveals — no pinning here, the
      // one site-wide pinned sequence is reserved for the Excel Lab intro
      // in Phase 3.5 (handoff.md §8.3).
      ;[statementRef, workTeaserRef, contactCtaRef].forEach((sectionRef) => {
        const section = sectionRef.current
        if (!section) return

        registerMotion({
          full: () => {
            gsap.from(section, {
              opacity: 0,
              y: 40,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
              },
            })
          },
          reduced: () => {
            gsap.set(section, { opacity: 1, y: 0 })
          },
        })
      })

      return () => {
        split.revert()
      }
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <div ref={heroRef} className={styles.home}>
      <section className={styles.hero}>
        <h1 ref={nameRef} className={styles.heroName}>
          Iván E. Villanueva
        </h1>
        <p className={`${styles.heroTagline} ${styles.fadeIn}`}>
          Fullstack Developer / Software Engineer
        </p>
        <MagneticLink href="/contact" className={`${styles.ctaButton} ${styles.fadeIn}`}>
          Contact Me
        </MagneticLink>
      </section>

      <section ref={statementRef} className={styles.statement}>
        <p>
          I build web applications with React and Next.js — and before that, spent years
          automating spreadsheets for accountants who needed better tools than a typical power
          user could build. Same throughline either way: real engineering practice, wherever the
          problem lives.
        </p>
      </section>

      <section ref={workTeaserRef} className={styles.workTeaser}>
        <p>Selected work</p>
        <MagneticLink href="/work" className={styles.workLink}>
          View my work →
        </MagneticLink>
      </section>

      <section ref={contactCtaRef} className={styles.closingCta}>
        <h2>Have a project in mind?</h2>
        <MagneticLink href="/contact" className={styles.ctaButton}>
          Let&apos;s talk
        </MagneticLink>
      </section>
    </div>
  )
}

export default HomeView
