import type { Metadata } from 'next'
import ExcelLabView from '@/components/excel-lab/excel-lab-view'
import PageTransition from '@/components/motion/page-transition'

export const metadata: Metadata = {
  title: 'Excel Lab',
  description:
    'A software engineer applying real engineering practice — versioning, testing, modular design — to spreadsheets.',
  alternates: { canonical: '/excel-lab' },
}

export default function ExcelLabPage() {
  return (
    <PageTransition>
      <ExcelLabView />
    </PageTransition>
  )
}
