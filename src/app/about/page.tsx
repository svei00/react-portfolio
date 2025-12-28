import type { Metadata } from 'next'
import AboutView from '@/components/about/about-view'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Ivan E. Villanueva, fullstack developer in the Inland Empire, California.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return <AboutView />
}
