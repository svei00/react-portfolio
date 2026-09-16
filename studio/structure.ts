import type {StructureResolver} from 'sanity/structure'

// What editors see in the left-hand menu: Site settings first (opens the one
// document directly — no list, no "create new"), then Work and Excel Lab,
// each ordered the way they appear on the site.
export const SITE_SETTINGS_ID = 'siteSettings'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .id(SITE_SETTINGS_ID)
        .title('Site settings')
        .child(S.document().schemaType('siteSettings').documentId(SITE_SETTINGS_ID)),
      S.divider(),
      S.listItem()
        .id('project')
        .title('Work')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Work')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}]),
        ),
      S.listItem()
        .id('excelPiece')
        .title('Excel Lab')
        .schemaType('excelPiece')
        .child(
          S.documentTypeList('excelPiece')
            .title('Excel Lab')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}]),
        ),
    ])
