import Link from 'next/link'
import Image from 'next/image'
import { ViewTransition } from 'react'
import type { Project } from '@/types/project'
import styles from './work.module.scss'

type WorkDetailViewProps = {
  project: Project
}

// A single case study. The cover image shares its ViewTransition `name`
// with the matching tile on the Work index (work-index-view.tsx) — the
// image morphs from grid cell to hero instead of the page swapping
// instantly. Content below (description/tech stack/links) has no
// transition name, so it simply fades in as new content once the morph
// resolves (the default page-fade from src/components/motion/page-transition.tsx).
const WorkDetailView = ({ project }: WorkDetailViewProps) => (
  <article className={styles.detailPage}>
    <Link href="/work" className={styles.backLink}>
      ← Back to Work
    </Link>

    <ViewTransition name={`work-image-${project.slug}`}>
      <div className={styles.detailImageWrap}>
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className={styles.detailImage}
          priority
        />
      </div>
    </ViewTransition>

    <div className={styles.detailBody}>
      <h1 className={styles.detailTitle}>{project.title}</h1>
      <p className={styles.detailSummary}>{project.summary}</p>
      <p className={styles.detailDescription}>{project.description}</p>

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
    </div>
  </article>
)

export default WorkDetailView
