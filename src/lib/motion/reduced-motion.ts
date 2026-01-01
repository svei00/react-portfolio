import { gsap } from './gsap-setup'

// This is the ONE gsap.matchMedia() instance for the entire site
// (handoff.md §8.3: "everything gated behind one gsap.matchMedia() reduced
// motion check"). Every animated component calls registerMotion() below
// instead of creating its own matchMedia — a second matchMedia instance
// elsewhere in the codebase is a bug, not a valid alternative.
//
// gsap.matchMedia() re-runs its callbacks automatically if the user
// toggles their OS-level "reduce motion" setting while the page is open,
// which a plain one-time `window.matchMedia(...).matches` check would not.
const motion = gsap.matchMedia()

interface RegisterMotionArgs {
  // Runs when the user has NOT requested reduced motion. Build the full
  // animated experience here (ScrollTrigger timelines, SplitText reveals,
  // etc). GSAP automatically reverts everything created in this function
  // if the media query state flips, so no manual cleanup is required.
  full: () => void
  // Runs when the user HAS requested reduced motion
  // (prefers-reduced-motion: reduce). Set the same end state instantly —
  // final opacity/position, no stagger, no scroll pinning — so the content
  // is still fully visible and readable, just without motion.
  reduced: () => void
}

// Registers one component's animation under the shared reduced-motion
// gate. Call this from inside a useGSAP/useEffect hook that is already
// scoped to the component's container ref (GSAP's automatic revert on
// media-query change only cleans up tweens created during this call).
//
// Both queries below are required, not just the "reduce" one: GSAP's
// matchMedia object-conditions form only invokes the callback for keys
// whose query is CURRENTLY true — it does not call the function with
// `false` when a query doesn't match. Registering only `reduceMotion`
// means the callback silently never fires at all for the far more common
// case where the user has no reduced-motion preference set, which is
// exactly the bug this comment exists to stop someone from reintroducing.
// Verified directly against gsap@3.15.0's matchMedia behavior before
// writing this fix (see notes.md entry 68).
export function registerMotion({ full, reduced }: RegisterMotionArgs) {
  motion.add(
    {
      reduceMotion: '(prefers-reduced-motion: reduce)',
      noPreference: '(prefers-reduced-motion: no-preference)',
    },
    (context) => {
      const { reduceMotion } = context.conditions as {
        reduceMotion: boolean
        noPreference: boolean
      }
      if (reduceMotion) {
        reduced()
      } else {
        full()
      }
    },
  )
}

export { motion as sharedMotionMatchMedia }
