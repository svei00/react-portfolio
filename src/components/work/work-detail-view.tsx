import Link from 'next/link'
import Image from 'next/image'
import {ViewTransition} from 'react'
import type {ProjectDetail} from '@/lib/work/types'
import RichText from '@/components/rich-text/rich-text'
import styles from './work.module.scss'

type WorkDetailViewProps = {
  project: ProjectDetail
}

const PLATFORM_LABEL = {web: 'Web', mobile: 'Mobile', desktop: 'Desktop'} as const

// A single case study. The cover image shares its ViewTransition `name` with
// the matching tile on the Work index (work-index-view.tsx), so the image
// morphs from grid cell to hero. Content below has no transition name, so it
// simply fades in once the morph resolves (the page-fade in
// src/components/motion/page-transition.tsx).
const WorkDetailView = ({project}: WorkDetailViewProps) => (
  <article className={styles.detailPage}>
    <Link href="/work" className={styles.backLink}>
      ← Back to Work
    </Link>

    <ViewTransition name={`work-image-${project.slug}`}>
      <div className={styles.detailImageWrap}>
        {project.coverImage ? (
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className={styles.detailImage}
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <span className={styles.placeholderMark} aria-hidden="true">
            {project.title.charAt(0)}
          </span>
        )}
      </div>
    </ViewTransition>

    <div className={styles.detailBody}>
      <h1 className={styles.detailTitle}>{project.title}</h1>
      <p className={styles.detailMeta}>
        {PLATFORM_LABEL[project.platform]} · {project.year}
      </p>
      <p className={styles.detailSummary}>{project.summary}</p>

      <div className={styles.detailDescription}>
        <RichText value={project.description} />
      </div>

      <ul className={styles.techStackList}>
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className={styles.detailLinks}>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer" className={styles.detailLink}>
            Visit live site →
          </a>
        )}
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer" className={styles.detailLink}>
            View source →
          </a>
        )}
      </div>

      {project.gallery.length > 0 && (
        <ul className={styles.gallery}>
          {project.gallery.map((image) => (
            <li key={image.url} className={styles.galleryItem}>
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.galleryImage}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
)

export default WorkDetailView
