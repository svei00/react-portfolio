import {excelPiece} from './documents/excel-piece'
import {project} from './documents/project'
import {siteSettings} from './documents/site-settings'
import {accessibleImage} from './objects/accessible-image'
import {simpleBlockContent} from './objects/simple-block-content'

// Order here is only the order Sanity registers them in; what editors see is
// controlled by structure.ts.
export const schemaTypes = [
  // content
  siteSettings,
  project,
  excelPiece,
  // building blocks
  accessibleImage,
  simpleBlockContent,
]
