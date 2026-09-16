import {defineField, defineType} from 'sanity'
import {englishString} from '../helpers/localized-validation'

// Every image on the site goes through this type, so alt text is impossible
// to forget: the English alt is required and the image can't be saved
// without it (handoff.md section 9, finding 4.9 — accessibility).
//
// Each *usage* of this type sets its own `description` with the aspect ratio
// and what the picture should show — that is where Svei gets told what kind
// of image is expected, at the point of entry (phase-3-plan.md section 13).
export const accessibleImage = defineType({
  name: 'accessibleImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image file',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'internationalizedArrayString',
      description:
        'One sentence describing what is in the picture, for people who cannot see it. Not a file name, not a keyword list.',
      validation: englishString('Alt text', 140),
    }),
  ],
  preview: {
    select: {media: 'image', alt: 'alt'},
    prepare({media, alt}) {
      const english = Array.isArray(alt)
        ? (alt as Array<{language?: string; value?: string}>).find((i) => i.language === 'en')
        : undefined
      return {title: english?.value ?? 'Missing alt text', media}
    },
  },
})
