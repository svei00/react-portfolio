import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import { buildInfo } from '@/lib/build-info'
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
            <Sidebar />
            <div className="page">
              {children}
              {/* Bare-line build stamp — proves which deploy is actually
                  live (notes.md entry 62). Gets folded into the designed
                  footer in Phase 3.1; this is deliberately minimal for now. */}
              <p className="build-stamp">
                {buildInfo.commit} · {buildInfo.builtAt}
              </p>
            </div>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
