import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'b0kesagv',
    dataset: 'production'
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
