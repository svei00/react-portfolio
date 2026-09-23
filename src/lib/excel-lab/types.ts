import type {PortableTextBlocks, WorkImage} from '@/lib/work/types'

// What the Excel Lab pages render. Same idea as src/lib/work/types.ts: the
// views never see raw Sanity results, only these plain shapes.
//
// Image and rich-text types are reused from the Work side on purpose: they are
// the same two things (an image URL plus alt text, and Portable Text), and one
// definition means one place to change.

export type ExcelPieceStatus = 'in-use' | 'active-development'

// Everything the Excel Lab index needs for one piece's card.
export type ExcelPieceCard = {
  slug: string
  title: string
  problem: string
  // The one hard metric, e.g. "Monthly close from 3 days to 4 hours".
  outcome: string
  status: ExcelPieceStatus
  tools: string[]
}

// Everything a piece's own page needs.
export type ExcelPieceDetail = ExcelPieceCard & {
  solution: PortableTextBlocks
  differentiator: string | null
  honestNote: string | null
  fileUrl: string | null
  catalogUrl: string | null
  images: WorkImage[]
}
