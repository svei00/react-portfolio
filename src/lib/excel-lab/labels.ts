import type {ExcelPieceStatus} from './types'

// Words shown on the site for each status value stored in Sanity.
export const STATUS_LABEL: Record<ExcelPieceStatus, string> = {
  'in-use': 'In daily use',
  'active-development': 'Under active development',
}

// ExcelSolutionsV is the full, Spanish, accountant-facing catalogue; Excel Lab
// shows only a few curated pieces and points there once (phase-4-plan.md §2.1).
// Same host as the ExcelSolutionsV entry in src/content/projects.json.
export const EXCEL_CATALOGUE_URL = 'https://www.excelsolutionsv.com/projects'
