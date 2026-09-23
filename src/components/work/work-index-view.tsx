import Link from 'next/link'
import Image from 'next/image'
import {ViewTransition} from 'react'
import type {ProjectCard} from '@/lib/work/types'
import styles from './work.module.scss'

type WorkIndexViewProps = {
  projects: ProjectCard[]
}

const PLATFORM_LABEL = {web: 'Web', mobile: 'Mobile', desktop: 'Desktop'} as const

// The Work index. Large image tiles on a generous grid, hover reveal, no icons
// — the restrained register Svei pointed at on cuberto.com's project showcase.
// Projects arrive already ordered (by `orderRank`, in the query).
//
// Each tile's cover is wrapped in a <ViewTransition> sharing its `name` with
// the matching image on the detail page (work-detail-view.tsx), so React
// morphs the same element across the navigation. See
// node_modules/next/dist/docs/01-app/02-guides/view-transitions.md, Step 1.
//
// A project with no cover yet gets a quiet placeholder frame (its initial
// letter) instead of a broken image or a hole in the grid.
const WorkIndexView = ({projects}: WorkIndexViewProps) => (
  <div className={styles.indexPage}>
    <h1 className={styles.indexHeading}>Work</h1>

    {projects.length === 0 ? (
      <p className={styles.emptyState}>New work is on its way — check back soon.</p>
    ) : (
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <Link key={project.slug} href={`/work/${project.slug}`} className={styles.tile}>
            <ViewTransition name={`work-image-${project.slug}`}>
              <div className={styles.tileImageWrap}>
                {project.coverImage ? (
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.tileImage}
                    // The first two tiles are visible without scrolling (side by
                    // side on desktop, the first alone on a phone). Lazy-loading
                    // the biggest element on the page is the classic LCP mistake,
                    // so they load eagerly and the first at high priority.
                    // (`priority` is deprecated in Next 16; this is its replacement.)
                    {...(index < 2 && {loading: 'eager' as const})}
                    {...(index === 0 && {fetchPriority: 'high' as const})}
                  />
                ) : (
                  <span className={styles.placeholderMark} aria-hidden="true">
                    {project.title.charAt(0)}
                  </span>
                )}
              </div>
            </ViewTransition>
            <div className={styles.tileCaption}>
              <p className={styles.tileTitle}>{project.title}</p>
              <p className={styles.tileMeta}>
                {PLATFORM_LABEL[project.platform]} · {project.year}
              </p>
              <p className={styles.tileTechStack}>{project.techStack.join(' · ')}</p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
)

export default WorkIndexView
