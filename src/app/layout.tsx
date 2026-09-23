import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import NavBar from '@/components/nav-bar/nav-bar'
import SiteFooter from '@/components/footer/site-footer'
import CustomCursor from '@/components/motion/custom-cursor'
import SmoothScrollProvider from '@/lib/motion/smooth-scroll-provider'
import { getSiteCopy } from '@/lib/site/settings'
import { fraunces, generalSans } from '@/styles/fonts'
import '@/styles/tokens.scss'
import '@/styles/globals.scss'
import '@/styles/layout.scss'

// The site-wide title, description and social-card text come from the
// `siteSettings` document in Sanity, with the coded fallback behind it (see
// src/lib/site/). Per-page titles and descriptions stay in each page's own
// metadata, because they describe that page, not the site.
export async function generateMetadata(): Promise<Metadata> {
  const { name, title, seoDescription } = await getSiteCopy()
  const fullTitle = `${name} | ${title}`

  return {
    metadataBase: new URL('https://portfolio.excelsolutionsv.com'),
    title: {
      default: fullTitle,
      template: `%s | ${name}`,
    },
    description: seoDescription,
    openGraph: {
      type: 'website',
      siteName: name,
      title: fullTitle,
      description: seoDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: seoDescription,
    },
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${generalSans.variable}`}>
      <body>
        <SmoothScrollProvider>
          <div className="App">
            <NavBar />
            <main className="page">{children}</main>
            <SiteFooter />
            <CustomCursor />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
