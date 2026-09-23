'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, registerGsapPlugins } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import styles from './about.module.scss'

// About rewrite (phase-3-plan.md §3.4), re-aligned with LinkedIn on
// 2026-10-11 (handoff.md §2 decisions 6 and 7). Every career fact below —
// titles, employers, dates, degrees, location — is copied from Svei's
// LinkedIn profile (linkedin.com/in/ivan-e-villanueva), which is the
// source of truth for them. The first draft of this copy inferred a
// timeline ("for years before that, I was the person accountants called")
// and a California location that LinkedIn contradicts; both are gone.
//
// **Copy status: DRAFT, not yet approved by Svei** — same gate as Home's
// positioning statement. The family/outdoors line carries forward from the
// pre-Phase-3 About copy Svei already published.
//
// When LinkedIn changes (new role, new degree, a move), change it here in
// the same sitting — this file should never say something LinkedIn doesn't.
const BACKGROUND_GROUPS = [
  {
    label: 'Work',
    items: [
      'Accounting & Systems Consultant, ECA Estructura & Arquitectura · 2013 – present',
      'Founder & Accounting Automation Developer, ExcelSolutionsV · 2014 – present',
      'Department Head, Servicio de Administración Tributaria (SAT) · 2005 – 2014',
      'Audit Associate, Deloitte · 2004 – 2005',
    ],
  },
  {
    label: 'Education',
    items: [
      'Ingeniería en Desarrollo de Software, UnADM · 2017 – 2021',
      'Bachelor of Laws, Universidad de Guadalajara · Mariano Otero Prize',
      'Public Accounting, Universidad de Guadalajara',
    ],
  },
]

const SKILL_GROUPS = [
  {
    // Listed first because it is what LinkedIn leads with. Kept separate
    // from "Languages" on purpose (Svei's own concern): this portfolio is
    // TypeScript/Next.js, so Python must not sit beside JS/TS and imply it
    // built this site — it is used for the accounting-automation tools.
    label: 'Data & Automation',
    skills: ['Python', 'Microsoft Excel', 'VBA', 'Power Query', 'SQLite', 'CFDI / XML'],
  },
  {
    label: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'PHP', 'SQL'],
  },
  {
    label: 'Frontend',
    skills: ['React', 'React Native', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap'],
  },
  {
    label: 'Backend & Tools',
    skills: ['Node.js', 'Express.js', 'Git', 'NPM', 'Webpack', 'Jest'],
  },
]

const AboutView = () => {
  // If the headshot file ever goes missing, hide the broken <Image> and let
  // the styled arch frame show through instead of a broken-image icon.
  const [imageFailed, setImageFailed] = useState(false)

  const portraitRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const outlinePathRef = useRef<SVGPathElement>(null)
  const sheenRef = useRef<HTMLSpanElement>(null)
  const introTextRef = useRef<HTMLDivElement>(null)

  // Portrait choreography (GSAP), the About page's signature moment. It
  // plays *toward* the finished CSS state in about.module.scss, so the
  // reduced-motion branch only has to make sure nothing is left hidden.
  //   1. the arch wipes open from the bottom while the photo settles from a
  //      slight zoom
  //   2. a gold outline draws itself around it (stroke-dashoffset, not a
  //      plugin — pathLength=1 in the markup makes 1 mean "the whole line")
  //   3. one soft gold sheen sweeps across the photo
  //   4. the text fades up in a stagger
  // Then, only for a real mouse (pointer: fine), the photo and outline
  // drift in opposite directions as the cursor moves over the portrait,
  // which reads as depth. Deliberately not ExcelSolutionsV's flat circle
  // ring in its blue/green — this site has its own palette (handoff.md §2).
  useEffect(() => {
    registerGsapPlugins()

    const portrait = portraitRef.current
    const frame = frameRef.current
    const outlinePath = outlinePathRef.current
    const sheen = sheenRef.current
    const introText = introTextRef.current
    if (!portrait || !frame || !outlinePath || !sheen || !introText) return

    const photo = frame.querySelector('img')
    const textBlocks = Array.from(introText.children)
    const outlineSvg = outlinePath.ownerSVGElement

    let isFullMotion = false

    registerMotion({
      full: () => {
        isFullMotion = true

        gsap.set(frame, { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(outlinePath, { strokeDashoffset: 1 })
        gsap.set(textBlocks, { opacity: 0, y: 18 })
        if (photo) gsap.set(photo, { scale: 1.25 })

        const timeline = gsap.timeline({ delay: 0.15 })
        timeline
          .to(frame, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.inOut' })
          .to(photo ?? frame, { scale: 1.06, duration: 1.6, ease: 'power2.out' }, 0)
          .to(
            outlinePath,
            { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
            0.35,
          )
          .to(sheen, { x: '240%', duration: 1.1, ease: 'power1.inOut' }, 1.0)
          .to(
            textBlocks,
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out' },
            0.6,
          )
      },
      reduced: () => {
        isFullMotion = false
        gsap.set([frame, outlinePath, sheen, ...textBlocks], { clearProps: 'all' })
        if (photo) gsap.set(photo, { clearProps: 'all' })
      },
    })

    // Depth-on-hover, mouse only. quickTo keeps it smooth without creating
    // a new tween on every pointermove.
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches
    if (!hasFinePointer || !photo || !outlineSvg) return

    const photoX = gsap.quickTo(photo, 'x', { duration: 0.8, ease: 'power3.out' })
    const photoY = gsap.quickTo(photo, 'y', { duration: 0.8, ease: 'power3.out' })
    const outlineX = gsap.quickTo(outlineSvg, 'x', { duration: 0.8, ease: 'power3.out' })
    const outlineY = gsap.quickTo(outlineSvg, 'y', { duration: 0.8, ease: 'power3.out' })

    function handlePointerMove(event: PointerEvent) {
      if (!isFullMotion || !portrait) return
      const bounds = portrait.getBoundingClientRect()
      // -1 (left/top edge) .. 1 (right/bottom edge), clamped so hovering
      // just outside the portrait can't fling anything far.
      const nx = gsap.utils.clamp(-1, 1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1)
      const ny = gsap.utils.clamp(-1, 1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1)
      photoX(nx * -6)
      photoY(ny * -6)
      outlineX(nx * 10)
      outlineY(ny * 10)
    }

    function handlePointerLeave() {
      photoX(0)
      photoY(0)
      outlineX(0)
      outlineY(0)
    }

    portrait.addEventListener('pointermove', handlePointerMove)
    portrait.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      portrait.removeEventListener('pointermove', handlePointerMove)
      portrait.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  return (
    <div className={styles.aboutPage}>
      <div className={styles.intro}>
        <div ref={portraitRef} className={styles.portrait}>
          <svg className={styles.outline} viewBox="0 0 100 125" aria-hidden="true" focusable="false">
            <path ref={outlinePathRef} d="M 1 124 L 1 50 A 49 49 0 0 1 99 50 L 99 124" pathLength={1} />
          </svg>
          <div ref={frameRef} className={styles.photoFrame}>
            {!imageFailed && (
              <Image
                src="/about/ivan-headshot.jpg"
                alt="Ivan E. Villanueva"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 768px) 80vw, 22rem"
                className={styles.photo}
                onError={() => setImageFailed(true)}
              />
            )}
            <span ref={sheenRef} className={styles.sheen} aria-hidden="true" />
          </div>
        </div>

        <div ref={introTextRef} className={styles.introText}>
          <h1 className={styles.heading}>About</h1>
          <p>
            I&apos;m a software developer based in Guadalajara, Mexico, working remotely. I turn
            manual accounting and tax workflows into controlled, automated processes with Excel
            and Python, and build the web apps around them with React and Next.js.
          </p>
          <p>
            I come to software from accounting: more than 20 years across audit, tax, and
            consulting, including Deloitte México and nine years at Mexico&apos;s tax authority
            (SAT), where I rose to department head. Since 2014 I have run ExcelSolutionsV,
            building tools for accountants and teaching Excel and Python.
          </p>
          <p>
            I work in English and Spanish, which is also why so much of my tooling covers CFDI and
            SAT workflows for Mexican accountants.
          </p>
          <p>
            Outside of work, I&apos;m a husband and father who&apos;s happiest on a walk through
            the woods or planning the next family trip.
          </p>
        </div>
      </div>

      <div className={styles.skills}>
        <h2 className={styles.skillsHeading}>Background</h2>
        <div className={styles.skillGroups}>
          {BACKGROUND_GROUPS.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <p className={styles.skillGroupLabel}>{group.label}</p>
              {group.items.map((item) => (
                <p key={item} className={styles.skillGroupList}>
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.skills}>
        <h2 className={styles.skillsHeading}>Skills</h2>
        <div className={styles.skillGroups}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.label} className={styles.skillGroup}>
              <p className={styles.skillGroupLabel}>{group.label}</p>
              <p className={styles.skillGroupList}>{group.skills.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AboutView
