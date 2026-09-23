import Link from 'next/link'
import Image from 'next/image'
import {STATUS_LABEL} from '@/lib/excel-lab/labels'
import type {ExcelPieceDetail} from '@/lib/excel-lab/types'
import ProjectDescription from '@/components/work/project-description'
import styles from './excel-lab.module.scss'

type ExcelPieceDetailViewProps = {
  piece: ExcelPieceDetail
}

// One Excel Lab case study, in the order handoff.md §10 asks for:
// Problem -> Solution -> Outcome, then the optional sections (what makes it
// different, an honest note about its limits), the tools, the staged-data
// images, and the links. A section whose content was left empty in the Studio
// is simply not rendered, so a short piece never shows an empty heading.
//
// The solution is rich text, so it reuses the Work page's Portable Text
// renderer; both are styled by their own module (.solutionBody here).
const ExcelPieceDetailView = ({piece}: ExcelPieceDetailViewProps) => (
  <article className={styles.detailPage}>
    <Link href="/excel-lab" className={styles.backLink}>
      ← Back to Excel Lab
    </Link>

    <p className={styles.tileBadge}>{STATUS_LABEL[piece.status]}</p>
    <h1 className={styles.detailTitle}>{piece.title}</h1>
    {piece.outcome && <p className={styles.detailOutcome}>{piece.outcome}</p>}

    {piece.problem && (
      <section className={styles.detailSection}>
        <h2 className={styles.sectionHeading}>The problem</h2>
        <p className={styles.sectionText}>{piece.problem}</p>
      </section>
    )}

    {Array.isArray(piece.solution) && piece.solution.length > 0 && (
      <section className={styles.detailSection}>
        <h2 className={styles.sectionHeading}>What it does</h2>
        <div className={styles.solutionBody}>
          <ProjectDescription value={piece.solution} />
        </div>
      </section>
    )}

    {piece.differentiator && (
      <section className={styles.detailSection}>
        <h2 className={styles.sectionHeading}>What makes it different</h2>
        <p className={styles.sectionText}>{piece.differentiator}</p>
      </section>
    )}

    {piece.honestNote && (
      <section className={styles.detailSection}>
        <h2 className={styles.sectionHeading}>Honest note</h2>
        <p className={styles.sectionText}>{piece.honestNote}</p>
      </section>
    )}

    <ul className={styles.toolList}>
      {piece.tools.map((tool) => (
        <li key={tool}>{tool}</li>
      ))}
    </ul>

    {piece.images.length > 0 && (
      <ul className={styles.imageList}>
        {piece.images.map((image) => (
          <li key={image.url} className={styles.imageItem}>
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.imageFile}
            />
          </li>
        ))}
      </ul>
    )}

    {(piece.catalogUrl || piece.fileUrl) && (
      <div className={styles.detailLinks}>
        {piece.catalogUrl && (
          <a href={piece.catalogUrl} target="_blank" rel="noreferrer" className={styles.detailLink}>
            Full write-up on ExcelSolutionsV (Spanish) →
          </a>
        )}
        {piece.fileUrl && (
          <a href={piece.fileUrl} target="_blank" rel="noreferrer" className={styles.detailLink}>
            Download or view source →
          </a>
        )}
      </div>
    )}
  </article>
)

export default ExcelPieceDetailView
