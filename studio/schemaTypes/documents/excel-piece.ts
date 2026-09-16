import {defineArrayMember, defineField, defineType} from 'sanity'
import {englishBlocks, englishString, type LocalizedItem} from '../helpers/localized-validation'

// Excel Lab = accounting, tax and data automation in ANY language (Excel,
// VBA, Power Query and Python tools that serve accounting work). It is a
// case study, not a screenshot dump: Problem -> Solution -> Outcome
// (handoff.md section 10). The fields mirror the structure of
// excelsolutionsv.com/projects (El problema / Que hace / Lo que lo hace
// distinto / Nota honesta / Herramientas) so Phase 5 is mostly translating and
// curating, not inventing (phase-4-plan.md section 2.1). Excel Lab shows 2-3
// curated pieces; ExcelSolutionsV stays the full Spanish catalogue.
export const excelPiece = defineType({
  name: 'excelPiece',
  title: 'Excel Lab piece',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'internationalizedArrayString',
      validation: englishString('Title', 80),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'The web address of this piece: /excel-lab/<slug>. Click Generate.',
      options: {
        source: (doc) =>
          ((doc as {title?: LocalizedItem<string>[]}).title ?? []).find((i) => i.language === 'en')
            ?.value ?? '',
        maxLength: 60,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'problem',
      type: 'internationalizedArrayText',
      description:
        'The accountant’s pain, in one paragraph: what was slow, manual or error-prone, and for whom.',
      validation: englishString('Problem'),
    }),
    defineField({
      name: 'solution',
      type: 'internationalizedArraySimpleBlockContent',
      description:
        'What you engineered: the data model, Power Query / VBA / Python architecture, dynamic arrays.',
      validation: englishBlocks('Solution'),
    }),
    defineField({
      name: 'differentiator',
      title: 'What makes it different',
      type: 'internationalizedArrayText',
      description: 'Optional. The one design decision that separates it from the obvious approach.',
    }),
    defineField({
      name: 'outcome',
      type: 'internationalizedArrayString',
      description:
        'ONE hard metric, e.g. "Monthly close from 3 days to 4 hours" or "Reads 800 CFDI files in under a minute". Required: a case study without a number is just a description.',
      validation: englishString('Outcome', 140),
    }),
    defineField({
      name: 'honestNote',
      title: 'Honest note',
      type: 'internationalizedArrayText',
      description:
        'Optional but encouraged. What it does not do yet, or its limits. It is the most credible thing on the page.',
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: {
        list: [
          {title: 'In daily use', value: 'in-use'},
          {title: 'Under active development', value: 'active-development'},
        ],
        layout: 'radio',
      },
      initialValue: 'in-use',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tools',
      type: 'array',
      description: 'e.g. Python, Power Query, VBA, openpyxl. Press Enter after each.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'images',
      type: 'array',
      description:
        '1 to 3 polished visuals. STAGED / DEMO DATA ONLY: no real client data, RFCs, names, or fiscal figures in any screenshot (handoff section 10). Landscape works best.',
      of: [defineArrayMember({type: 'accessibleImage'})],
      validation: (rule) => rule.required().min(1).max(3),
    }),
    defineField({
      name: 'fileUrl',
      title: 'Download or repository link',
      type: 'url',
      description:
        'Optional. Only fill this where you have explicitly decided to expose the workbook or code.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'catalogUrl',
      title: 'ExcelSolutionsV write-up',
      type: 'url',
      description: 'Optional. Link to this tool on excelsolutionsv.com/projects (the Spanish catalogue).',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({name: 'featured', type: 'boolean', initialValue: true}),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Position on the Excel Lab page. 1 is first.',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {title: 'Order on the site', name: 'orderRankAsc', by: [{field: 'orderRank', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', status: 'status', media: 'images.0.image'},
    prepare({title, status, media}) {
      const english = Array.isArray(title)
        ? (title as Array<{language?: string; value?: string}>).find((i) => i.language === 'en')
        : undefined
      return {
        title: english?.value ?? 'Untitled piece',
        subtitle: status === 'active-development' ? 'Under active development' : 'In daily use',
        media,
      }
    },
  },
})
