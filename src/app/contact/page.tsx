import type { Metadata } from 'next'
import ContactView from '@/components/contact/contact-view'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Software Engineer in Inland Empire Area',
  keywords: ['Software Engineer', 'Riverside', 'Rialto', 'Colton', 'Inland Empire', 'California'],
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return <ContactView />
}
