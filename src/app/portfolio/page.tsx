import type { Metadata } from 'next'
import PortfolioView from '@/components/portfolio/portfolio-view'
import PageTransition from '@/components/motion/page-transition'
import projects from '@/content/projects.json'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Bilingual Software Engineer',
  keywords: ['Software Engineer', 'Bilingual', 'English', 'Spanish'],
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioPage() {
  return (
    <PageTransition>
      <PortfolioView projects={projects} />
    </PageTransition>
  )
}
