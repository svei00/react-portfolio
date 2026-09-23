import type {EXCEL_PIECE_QUERY_RESULT, EXCEL_PIECES_QUERY_RESULT} from '@/sanity/types'
import {toWorkImage} from '@/lib/work/from-sanity'
import type {WorkImage} from '@/lib/work/types'
import type {ExcelPieceCard, ExcelPieceDetail} from './types'

// Turns Sanity's query results into the plain shapes the views render. As in
// src/lib/work/from-sanity.ts, the generated types say required fields are
// always there, but a half-written document can lack them, so the optional
// ones are given safe defaults here instead of crashing the page.

export function cardFromSanity(piece: EXCEL_PIECES_QUERY_RESULT[number]): ExcelPieceCard {
  return {
    slug: piece.slug,
    title: piece.title ?? 'Untitled piece',
    problem: piece.problem ?? '',
    outcome: piece.outcome ?? '',
    status: piece.status,
    tools: piece.tools ?? [],
  }
}

export function detailFromSanity(piece: NonNullable<EXCEL_PIECE_QUERY_RESULT>): ExcelPieceDetail {
  return {
    slug: piece.slug,
    title: piece.title ?? 'Untitled piece',
    problem: piece.problem ?? '',
    outcome: piece.outcome ?? '',
    status: piece.status,
    tools: piece.tools ?? [],
    solution: (piece.solution ?? []) as ExcelPieceDetail['solution'],
    differentiator: piece.differentiator ?? null,
    honestNote: piece.honestNote ?? null,
    fileUrl: piece.fileUrl ?? null,
    catalogUrl: piece.catalogUrl ?? null,
    images: (piece.images ?? [])
      .map((item) => toWorkImage(item))
      .filter((image): image is WorkImage => image !== null),
  }
}
