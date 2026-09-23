import type { Metadata } from 'next'
import ContactView from '@/components/contact/contact-view'
import PageTransition from '@/components/motion/page-transition'
import { getSiteCopy } from '@/lib/site/settings'

export const metadata: Metadata = {
  title: 'Contact',
  // One honest sentence, no city list — handoff.md §4.6/§4.8 flagged the
  // keyword-stuffed version (Riverside, Rialto, Colton...) as spam to both
  // Google and humans; this page was missed when the rest were cleaned up.
  description: 'Get in touch with Ivan E. Villanueva about full-time roles or freelance projects.',
  alternates: { canonical: '/contact' },
}

export default async function ContactPage() {
  const { name, location, email, contactIntro } = await getSiteCopy()

  return (
    <PageTransition>
      <ContactView name={name} location={location} email={email} intro={contactIntro} />
    </PageTransition>
  )
}
