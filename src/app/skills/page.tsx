import type { Metadata } from 'next'
import SkillsView from '@/components/skills/skills-view'
import PageTransition from '@/components/motion/page-transition'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Software engineer skills: Microsoft Excel, JavaScript, React, HTML, CSS, Java, C#, C++, Python.',
  alternates: { canonical: '/skills' },
}

export default function SkillsPage() {
  return (
    <PageTransition>
      <SkillsView />
    </PageTransition>
  )
}
