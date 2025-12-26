# phase-2-plan.md — Next.js migration plan (Phase 2)

> **Architecture document produced in an Opus 5 session on 2026-08-17.**
> No application code was changed while writing this. Implementation is a
> **Sonnet 5** job: work through §6 in order.
> `handoff.md` remains the overall spec; where this file and handoff.md
> disagree, **this file wins for Phase 2 only** — every deviation is listed
> in §4 with its reason. `notes.md` remains the append-only build log.

---

## 1. Where the project stands

Phase 1 is complete and merged to `main` (last commit
`bump-react-router-dom-fix-xss-advisory`). Firebase is gone, the leaked
GreenSock token is gone, the dead webpack/Netlify pipeline is gone, typos are
fixed, and the contact map no longer points at a home address.

Still open from Phase 1, and **blocking a clean Phase 2 deploy**:

- Vercel dashboard Node.js version is still `18.x` (invalid). Must be `24.x`.

Phase 2 goal, unchanged from handoff.md: **migrate CRA to Next.js App Router
at feature parity. No redesign.** The site should look essentially identical
when this phase ends. All visual work is Phase 3.

---

## 2. Verified target versions

Checked against the npm registry on 2026-08-17, not from memory. handoff.md
was written when Next.js 15 was current; it has since moved.

| Package | handoff.md said | Actual latest | Use |
|---|---|---|---|
| `next` | 15 | **16.3.1** | 16.x |
| `react` / `react-dom` | 18.2 | **19.2.8** | 19.x (required by Next 16) |
| `sass` | — | 1.102.0 | latest |
| `react-leaflet` | 4.0.2 | **5.0.0** | 5.x — v4 does **not** support React 19 |
| `leaflet` | 1.9.3 | 1.9.x | keep |
| `@fortawesome/react-fontawesome` | 0.2.0 (pinned) | latest | bump — latest declares React 19 support |

Peer-dependency checks that came back **safe** for React 19:

- `react-tagcloud` requires `react >=16.8.0` (no upper bound)
- `react-loaders` requires `react >=15`

Both are retired in Phase 3 anyway; they only need to survive Phase 2.

**Packages to remove in this phase:** `react-scripts`, `react-router-dom`,
`react-helmet`, `web-vitals`, `@testing-library/jest-dom`,
`@testing-library/react`, `@testing-library/user-event`.

**Packages to keep for now** (retired in Phase 3, still needed for parity):
`animate.css`, `loaders.css`, `react-loaders`, `react-tagcloud`.

---

## 3. Decisions (settled with Svei, 2026-08-17)

1. **TypeScript.** The port is written in `.tsx` / `.ts`. The app is small
   enough that this is roughly 30 lines of annotations, and it makes Phase 4
   Sanity TypeGen genuinely useful.
2. **Global SCSS is kept in Phase 2.** CSS Modules are deferred to Phase 3.
   Rationale in §4.1 — this is a deliberate deviation from handoff.md.
3. **EmailJS moves behind a Next.js Route Handler**, with a verification step
   and a fallback — see §6 step 9. Reason: the contact form is being rewritten
   in this phase regardless, so doing it client-side now would mean rewriting
   the same form twice.

---

## 4. Deviations from handoff.md, and why

### 4.1 SCSS Modules are deferred to Phase 3 (handoff.md §5 / Phase 2 step 1)

handoff.md specifies converting to SCSS Modules during Phase 2. **Do not do
this.** The survey found the reason it is a bad trade here.

`src/components/Layout/index.scss` does not only style Layout. It styles
`.about-page`, `.contact-page`, `.portfolio-page` and `.skills-page` — class
names that are applied in *four other components' JSX* — along with their
descendant `h1` (including the decorative `<h1>` and `<h1/>` pseudo-element
tags), `p` with its staggered `nth-of-type` animation delays, `.text-zone`,
`.text-animate-hover`, and the entire `max-width: 1200px` responsive block.

Under CSS Modules those selectors get scoped to Layout's stylesheet and stop
matching the markup in About / Contact / Portfolio / Skills. Converting
correctly means hand-untangling that shared typography into a common module
and touching every `className` in every JSX file — in the same phase that is
also swapping the framework, with a "did it change visually?" check that is
hard to do reliably by eye.

Meanwhile Phase 3 rewrites essentially all of these ~1,100 SCSS lines from
scratch: new palette tokens, new type scale, new spacing system, and it
explicitly retires the cube, the Pacman loader, the tag cloud, the sidebar
clone and the per-letter hovers. **Styles written as Modules in Phase 2 get
deleted in Phase 3.** Writing the new Phase 3 styles directly as Modules
costs nothing extra at that point.

So: Phase 2 keeps the stylesheets global and ports them as-is. Phase 3 adopts
Modules as it rewrites.

### 4.2 Next.js 16, not 15

See §2. Starting a fresh migration one major version behind makes no sense.

### 4.3 Node 24, not 22

Already corrected in handoff.md during Phase 1 (Vercel now requires 24.x).

### 4.4 EmailJS route handler is treated as required, not optional

handoff.md S6 calls this "optional". Promoted to required because the form is
being rewritten in this phase anyway — see §3.3.

---

## 5. Target architecture

### 5.1 Folder structure

Folders stay lowercase kebab-case per handoff.md §11.

```
src/
  app/
    layout.tsx                 # root: metadata defaults, globals import, sidebar + page chrome
    page.tsx                   # Home        (server)
    about/page.tsx             # (server)
    portfolio/page.tsx         # (server, reads projects.json)
    skills/page.tsx            # (server)
    contact/page.tsx           # (server)
    api/contact/route.ts       # EmailJS send + honeypot + rate limit
    sitemap.ts
    robots.ts
    manifest.ts
    opengraph-image.png        # one branded 1200x630
    favicon.ico
  components/
    sidebar/sidebar.tsx              'use client'
    animated-letters/animated-letters.tsx
    pacman-loader/pacman-loader.tsx  'use client'
    home/home-view.tsx               'use client'
    home/logo.tsx                    'use client'
    about/about-view.tsx             'use client'
    portfolio/portfolio-view.tsx     'use client'
    skills/skills-view.tsx           'use client'
    contact/contact-view.tsx         'use client'
    contact/contact-form.tsx         'use client'
    contact/contact-map.tsx          'use client'  (dynamic, ssr:false)
  content/
    projects.json
  styles/
    globals.scss               # everything currently in index.css + App.scss
    (one .scss per component)
  types/
    project.ts
```

### 5.2 The server/client split — read this before writing any page

This is the single most common way an App Router port goes wrong.

`export const metadata` **only works in Server Components.** Every current
page component uses `useState` / `useEffect` for the letter animation, so a
naive port marks `page.tsx` as `'use client'` — at which point the metadata
export is silently ignored and all the SEO work in this phase quietly does
nothing.

**Required pattern for every route:**

```tsx
// src/app/about/page.tsx   <- SERVER component, no 'use client'
import type { Metadata } from 'next'
import AboutView from '@/components/about/about-view'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Ivan E. Villanueva, fullstack software engineer in Southern California.',
}

export default function AboutPage() {
  return <AboutView />
}
```

```tsx
// src/components/about/about-view.tsx   <- CLIENT component
'use client'
// all the useState / useEffect / animation logic lives here
```

The root layout carries the title template and shared OG defaults:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.excelsolutionsv.com'),
  title: {
    default: 'Ivan E. Villanueva | Fullstack Developer',
    template: '%s | Ivan E. Villanueva',
  },
  description: '...one honest sentence...',
  openGraph: { type: 'website', siteName: 'Ivan E. Villanueva' },
  twitter: { card: 'summary_large_image' },
}
```

### 5.3 Routing translation

| CRA (react-router) | Next.js App Router |
|---|---|
| `<BrowserRouter>` in `src/index.js` | nothing — file-system routing |
| `<Route path='/' element={<Layout/>}>` | `app/layout.tsx` |
| `<Route index element={<Home/>}/>` | `app/page.tsx` |
| `<Route path='about' .../>` | `app/about/page.tsx` |
| `<Outlet/>` in Layout | `{children}` in `layout.tsx` |
| `<Link to='/contact'>` | `<Link href='/contact'>` from `next/link` |
| `<NavLink activeclassname>` | `usePathname()` + conditional class |
| `react-helmet` `<Helmet>` | `export const metadata` |

---

## 6. Implementation order

Work top to bottom. Do **not** push until step 14 passes — see §7.1.

1. **Scaffold in place.** Add `next`, `react@19`, `react-dom@19`, and
   `typescript` + `@types/*`. Create `next.config.ts`, `tsconfig.json` (with
   the `@/*` path alias to `src/`), `next-env.d.ts`. Update `package.json`
   scripts to `next dev` / `next build` / `next start`. Remove
   `react-scripts`, `react-router-dom`, `react-helmet`, `web-vitals`,
   `@testing-library/*`. Delete `src/index.js`, `src/App.js`,
   `src/reportWebVitals.js`, `src/setupTests.js`, `public/index.html`.
   Keep `engines.node` at `>=24 <25`.

2. **Global styles.** Create `src/styles/globals.scss` from the current
   `src/index.css` plus `src/App.scss`. Two fixes while moving them:
   - The webpack-only `~` prefix must go:
     `@import '~loaders.css/src/animations/pacman.scss'` does not resolve
     under Turbopack. Import `animate.css` and the pacman stylesheet as **JS
     imports in `app/layout.tsx`** instead — that sidesteps Sass `@import`
     (deprecated in Dart Sass) entirely.
   - `$primary-color` / `$secondary-color` / `$terciary-color` in `App.scss`
     are **dead** — no component stylesheet references them. Drop them; the
     real token system arrives in Phase 3.

3. **Fonts.** Port the three `@font-face` blocks using `next/font/local`
   pointing at the existing woff2 files.
   **Bug to fix while here:** the Helvetica Neue face declares
   `format('ttf')`, which is not a valid format keyword (it should be
   `truetype`) — that font is almost certainly not loading on the live site
   today. Phase 3 replaces this whole stack anyway, so just make it correct
   and move on.

4. **Root layout.** `app/layout.tsx` renders the current `Layout` component's
   chrome — `<Sidebar/>`, the `.page` wrapper, and the decorative
   `<body>` / `</body>` / `</html>` `.tags` spans — with `{children}` where
   `<Outlet/>` was. Import `globals.scss` here.

5. **Sidebar.** `'use client'`. Replace `NavLink`'s `activeclassname` with
   `usePathname()`. Keep the `useState` mobile-nav toggle.
   **Cheap accessibility wins, zero visual change** (handoff.md §4.9 — these
   are a11y fixes, not redesign, so they belong here):
   - the hamburger and close icons are clickable `FontAwesomeIcon`s with no
     keyboard access — make them real `<button>`s
   - the icon-only nav and social links have no accessible names — add
     `aria-label`s

6. **Pages, one at a time, in this order:** Home, About, Skills, Portfolio,
   Contact. Use the §5.2 server/client split for each. After each page, run
   `next dev` and compare against the live site before moving on — this is
   what keeps "feature parity" verifiable.

7. **Images.** Convert every `<img>` to `next/image` with explicit `width` /
   `height`; the Home hero letters (`3D-Letter-I/E/V.png`) should carry
   `priority` since they are the LCP element.
   **Only 6 of the 22 files in `src/assets/images/` are actually
   referenced** — `3D-Letter-E.png`, `3D-Letter-I.png`, `3D-Letter-V.png`,
   `IvanEVillanueva.png`, `LogoExcelTrim.png`, `LogoExcelWindow.png`.
   Delete the other 16, including the four `Screenshot_*.jpg` (291 KB, 118 KB,
   84 KB, 55 KB) and the unused `LogoExcelv2_*` set. Also delete the CRA
   leftovers `public/logo192.png` and `public/logo512.png` once `manifest.ts`
   no longer points at them.
   **Accessibility:** the letter images currently use `alt='developer'`,
   which is meaningless. They are decorative letterforms inside an `<h1>`
   that already reads as text — give them `alt=""`.

8. **Map.** `react-leaflet@5`, imported dynamically and **client-only**:

   ```tsx
   const ContactMap = dynamic(() => import('./contact-map'), { ssr: false })
   ```

   Two landmines here:
   - `dynamic(..., { ssr: false })` **cannot be called from a Server
     Component.** It must live inside the client `contact-view.tsx`, not
     inside `app/contact/page.tsx`.
   - Leaflet's default marker icon resolves its PNG by relative URL and
     **breaks under bundlers** — the marker will silently not render. Either
     configure `L.Icon.Default` with explicitly imported marker assets or
     supply a custom icon.

   Import `leaflet/dist/leaflet.css` in the map component (already the
   pattern Phase 1 established).

9. **Contact form plus EmailJS route handler.**
   - **VERIFY FIRST (2 minutes):** confirm on emailjs.com that server-side
     sending via their REST API is available on the **free** tier. handoff.md
     §4.4 is explicit that no paid tools are needed for anything in this spec.
     - If free: `app/api/contact/route.ts` posts to the EmailJS REST API
       using a **private key read from an env var**, never committed. The
       client form POSTs to `/api/contact`.
     - If paid-only: fall back to the client SDK, and record the reason in
       `notes.md`. The form component is identical either way; only the
       submit handler differs by roughly 10 lines.
   - Add a **honeypot** field (visually hidden, bots fill it, server rejects).
   - Add a **submit throttle**.
   - Replace `alert()` and `window.location.reload(false)` with inline
     success/error state (handoff.md Phase 2 step 4).
   - **Fix the invalid markup while here:** the form uses `<li>` elements with
     no parent `<ul>`, and the inputs have placeholders but no `<label>`s
     (handoff.md §4.1, §4.9).

10. **Portfolio data.** `app/portfolio/page.tsx` is a Server Component that
    imports `src/content/projects.json` directly and passes it down as a prop.
    Add `src/types/project.ts`. This is the shape Phase 4 replaces with a
    Sanity GROQ query, so keep the boundary clean — the view component should
    not know where the data came from.

11. **Security headers** (handoff.md S5) in `next.config.ts` via `headers()`:
    `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
    `Referrer-Policy: strict-origin-when-cross-origin`,
    `X-Frame-Options: DENY`, a restrictive `Permissions-Policy`, and CSP in
    **report-only** mode first:

    ```
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://*.tile.openstreetmap.org;
    font-src 'self';
    connect-src 'self' https://api.emailjs.com;
    frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none';
    ```

    **Deliberate architectural choice: do not use a nonce-based CSP.** Nonces
    require per-request generation in `proxy.ts`, which forces every route to
    render dynamically — that would destroy the static generation this entire
    migration exists to gain. `'unsafe-inline'` for styles is the correct
    trade for a static marketing site. CSP moves from report-only to
    enforcing in Phase 6.

12. **SEO files.** `app/sitemap.ts`, `app/robots.ts` (pointing at the sitemap
    — the current `public/robots.txt` references none), `app/manifest.ts` (the
    current `public/manifest.json` still says "React App" / "Create React App
    Sample"), one branded `app/opengraph-image.png` at 1200x630, and per-page
    `metadata` with canonical URLs.

13. **Delete the leftovers.** `public/manifest.json`, `public/robots.txt`,
    `public/index.html`, `src/App.scss`, `src/index.css`, and the 16 unused
    images from step 7.

14. **Verify before pushing.** `next build` clean; click every route under
    `next start`; compare each page side by side against the live site;
    `npm audit` (expect the react-scripts criticals to be **gone** — that is
    the headline security win of this phase); Lighthouse mobile on Home.

---

## 7. Risks and landmines

### 7.1 Deploy safety — important

Svei asked to stop using branches, so this work happens on `main`. But
**Vercel auto-deploys every push to `main`**, and a half-migrated repo is a
broken site. A framework swap is not a change that can be pushed
incrementally.

**Therefore: do the entire migration locally, commit freely, and do not
`git push` until step 14 passes.** Local commits are safe; the push is the
deploy. This gets branch-like safety with no branches.

If the deployed site does break, the recovery is `git revert` plus a push,
not a force-push.

### 7.2 Other known traps

- `dynamic(..., { ssr: false })` called from a Server Component — see step 8.
- `export const metadata` in a `'use client'` file is silently ignored — §5.2.
- Leaflet default marker icons break under bundlers — step 8.
- `~` prefixed Sass imports do not resolve under Turbopack — step 2.
- `react-leaflet@4` will not install against React 19 — must be v5.
- Next 16 renamed `middleware.ts` to `proxy.ts`. **This project needs
  neither** — headers go in `next.config.ts`. Do not add one.
- Next 16 made `params` / `searchParams` / `cookies()` / `headers()` async.
  This project has no dynamic routes, so it should not come up; if it does,
  `await` them.
- `body { overflow: hidden }` with its `max-width: 1200px` escape hatch is
  load-bearing for the current full-viewport layout. Preserve it verbatim.

---

## 8. Exit criteria

Adapted from handoff.md Phase 2, with the audit line corrected:

- Feature parity live on Vercel from `main` — every route renders the same as
  it does today.
- `next build` produces **statically generated** routes (confirm in the build
  output; if a route is dynamic, find out why — usually an accidental
  `'use client'` too high up).
- Lighthouse mobile on Home: **>=85 performance, >=95 SEO**.
- `npm audit`: **zero critical, zero high.** All five criticals present at the
  end of Phase 1 came from the `react-scripts` build toolchain and should
  disappear with it. If any remain, list them in `notes.md` with their source.
- Every handoff.md §3 item resolved except S4 (already handled in Phase 1).
- No visual regressions — checked page by page against the current live site.

---

## 9. Actions only Svei can take

1. **Vercel → Settings → Build and Development → Node.js Version → 24.x.**
   Still outstanding from Phase 1; the last build failed on this.
2. **Vercel → Settings → Framework Preset → Next.js.** It is currently
   detected as Create React App. Also clear any Output Directory override —
   CRA wrote to `build/`, Next writes to `.next/`.
3. **EmailJS dashboard → domain allowlist** (handoff.md S6). This is the
   actual fix for quota abuse, independent of client vs server sending.
4. **If the route handler path is taken:** add the EmailJS private key as a
   Vercel environment variable. Never commit it — see finding S1 for why this
   warning exists.
