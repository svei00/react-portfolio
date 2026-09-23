import type {Metadata} from 'next'
import WorkIndexView from '@/components/work/work-index-view'
import PageTransition from '@/components/motion/page-transition'
import {getProjects} from '@/lib/work/projects'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected software projects by Ivan E. Villanueva: web, mobile and desktop.',
  alternates: {canonical: '/work'},
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <PageTransition>
      <WorkIndexView projects={projects} />
    </PageTransition>
  )
}
