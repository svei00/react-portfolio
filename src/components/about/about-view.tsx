'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './about.module.scss'

// About rewrite (phase-3-plan.md §3.4): retires AnimatedLetters,
// PacmanLoader, and the rotating CSS cube — all three are named in
// handoff.md's Phase 3 exit criteria as tutorial artifacts that must not
// survive the redesign. Skills folds in here as typeset groups (below),
// replacing the blinking tag cloud that used to be its own /skills page.
//
// **Copy status: DRAFT, not yet approved by Svei** — same
// copy-approval gate as Home's positioning statement (notes.md entry 69).
// The personal facts below (family, outdoors, travel, Inland Empire
// California) carry forward from the pre-Phase-3 About copy Svei already
// published; nothing new has been invented. Bilingual English/Spanish is
// a real professional trait, not filler — it's why a chunk of his Excel
// Solutions work covers CFDI/SAT workflows written for Mexican
// accountants (see the excel-solutions entry in src/content/projects.json).
const SKILL_GROUPS = [
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
  {
    label: 'Spreadsheets',
    skills: ['Microsoft Excel'],
  },
]

const AboutView = () => {
  // No real headshot exists in this repo yet (the only face photo it
  // ever had, IvanEVillanueva.png, was deleted in Phase 3.1 as dead
  // weight from the old sidebar sub-logo — before this face-photo slot
  // existed). Rather than let a 404'd <Image> show a broken-image icon,
  // this hides the image on error and lets the styled placeholder frame
  // show through until Svei supplies a real file at this path.
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
            I&apos;m a fullstack software engineer based in the Inland Empire, California — and
            for years before that, I was the person accountants called when a spreadsheet needed
            to do more than a spreadsheet is supposed to do.
          </p>
          <p>
            I work fluently in English and Spanish, which is also why a chunk of my Excel work
            covers CFDI and SAT workflows written specifically for Mexican accountants.
          </p>
          <p>
            Outside of code, I&apos;m a husband and father who&apos;s happiest on a walk through
            the woods or planning the next family trip.
          </p>
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
