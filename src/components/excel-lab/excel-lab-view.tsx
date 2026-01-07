'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, registerGsapPlugins } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import styles from './excel-lab.module.scss'

// Excel Lab — a designed placeholder, not a gap (handoff.md §7 Phase 3
// requires this; real case studies land in Phase 5, authored in Sanity).
// Framing line is verbatim from handoff.md §10: a software engineer
// applying real engineering practice to spreadsheets, proving the claim
// by construction rather than assertion.
const PRACTICE_STEPS = [
  {
    label: 'Versioning',
    detail: 'Every workbook lives in source control, same as application code — not a folder full of "final_v3_ACTUAL.xlsx" files.',
  },
  {
    label: 'Testing',
    detail: 'Formulas and macros get verified against known inputs before they touch a real client file, not just eyeballed once and shipped.',
  },
  {
    label: 'Modular design',
    detail: 'Reusable named ranges, functions, and templates — the same single-responsibility thinking that goes into a well-structured codebase.',
  },
]

const COMING_SOON_TILES = [
  { title: 'Tax automation', description: 'CFDI and SAT workflow tooling for Mexican accountants.' },
  { title: 'Data pipelines', description: 'Power Query and dynamic-array driven reporting.' },
  { title: 'Reporting tools', description: 'Templated dashboards built for handoff, not one-off use.' },
]

// This is the one pinned ScrollTrigger sequence in the entire site
// (handoff.md §8.3 allows exactly one; this is where phase-3-plan.md §3.5
// spends it). As the intro section scrolls, it pins in place while the
// three engineering-practice steps cross-fade in sequence, scrubbed
// directly to scroll position rather than running on a timer.
//
// Reduced-motion fallback is structural, not just "skip the animation":
// all three steps already exist in normal, stacked document flow in the
// JSX below. The full-motion branch only ADDS the pin + scrub + crossfade
// on top of that — a reduced-motion visitor scrolls past three
// already-visible, already-readable steps exactly like any other section.
const ExcelLabView = () => {
  const introRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    registerGsapPlugins()

    const context = gsap.context(() => {
      const intro = introRef.current
      const steps = stepRefs.current.filter((el): el is HTMLDivElement => el !== null)
      if (!intro || steps.length === 0) return

      registerMotion({
        full: () => {
          // The reduced-motion fallback needs these three steps stacked
          // normally in document flow so they read top-to-bottom like any
          // other section (see the component comment above). The
          // crossfade below needs them overlapping in the exact same
          // spot instead. Rather than maintain two separate layouts in
          // CSS, this branch converts the normal-flow layout to an
          // absolute-stacked one at runtime, and gsap.context's revert()
          // (in the cleanup function below) automatically undoes these
          // inline styles if the media query ever flips back to reduced.
          const stepsContainer = steps[0].parentElement
          gsap.set(stepsContainer, { position: 'relative' })
          gsap.set(steps, { position: 'absolute', top: 0, left: 0, right: 0 })

          gsap.set(steps, { autoAlpha: 0 })
          gsap.set(steps[0], { autoAlpha: 1 })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: intro,
              start: 'top top',
              end: '+=150%',
              scrub: 1,
              pin: true,
            },
          })

          steps.forEach((step, index) => {
            if (index === 0) return
            timeline
              .to(steps[index - 1], { autoAlpha: 0, duration: 0.3 })
              .to(step, { autoAlpha: 1, duration: 0.3 }, '<')
          })
        },
        reduced: () => {
          gsap.set(steps, { autoAlpha: 1 })
        },
      })
    }, introRef)

    return () => context.revert()
  }, [])

  return (
    <div className={styles.excelLabPage}>
      <div ref={introRef} className={styles.intro}>
        <h1 className={styles.heading}>Excel Lab</h1>
        <p className={styles.framingLine}>
          A software engineer applying real engineering practice to spreadsheets.
        </p>

        <div className={styles.practiceSteps}>
          {PRACTICE_STEPS.map((step, index) => (
            <div
              key={step.label}
              ref={(el) => {
                stepRefs.current[index] = el
              }}
              className={styles.practiceStep}
            >
              <p className={styles.practiceLabel}>{step.label}</p>
              <p className={styles.practiceDetail}>{step.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.tiles}>
        {COMING_SOON_TILES.map((tile) => (
          <div key={tile.title} className={styles.tile}>
            <p className={styles.tileBadge}>Coming soon</p>
            <p className={styles.tileTitle}>{tile.title}</p>
            <p className={styles.tileDescription}>{tile.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExcelLabView
