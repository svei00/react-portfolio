import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import ExcelPieceDetailView from '@/components/excel-lab/excel-piece-detail-view'
import PageTransition from '@/components/motion/page-transition'
import {getExcelPiece, getExcelPieceSlugs} from '@/lib/excel-lab/pieces'

type ExcelPiecePageProps = {
  params: Promise<{slug: string}>
}

// Every published piece is built statically; one published after the last
// build is rendered on demand the first time it is visited, then cached (the
// webhook in step 4.6 refreshes it). With no pieces yet this list is empty and
// every /excel-lab/<anything> is a 404.
export async function generateStaticParams() {
  const slugs = await getExcelPieceSlugs()
  return slugs.map((slug) => ({slug}))
}

export async function generateMetadata({params}: ExcelPiecePageProps): Promise<Metadata> {
  const {slug} = await params
  const piece = await getExcelPiece(slug)

  if (!piece) {
    return {title: 'Excel Lab'}
  }

  return {
    title: piece.title,
    description: piece.outcome || piece.problem,
    alternates: {canonical: `/excel-lab/${piece.slug}`},
  }
}

export default async function ExcelPiecePage({params}: ExcelPiecePageProps) {
  const {slug} = await params
  const piece = await getExcelPiece(slug)

  if (!piece) {
    notFound()
  }

  return (
    <PageTransition>
      <ExcelPieceDetailView piece={piece} />
    </PageTransition>
  )
}
