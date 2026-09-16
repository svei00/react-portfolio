import {defineArrayMember, defineType} from 'sanity'

// Deliberately small Portable Text: paragraphs, one heading level, bold,
// italic, links and bullet lists. No embedded images — images live in their
// own `accessibleImage` fields so every one is forced to have alt text.
//
// This is registered by name in `fieldTypes` of the internationalized-array
// plugin (sanity.config.ts), which is what generates the localized
// `internationalizedArraySimpleBlockContent` type used by the documents.
export const simpleBlockContent = defineType({
  name: 'simpleBlockContent',
  title: 'Rich text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h3'},
      ],
      lists: [{title: 'Bullet list', value: 'bullet'}],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            title: 'Link',
            type: 'object',
            fields: [
              {
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (rule) => rule.uri({scheme: ['https', 'mailto']}),
              },
            ],
          },
        ],
      },
    }),
  ],
})
