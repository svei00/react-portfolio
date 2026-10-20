// The one language the site is authored and rendered in. Every localized
// field in Sanity is stored per language (sanity-plugin-internationalized-
// array), and every query takes a `$locale` parameter plus an English
// fallback — so adding Spanish later means changing this constant and
// filling fields, not rewriting queries or migrating content
// (phase-4-plan.md section 1, decision 1).
export const DEFAULT_LOCALE = 'en'
