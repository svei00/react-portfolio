import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WorkDetailView from '@/components/work/work-detail-view'
import PageTransition from '@/components/motion/page-transition'
import projects from '@/content/projects.json'

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>
}

// Static params for every project at build time — this stays a plain
// array lookup for now; Phase 4 swaps `projects.json` for a Sanity GROQ
// query here without touching WorkDetailView at all (the Project shape
// already matches the Sanity schema — see src/types/project.ts).
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return { title: 'Work' }
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    notFound()
  }

  return (
    <PageTransition>
      <WorkDetailView project={project} />
    </PageTransition>
  )
}
