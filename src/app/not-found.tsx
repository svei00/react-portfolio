import StatusPageView from '@/components/status-page/status-page-view'

// Rendered automatically by Next.js for any route that doesn't match —
// no route wiring needed beyond this file existing at app/not-found.tsx.
export default function NotFound() {
  return (
    <StatusPageView
      code="404"
      message="This page doesn't exist. It may have moved, or the link was wrong."
      action={{ kind: 'link', label: 'Back to Home', href: '/' }}
    />
  )
}
