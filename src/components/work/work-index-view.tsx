import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition } from 'react'
import type { Project } from '@/types/project'
import styles from './work.module.scss'

type WorkIndexViewProps = {
  projects: Project[]
}

// The Work index (was /portfolio — phase-3-plan.md §3.3 renames the
// route). Large image tiles on a generous grid, hover reveal of title and
// tech stack, no icons — the restrained "sobrio" register Svei pointed at
// on cuberto.com's project showcase.
//
// Each tile's cover image is wrapped in a <ViewTransition> sharing its
// `name` with the matching image on the detail page
// (work-detail-view.tsx) — React morphs the same visual element across
// the navigation instead of swapping pages instantly. See
// node_modules/next/dist/docs/01-app/02-guides/view-transitions.md, Step 1
// (shared element morphing).
const WorkIndexView = ({ projects }: WorkIndexViewProps) => {
  const sortedProjects = [...projects].sort((a, b) => a.orderRank - b.orderRank)

  return (
    <div className={styles.indexPage}>
      <h1 className={styles.indexHeading}>Work</h1>

      {sortedProjects.length === 0 ? (
        <p className={styles.emptyState}>New work is on its way — check back soon.</p>
      ) : (
        <div className={styles.grid}>
          {sortedProjects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className={styles.tile}>
              <ViewTransition name={`work-image-${project.slug}`}>
                <div className={styles.tileImageWrap}>
                  <Image
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.tileImage}
                  />
                </div>
              </ViewTransition>
              <div className={styles.tileCaption}>
                <p className={styles.tileTitle}>{project.title}</p>
                <p className={styles.tileTechStack}>{project.techStack.join(' · ')}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default WorkIndexView
