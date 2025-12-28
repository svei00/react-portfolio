import type { NextConfig } from 'next'

// CSP starts in report-only mode per handoff.md S5 / phase-2-plan.md §6
// step 11 — flip Content-Security-Policy-Report-Only to the enforcing
// Content-Security-Policy header in Phase 6, once report-only has run
// live with no unexpected violations.
//
// No nonces: a nonce-based CSP needs per-request generation in proxy.ts,
// which would force every route to render dynamically — defeating the
// static generation this whole migration exists to gain, for a marketing
// site with no user-generated script content. 'unsafe-inline' for styles
// is the deliberate trade-off (phase-2-plan.md §6 step 11).
const CSP_DIRECTIVES = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
  "font-src 'self'",
  "connect-src 'self' https://api.emailjs.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join('; ')

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          { key: 'Content-Security-Policy-Report-Only', value: CSP_DIRECTIVES },
        ],
      },
    ]
  },
}

export default nextConfig
