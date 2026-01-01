import Link from 'next/link'
import { buildInfo } from '@/lib/build-info'
import styles from './site-footer.module.scss'

// Server Component — buildInfo reads process.env directly, so no
// NEXT_PUBLIC_ prefix and no client-side fetch are needed for the build
// stamp (notes.md entry 62 explains why the stamp exists at all).
//
// This is a thin fixed bar rather than the full tall CTA footer
// phase-3-plan.md §3.1 describes — see the comment in
// site-footer.module.scss for why that has to wait until every page has a
// normal-flow layout (Phase 3.2-3.6).
const SOCIAL_LINKS = [
  { href: 'https://www.linkedin.com/in/ivan-e-villanueva-26253157/', label: 'LinkedIn' },
  { href: 'https://github.com/svei00/', label: 'GitHub' },
  { href: 'https://www.youtube.com/channel/UCbxQit2ZC4U1eUwdZVQkhwg', label: 'YouTube' },
  { href: 'https://twitter.com/svei00', label: 'Twitter' },
]

const SiteFooter = () => (
  <footer className={styles.footer}>
    <Link href="/contact" className={styles.ctaLink}>
      Let&apos;s talk →
    </Link>

    <ul className={styles.socialList}>
      {SOCIAL_LINKS.map(({ href, label }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
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

export default SiteFooter
