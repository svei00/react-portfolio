import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

// The project ID is not a secret (it is in every public API URL), so it is
// kept here as the CLI generated it rather than in an env var.
export default defineConfig({
  name: 'default',
  title: 'Ivan Villanueva — Portfolio',

  projectId: 'b0kesagv',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    // Localized fields: one array item per language, stored as
    // [{_key, language, value}]. English is authored now; Spanish is
    // registered so adding it later means filling fields, not migrating
    // content (phase-4-plan.md section 1). Uses this plugin rather than
    // { en, es } objects, which Sanity's own guidance says hit attribute
    // limits.
    internationalizedArray({
      languages: [
        {id: 'en', title: 'English'},
        {id: 'es', title: 'Español'},
      ],
      defaultLanguages: ['en'],
      // 'string' and 'text' create internationalizedArrayString / ...Text;
      // 'simpleBlockContent' (our own type) creates the localized rich text.
      fieldTypes: ['string', 'text', 'simpleBlockContent'],
      languageDisplay: 'titleAndCode',
      // Hide Spanish by default so an English-only editor never sees it.
      languageFilter: {
        documentTypes: ['siteSettings', 'project', 'excelPiece'],
        defaultLanguages: ['en'],
      },
    }),
    visionTool(),
  ],

  schema: {types: schemaTypes},

  document: {
    // The settings singleton can be edited but never created twice, deleted,
    // duplicated or unpublished.
    actions: (prev, {schemaType}) =>
      schemaType === 'siteSettings'
        ? prev.filter(({action}) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : prev,
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((template) => template.templateId !== 'siteSettings')
        : prev,
  },
})
