import type { Metadata } from 'next'
import HomeView from '@/components/home/home-view'
import PageTransition from '@/components/motion/page-transition'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <PageTransition>
      <HomeView />
    </PageTransition>
  )
}
