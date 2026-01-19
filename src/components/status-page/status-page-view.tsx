'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, SplitText, registerGsapPlugins } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import styles from './status-page.module.scss'

type StatusPageViewProps = {
  code: string
  message: string
  // Either a link (404 — "go home") or a retry button (the error
  // boundary — "reset", which needs a real function call, not a URL).
  action:
    | { kind: 'link'; label: string; href: string }
    | { kind: 'button'; label: string; onClick: () => void }
}

// Shared visual treatment for both app/not-found.tsx and app/error.tsx
// (phase-3-plan.md §3.7 step 2). This is where the animated work Svei
// originally asked for as an "under-construction" fallback page actually
// lands, per phase-3-plan.md §1 item 3 — on two pages that get used when
// something genuinely goes wrong, instead of a page that ideally nobody
// ever sees.
const StatusPageView = ({ code, message, action }: StatusPageViewProps) => {
  const codeRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    registerGsapPlugins()

    const context = gsap.context(() => {
      const codeEl = codeRef.current
      if (!codeEl) return

      const split = SplitText.create(codeEl, { type: 'chars', aria: 'auto' })

      registerMotion({
        full: () => {
          gsap.from(split.chars, {
            opacity: 0,
            y: '0.5em',
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
          })
        },
        reduced: () => {
          gsap.set(split.chars, { opacity: 1, y: 0 })
        },
      })

      return () => split.revert()
    })

    return () => context.revert()
  }, [])

  return (
    <div className={styles.statusPage}>
      <h1 ref={codeRef} className={styles.code}>
        {code}
      </h1>
      <p className={styles.message}>{message}</p>
      {action.kind === 'link' ? (
        <Link href={action.href} className={styles.actionButton}>
          {action.label}
        </Link>
      ) : (
        <button type="button" onClick={action.onClick} className={styles.actionButton}>
          {action.label}
        </button>
      )}
    </div>
  )
}

export default StatusPageView
