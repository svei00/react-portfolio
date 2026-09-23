import {sanityFetch} from '@/sanity/fetch'
import {EXCEL_PIECE_QUERY, EXCEL_PIECE_SLUGS_QUERY, EXCEL_PIECES_QUERY} from '@/sanity/queries'
import {cardFromSanity, detailFromSanity} from './from-sanity'
import type {ExcelPieceCard, ExcelPieceDetail} from './types'

// The Excel Lab pages' only data access. Unlike Work there is no JSON bridge:
// with zero pieces published the lists are simply empty, and the Excel Lab
// page then shows its designed "coming soon" state.

const EXCEL_PIECE_TAGS = ['excelPiece']

export async function getExcelPieceSlugs(): Promise<string[]> {
  const rows = await sanityFetch({query: EXCEL_PIECE_SLUGS_QUERY, tags: EXCEL_PIECE_TAGS})
  return rows.map((row) => row.slug).filter((slug): slug is string => Boolean(slug))
}

export async function getExcelPieces(): Promise<ExcelPieceCard[]> {
  const rows = await sanityFetch({query: EXCEL_PIECES_QUERY, tags: EXCEL_PIECE_TAGS})
  return rows.map(cardFromSanity)
}

// null when no such piece exists (the page then calls notFound()).
export async function getExcelPiece(slug: string): Promise<ExcelPieceDetail | null> {
  const row = await sanityFetch({query: EXCEL_PIECE_QUERY, params: {slug}, tags: EXCEL_PIECE_TAGS})
  return row ? detailFromSanity(row) : null
}
