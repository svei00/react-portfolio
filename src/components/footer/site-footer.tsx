import Link from 'next/link'
import { buildInfo } from '@/lib/build-info'
import { getSiteCopy } from '@/lib/site/settings'
import styles from './site-footer.module.scss'

// Server Component — buildInfo reads process.env directly, so no
// NEXT_PUBLIC_ prefix and no client-side fetch are needed for the build
// stamp (notes.md entry 62 explains why the stamp exists at all).
//
// This is a thin fixed bar rather than the full tall CTA footer
// phase-3-plan.md §3.1 describes — see the comment in
// site-footer.module.scss for why that has to wait until every page has a
// normal-flow layout (Phase 3.2-3.6).
//
// The social links come from the `siteSettings` document (coded fallback in
// src/content/site-copy.ts), so adding or fixing one is a Studio edit.
const SiteFooter = async () => {
  const { socialLinks } = await getSiteCopy()

  return (
    <footer className={styles.footer}>
      <Link href="/contact" className={styles.ctaLink}>
        Let&apos;s talk →
      </Link>

      <ul className={styles.socialList}>
        {socialLinks.map(({ url, label }) => (
          <li key={url}>
            <a href={url} target="_blank" rel="noreferrer" aria-label={label}>
              {label}
            </a>
          </li>
        ))}
      </ul>

      <p className={styles.buildStamp}>
        {buildInfo.commit} · {buildInfo.builtAt}
      </p>
    </footer>
  )
}

export default SiteFooter
