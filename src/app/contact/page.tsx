import type { Metadata } from 'next'
import ContactView from '@/components/contact/contact-view'
import PageTransition from '@/components/motion/page-transition'

export const metadata: Metadata = {
  title: 'Contact',
  // One honest sentence, no city list — handoff.md §4.6/§4.8 flagged the
  // keyword-stuffed version (Riverside, Rialto, Colton...) as spam to both
  // Google and humans; this page was missed when the rest were cleaned up.
  description: 'Get in touch with Ivan E. Villanueva about full-time roles or freelance projects.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <PageTransition>
      <ContactView />
    </PageTransition>
  )
}
