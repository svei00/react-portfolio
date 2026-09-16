import {defineArrayMember, defineField, defineType} from 'sanity'
import {englishBlocks, englishString} from '../helpers/localized-validation'

// The one singleton: shared copy that appears on several pages. Its `_id` is
// fixed to "siteSettings" in structure.ts (the only document that gets an
// explicit id — everything else lets Sanity generate one).
//
// Anything here that states a career fact — title, location, employers,
// dates, degrees — must match LinkedIn (linkedin.com/in/ivan-e-villanueva),
// which is the source of truth for those (handoff.md section 2, decision 6).
// Keeping both in step is now a two-minute edit in this form, not a code
// change.
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'identity', title: 'Identity', default: true},
    {name: 'home', title: 'Home'},
    {name: 'about', title: 'About'},
    {name: 'contact', title: 'Contact'},
    {name: 'seo', title: 'Links & SEO'},
  ],
  fields: [
    // ---- Identity ----------------------------------------------------
    defineField({
      name: 'name',
      type: 'string',
      group: 'identity',
      description: 'As it appears in the nav, page titles and the footer.',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'title',
      title: 'Title / tagline',
      type: 'internationalizedArrayString',
      group: 'identity',
      description:
        'Your professional title. Used as the Home tagline and in the site title. Must match LinkedIn. Currently: "Software Developer · Accounting Automation".',
      validation: englishString('Title', 80),
    }),
    defineField({
      name: 'location',
      type: 'internationalizedArrayString',
      group: 'identity',
      description:
        'CITY LEVEL ONLY, e.g. "Guadalajara, Mexico · Remote". Never a street address, neighbourhood, or coordinates (handoff finding S4: a street address was once published on this site). Must match LinkedIn.',
      validation: englishString('Location', 60),
    }),
    defineField({
      name: 'email',
      type: 'string',
      group: 'identity',
      validation: (rule) => rule.required().email(),
    }),

    // ---- Home --------------------------------------------------------
    defineField({
      name: 'positioningStatement',
      type: 'internationalizedArraySimpleBlockContent',
      group: 'home',
      description:
        'The paragraph under the hero on the Home page: what you do and why you are different. 2 to 3 sentences.',
      validation: englishBlocks('Positioning statement'),
    }),

    // ---- About -------------------------------------------------------
    defineField({
      name: 'aboutBody',
      title: 'About text',
      type: 'internationalizedArraySimpleBlockContent',
      group: 'about',
      description: 'The main About text, beside the portrait. Short and human.',
      validation: englishBlocks('About text'),
    }),
    defineField({
      name: 'background',
      type: 'array',
      group: 'about',
      description:
        'Work and Education groups on the About page. Dates and titles must match LinkedIn exactly.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'backgroundGroup',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              description: 'e.g. Work, Education',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'items',
              type: 'array',
              description:
                'One line each, e.g. "Department Head, Servicio de Administración Tributaria (SAT) · 2005 – 2014".',
              of: [defineArrayMember({type: 'string'})],
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {select: {title: 'label', items: 'items'}, prepare: ({title, items}) => ({
            title,
            subtitle: `${(items as string[] | undefined)?.length ?? 0} lines`,
          })},
        }),
      ],
    }),
    defineField({
      name: 'skillGroups',
      type: 'array',
      group: 'about',
      description:
        'Skill groups on the About page. Keep Python in "Data & Automation", NOT next to JavaScript/TypeScript — this site is built in TypeScript and Python must not read as if it built it.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'skillGroup',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'skills',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {layout: 'tags'},
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {select: {title: 'label', skills: 'skills'}, prepare: ({title, skills}) => ({
            title,
            subtitle: ((skills as string[] | undefined) ?? []).join(' · '),
          })},
        }),
      ],
    }),

    // ---- Contact -----------------------------------------------------
    defineField({
      name: 'contactIntro',
      type: 'internationalizedArrayText',
      group: 'contact',
      description:
        'The paragraph above the contact form. Must match what LinkedIn says you are open to (Open to work).',
      validation: englishString('Contact intro'),
    }),

    // ---- Links & SEO ---------------------------------------------------
    defineField({
      name: 'socialLinks',
      type: 'array',
      group: 'seo',
      description: 'Shown in the footer. LinkedIn first.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required().uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        }),
      ],
    }),
    defineField({
      name: 'seoDescription',
      title: 'Search / share description',
      type: 'internationalizedArrayString',
      group: 'seo',
      description:
        'ONE honest sentence for Google and link previews. No keyword lists, no city lists (handoff 4.6: those read as spam).',
      validation: englishString('Description', 170),
    }),
    defineField({
      name: 'ogImage',
      title: 'Share image (optional)',
      type: 'accessibleImage',
      group: 'seo',
      description:
        '1200 x 630 landscape, shown when the site is shared on LinkedIn or X. Optional: if empty, the site generates a navy-and-gold text card automatically.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
