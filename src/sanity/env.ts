// The three public Sanity settings the website needs. None of them is a
// secret — the project ID and dataset appear in every public API URL — which
// is why they use the NEXT_PUBLIC_ prefix and live in .env.local / Vercel's
// environment variables (see .env.example). There is deliberately NO token
// here: the website only reads published content from a public dataset, so it
// never holds a write or read token (phase-4-plan.md section 6).

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    // Fail loudly. An empty project ID would otherwise produce a confusing
    // "no results" or network error far from the real cause.
    throw new Error(
      `Missing environment variable ${name}. Add it to .env.local (see .env.example) and to the Vercel project's environment variables.`,
    )
  }
  return value
}

// Each variable must be referenced as a literal `process.env.NAME` so Next.js
// can inline it; reading it through a computed key would not work.
export const projectId = requireEnv(
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
)

export const dataset = requireEnv('NEXT_PUBLIC_SANITY_DATASET', process.env.NEXT_PUBLIC_SANITY_DATASET)

// A Sanity API version is just a date: the API behaves as it did on that day.
// Pinned so a future Sanity change cannot alter query results unannounced.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-10-01'
