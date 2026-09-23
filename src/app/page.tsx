import type { Metadata } from 'next'
import HomeView from '@/components/home/home-view'
import PageTransition from '@/components/motion/page-transition'
import { getSiteCopy } from '@/lib/site/settings'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const { title, positioningStatement } = await getSiteCopy()

  return (
    <PageTransition>
      <HomeView tagline={title} statement={positioningStatement} />
    </PageTransition>
  )
}
