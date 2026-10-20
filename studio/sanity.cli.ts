import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b0kesagv',
    dataset: 'production'
  },
  // TypeGen: reads the GROQ queries in the WEBSITE (../src/sanity/queries.ts)
  // and the schema extracted from this Studio, and writes result types into
  // the website. Run it with `npm run typegen` from studio/ after changing a
  // schema or a query. The output file is committed so the site builds without
  // needing the Studio's tooling.
  typegen: {
    path: '../src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../src/sanity/types.ts',
    overloadClientMethods: true,
  },
  // Hosted at https://ivan-villanueva-portfolio.sanity.studio. Pinned here so
  // `sanity deploy` never stops to prompt for a hostname.
  studioHost: 'ivan-villanueva-portfolio',
  deployment: {
    // Issued by the first `sanity deploy`; identifies this hosted Studio.
    appId: 'lu4v62lbzyvtfawz7cvsflvx',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
