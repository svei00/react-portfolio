import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Sidebar from '@/components/sidebar/sidebar'
import { coolvetica, helveticaNeue, laBelleAurore } from '@/styles/fonts'
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
    <html
      lang="en"
      className={`${helveticaNeue.variable} ${laBelleAurore.variable} ${coolvetica.variable}`}
    >
      <body>
        <div className="App">
          <Sidebar />
          <div className="page">
            <span className="tags top-tags">&lt;body&gt;</span>

            {children}

            <span className="tags bottom-tags">
              &lt;/body&gt;
              <br />
              <span className="bottom-tag-html">&lt;/html&gt;</span>
            </span>
          </div>
        </div>
      </body>
    </html>
  )
}
