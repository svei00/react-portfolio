'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, registerGsapPlugins } from '@/lib/motion/gsap-setup'
import { registerMotion } from '@/lib/motion/reduced-motion'
import RichText from '@/components/rich-text/rich-text'
import type { BackgroundGroup, SkillGroup } from '@/lib/site/types'
import type { PortableTextBlocks } from '@/lib/work/types'
import styles from './about.module.scss'

// About rewrite (phase-3-plan.md §3.4), re-aligned with LinkedIn on
// 2026-10-11 (handoff.md §2 decisions 6 and 7).
//
// The copy no longer lives in this file. The About body, the Background list
// and the Skills groups come from the `siteSettings` document in Sanity (the
// coded fallback is src/content/site-copy.ts) and the page passes them in. Every
// career fact in them — titles, employers, dates, degrees, location — is
// copied from Svei's LinkedIn profile (linkedin.com/in/ivan-e-villanueva),
// which is the source of truth for them. When LinkedIn changes (new role, new
// degree, a move), change it in the Studio in the same sitting — this page
// should never say something LinkedIn doesn't.
//
// **Copy status: DRAFT, not yet approved by Svei** — same gate as Home's
// positioning statement. The family/outdoors line carries forward from the
// pre-Phase-3 About copy Svei already published.
type AboutViewProps = {
  name: string
  aboutBody: PortableTextBlocks
  background: BackgroundGroup[]
  skillGroups: SkillGroup[]
}

const AboutView = ({ name, aboutBody, background, skillGroups }: AboutViewProps) => {
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
                alt={name}
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
          <RichText value={aboutBody} />
        </div>
      </div>

      <div className={styles.skills}>
        <h2 className={styles.skillsHeading}>Background</h2>
        <div className={styles.skillGroups}>
          {background.map((group) => (
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
          {skillGroups.map((group) => (
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
