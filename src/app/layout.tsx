import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import NavBar from '@/components/nav-bar/nav-bar'
import SiteFooter from '@/components/footer/site-footer'
import CustomCursor from '@/components/motion/custom-cursor'
import SmoothScrollProvider from '@/lib/motion/smooth-scroll-provider'
import { fraunces, generalSans } from '@/styles/fonts'
import '@/styles/tokens.scss'
import '@/styles/globals.scss'
import '@/styles/layout.scss'
import 'animate.css'
import 'loaders.css/src/animations/pacman.scss'

const SITE_DESCRIPTION =
  'Fullstack software engineer in the Inland Empire, California, building React web apps, animations and interactive experiences.'

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.excelsolutionsv.com'),
  title: {
    default: 'Ivan E. Villanueva | Fullstack Developer',
    template: '%s | Ivan E. Villanueva',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'Ivan E. Villanueva',
    title: 'Ivan E. Villanueva | Fullstack Developer',
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ivan E. Villanueva | Fullstack Developer',
    description: SITE_DESCRIPTION,
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${generalSans.variable}`}>
      <body>
        <SmoothScrollProvider>
          <div className="App">
            <NavBar />
            <div className="page">{children}</div>
            <SiteFooter />
            <CustomCursor />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
