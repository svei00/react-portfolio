'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  // No real headshot exists in this repo yet. Rather than let a 404'd
  // <Image> show a broken-image icon, this hides the image on error and
  // lets the styled placeholder frame show through until Svei supplies a
  // real file at this path.
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className={styles.aboutPage}>
      <div className={styles.intro}>
        <div className={styles.photoFrame}>
          {!imageFailed && (
            <Image
              src="/about/ivan-headshot.jpg"
              alt="Ivan E. Villanueva"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className={styles.photo}
              onError={() => setImageFailed(true)}
            />
          )}
        </div>

        <div className={styles.introText}>
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
