import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import WorkDetailView from '@/components/work/work-detail-view'
import PageTransition from '@/components/motion/page-transition'
import {getProject, getProjectSlugs} from '@/lib/work/projects'

type WorkDetailPageProps = {
  params: Promise<{slug: string}>
}

// Every published project is built statically. A project published in the
// Studio after the last build is rendered on demand the first time it is
// visited (Next's default for unknown params) and cached; the webhook in step
// 4.6 refreshes it when its content changes.
export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: WorkDetailPageProps): Promise<Metadata> {
  const {slug} = await params
  const project = await getProject(slug)

  if (!project) {
    return {title: 'Work'}
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {canonical: `/work/${project.slug}`},
  }
}

export default async function WorkDetailPage({params}: WorkDetailPageProps) {
  const {slug} = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <PageTransition>
      <WorkDetailView project={project} />
    </PageTransition>
  )
}
