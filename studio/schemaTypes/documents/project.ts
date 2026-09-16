import {defineArrayMember, defineField, defineType} from 'sanity'
import {englishBlocks, englishString, type LocalizedItem} from '../helpers/localized-validation'

// Work = software Svei builds that is NOT specific to accounting: web apps,
// mobile apps, general desktop apps (phase-4-plan.md section 1, decision 2).
// Accounting / tax / data automation belongs in `excelPiece` instead, whatever
// the language. Rule of thumb for a tie: if the outcome is measured in
// accounting terms, it is Excel Lab.
//
// Shape mirrors src/types/project.ts plus `platform` and `year`.
export const project = defineType({
  name: 'project',
  title: 'Work project',
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
      description: 'The web address of this project: /work/<slug>. Click Generate.',
      options: {
        source: (doc) =>
          ((doc as {title?: LocalizedItem<string>[]}).title ?? []).find((i) => i.language === 'en')
            ?.value ?? '',
        maxLength: 60,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'internationalizedArrayString',
      description: 'One short sentence shown under the title on the Work grid.',
      validation: englishString('Summary', 120),
    }),
    defineField({
      name: 'description',
      type: 'internationalizedArraySimpleBlockContent',
      description: 'What it is, who it is for, and what you built. A few short paragraphs.',
      validation: englishBlocks('Description'),
    }),
    defineField({
      name: 'platform',
      type: 'string',
      description: 'Where it runs. Shown on the project tile.',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Desktop', value: 'desktop'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      type: 'number',
      description: 'Year it was first shipped.',
      validation: (rule) => rule.required().integer().min(2000).max(2100),
    }),
    defineField({
      name: 'coverImage',
      type: 'accessibleImage',
      description:
        'COVER, 4:3 landscape. The single best representative shot: the home page hero or the main screen. Used on the Work grid and as the hero of the project page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      description:
        'Optional. 2 to 4 supporting shots, any aspect ratio: a key feature, the mobile view, a detail.',
      of: [defineArrayMember({type: 'accessibleImage'})],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'techStack',
      type: 'array',
      description: 'Technologies used, in the order you would say them. Press Enter after each.',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live site URL',
      type: 'url',
      description: 'Leave empty for desktop apps and anything not online.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'repoUrl',
      title: 'Source code URL',
      type: 'url',
      description: 'Only if the repository is public.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({
      name: 'orderRank',
      title: 'Order',
      type: 'number',
      description: 'Position on the Work page. 1 is first.',
      validation: (rule) => rule.required().integer().min(1),
    }),
  ],
  orderings: [
    {title: 'Order on the site', name: 'orderRankAsc', by: [{field: 'orderRank', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', year: 'year', platform: 'platform', media: 'coverImage.image'},
    prepare({title, year, platform, media}) {
      const english = Array.isArray(title)
        ? (title as Array<{language?: string; value?: string}>).find((i) => i.language === 'en')
        : undefined
      return {
        title: english?.value ?? 'Untitled project',
        subtitle: [platform, year].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
