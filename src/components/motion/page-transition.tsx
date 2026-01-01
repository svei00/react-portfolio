import { ViewTransition } from 'react'

// Wraps a page's content so navigating to/from it crossfades instead of
// popping instantly. Per the Next 16 docs
// (node_modules/next/dist/docs/01-app/02-guides/view-transitions.md), this
// wrapper belongs in each page.tsx, never in layout.tsx — layouts persist
// across navigation, so a ViewTransition there would never see an
// enter/exit boundary fire.
//
// This is the sitewide default transition; it replaces the hand-rolled
// GSAP covering wipe that handoff.md §8.3 originally imagined (see
// notes.md entry 66 for why). Directional nav-forward/nav-back transitions
// and the shared-element image morph are reserved for the Work index →
// case-study navigation in Phase 3.3, where there is an actual hierarchy
// to signal direction through — this flat top-level nav doesn't have one.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-fade" exit="page-fade" default="none">
      {children}
    </ViewTransition>
  )
}
