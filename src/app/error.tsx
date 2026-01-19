'use client'

import StatusPageView from '@/components/status-page/status-page-view'

// Next.js requires error.tsx to be a Client Component — it receives
// `error` and `reset` as props automatically for any error thrown while
// rendering a route inside this segment. `reset()` re-renders the
// segment rather than reloading the whole page.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <StatusPageView
      code="Oops"
      message="Something went wrong loading this page. It's on my end, not yours."
      action={{ kind: 'button', label: 'Try again', onClick: reset }}
    />
  )
}
