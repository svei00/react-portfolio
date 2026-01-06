import type { Metadata } from 'next'
import WorkIndexView from '@/components/work/work-index-view'
import PageTransition from '@/components/motion/page-transition'
import projects from '@/content/projects.json'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected web development projects by Ivan E. Villanueva.',
  alternates: { canonical: '/work' },
}

export default function WorkPage() {
  return (
    <PageTransition>
      <WorkIndexView projects={projects} />
    </PageTransition>
  )
}
