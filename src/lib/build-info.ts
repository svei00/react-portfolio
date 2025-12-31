// Read server-side only (this file is imported by a Server Component), so
// no NEXT_PUBLIC_ prefix is needed. Vercel injects VERCEL_GIT_COMMIT_SHA
// automatically at build time; it is absent when building locally, which
// is exactly the case the "local" fallback exists to make obvious — see
// notes.md entry 62 for why this stamp exists (a stale Netlify deploy was
// silently serving a build from before Phase 1).
export const buildInfo = {
  commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
  builtAt: new Date().toISOString().slice(0, 10),
}
