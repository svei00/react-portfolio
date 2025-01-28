import type { Metadata } from 'next'
import SkillsView from '@/components/skills/skills-view'

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Software engineer skills: Microsoft Excel, JavaScript, React, HTML, CSS, Java, C#, C++, Python.',
}

export default function SkillsPage() {
  return <SkillsView />
}
