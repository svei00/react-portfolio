import { NextResponse } from 'next/server'

const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send'

// Minimal in-memory throttle: one submission per IP every 30 seconds.
// Good enough for a single-instance low-traffic portfolio site (handoff.md
// S6 asks for "a minimal client throttle", this backs it up server-side
// too) — not meant to survive multi-instance scaling, which this site
// doesn't need.
const lastSubmissionByIp = new Map<string, number>()
const THROTTLE_MS = 30_000

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
  // Honeypot field: real users never see or fill this (hidden via CSS in
  // the form). Any non-empty value here means a bot filled every field.
  company?: string
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ContactPayload | null

  if (!body) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (body.company) {
    // Silently succeed for bots so they don't learn the honeypot exists.
    return NextResponse.json({ ok: true })
  }

  const { name, email, subject, message } = body
  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const lastSubmission = lastSubmissionByIp.get(ip)
  if (lastSubmission && Date.now() - lastSubmission < THROTTLE_MS) {
    return NextResponse.json({ error: 'Please wait before sending another message' }, { status: 429 })
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID
  const templateId = process.env.EMAILJS_TEMPLATE_ID
  const publicKey = process.env.EMAILJS_PUBLIC_KEY
  const privateKey = process.env.EMAILJS_PRIVATE_KEY

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    console.error('Missing EmailJS environment variables')
    return NextResponse.json({ error: 'Email service is not configured' }, { status: 500 })
  }

  const emailjsResponse = await fetch(EMAILJS_SEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: { name, email, subject, message },
    }),
  })

  if (!emailjsResponse.ok) {
    const errorText = await emailjsResponse.text()
    console.error('EmailJS send failed:', emailjsResponse.status, errorText)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 502 })
  }

  lastSubmissionByIp.set(ip, Date.now())
  return NextResponse.json({ ok: true })
}
