import type { Metadata } from 'next'
import AboutView from '@/components/about/about-view'
import PageTransition from '@/components/motion/page-transition'
import { getSiteCopy } from '@/lib/site/settings'

export const metadata: Metadata = {
  title: 'About Me',
  description:
    'Ivan E. Villanueva, software developer in Guadalajara, Mexico, automating accounting work with Excel and Python.',
  alternates: { canonical: '/about' },
}

export default async function AboutPage() {
  const { name, aboutBody, background, skillGroups } = await getSiteCopy()

  return (
    <PageTransition>
      <AboutView
        name={name}
        aboutBody={aboutBody}
        background={background}
        skillGroups={skillGroups}
      />
    </PageTransition>
  )
}
