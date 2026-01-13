'use client'

import { useState, type FormEvent } from 'react'
import styles from './contact.module.scss'

type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const THROTTLE_MS = 30_000

const ContactForm = () => {
  const [state, setState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [lastSentAt, setLastSentAt] = useState<number | null>(null)

  const throttled = lastSentAt !== null && Date.now() - lastSentAt < THROTTLE_MS

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (throttled) {
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)

    // Honeypot: real visitors never fill this (visually hidden field).
    if (formData.get('company')) {
      setState('success')
      form.reset()
      return
    }

    setState('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          company: formData.get('company'),
        }),
      })

      const data = (await response.json()) as { ok?: boolean; error?: string }

      if (!response.ok || !data.ok) {
        setState('error')
        setErrorMessage(data.error ?? 'Failed to send the message, please try again.')
        return
      }

      setState('success')
      setLastSentAt(Date.now())
      form.reset()
    } catch {
      setState('error')
      setErrorMessage('Failed to send the message, please try again.')
    }
  }

  return (
    <div className={styles.contactForm}>
      <form onSubmit={handleSubmit}>
        <ul>
          <li className={styles.half}>
            <label className="sr-only" htmlFor="contact-name">
              Name
            </label>
            <input id="contact-name" type="text" name="name" placeholder="Name" required />
          </li>
          <li className={styles.half}>
            <label className="sr-only" htmlFor="contact-email">
              Email
            </label>
            <input id="contact-email" type="email" name="email" placeholder="Email" required />
          </li>
          <li>
            <label className="sr-only" htmlFor="contact-subject">
              Subject
            </label>
            <input id="contact-subject" type="text" name="subject" placeholder="Subject" required />
          </li>
          <li>
            <label className="sr-only" htmlFor="contact-message">
              Message
            </label>
            <textarea id="contact-message" name="message" placeholder="Message" required />
          </li>
          {/* Honeypot — hidden from real visitors, bots that fill every field trip it */}
          <li className="sr-only" aria-hidden="true">
            <label htmlFor="contact-company">Leave this field empty</label>
            <input id="contact-company" type="text" name="company" tabIndex={-1} autoComplete="off" />
          </li>
          <li>
            <input
              type="submit"
              className={styles.flatButton}
              value={state === 'sending' ? 'Sending…' : 'Send'}
              disabled={state === 'sending' || throttled}
            />
          </li>
          {state === 'success' && (
            <li role="status" className={`${styles.formStatus} ${styles.formStatusSuccess}`}>
              Message sent — thank you!
            </li>
          )}
          {state === 'error' && (
            <li role="alert" className={`${styles.formStatus} ${styles.formStatusError}`}>
              {errorMessage}
            </li>
          )}
        </ul>
      </form>
    </div>
  )
}

export default ContactForm
