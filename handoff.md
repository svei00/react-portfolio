# handoff.md — Portfolio Rebuild Spec (portfolio.excelsolutionsv.com)

> **This is an architecture/audit document. Implementation happens in a separate
> Sonnet 5 or Opus 4.8 session using this file as the spec.**
> Produced by the Fable audit session on 2026-08-16. No code was changed in that
> session; everything below was verified directly from the repo at
> `D:\repos\react-portfolio` unless explicitly marked VERIFY.

---

## 1. Verified current architecture (not assumed — read from the repo)

- **Stack:** Create React App (`react-scripts` 5.0.1), React 18.2, `react-router-dom` 6.3,
  Sass (dart-sass via `sass`), `react-helmet` for meta tags. No TypeScript. No tests beyond
  the default CRA `App.test.js` (which no longer matches the app and would fail).
- **Routing:** `BrowserRouter` in `src/index.js`; routes in `src/App.js`:
  `/` (Home), `/about`, `/portfolio`, `/skills`, `/contact`, `/dashboard`, `/rating`.
- **Pages live in `src/components/<Name>/index.js` + `index.scss`.** No state management
  library (none needed at this size).
- **Firebase (v9.10, WEB SDK):** `src/firebase.js` initializes app + Auth + Firestore + Storage.
  - `/portfolio` page fetches its project list from Firestore collection `portfolio` at runtime.
  - `/dashboard` is a hidden admin panel: Google sign-in popup, then a form that uploads an
    image to Storage and writes a doc to Firestore. **The only gate is "any Google account is
    signed in" — there is no email/UID allowlist in client code.** Real protection depends
    entirely on Firestore/Storage security rules, which are not in the repo (VERIFY in the
    Firebase console — project `portfolio-dashboard-c2761`).
- **Animations:** ALL animation is CSS (`animate.css` + hand-written SCSS keyframes +
  `AnimatedLetters` per-letter span component). `gsap-trial` is installed but **100% unused** —
  every GSAP call in `src/components/Home/Logo/index.js` is commented out (Svei disabled it
  intentionally over licensing fear).
- **Contact form:** EmailJS from the browser (`@emailjs/browser`), service `svei00`,
  template `template_f2vnjd2`, public key hardcoded in `src/components/Contact/index.js`.
  `public/index.html` ALSO loads EmailJS a second time from jsdelivr CDN with an
  `emailjs.init("{6ReGD36Xmth9bgAU017GS}")` call whose key includes literal braces
  (looks broken/placeholder).
- **Map:** `react-leaflet` 4 + Leaflet 1.9.3 from npm, but the Leaflet **CSS is loaded from
  unpkg CDN at version 1.7.1** in `public/index.html` (version mismatch).
- **Deploy:** Vercel, building via `react-scripts build` (there is **no `vercel.json`**, no
  `engines` field in `package.json`, so the Node version lives only in the Vercel dashboard —
  VERIFY there; Vercel warned Node 20 is being deprecated).
- **Dead Netlify/Webpack pipeline (confirmed dead):** `webpack.config.js`, root `index.js`
  (its SCSS imports have trailing spaces in the paths, so it never built cleanly),
  `public/_redirects` (Netlify-only), the `build-webpack` script, and 10 webpack-related
  devDependencies. None of this is used by the Vercel build.
- **Repo is PUBLIC:** `origin = https://github.com/svei00/react-portfolio.git`.
- **Other dead weight:** `src/data/portfolio.json` (superseded by Firestore fetch),
  `src/Notes.txt` and root `notes.txt` (superseded by `notes.md`), `src/logo.svg`,
  `public/react-logo*.png`, `public/react.ico` (CRA leftovers),
  `src/components/Projects/Practices/*` (tutorial loop exercises) and the `/rating` route
  (a star-rating exercise) shipped in production.
- **README.md:** untouched CRA boilerplate, and it ends with `# carolina-portfolio`
  repeated twice — scaffolding garbage from wherever the repo was cloned/renamed.

---

## 2. Decisions already made by Svei (do not re-litigate)

1. **Brand:** the portfolio becomes Iván "Svei" Villanueva's **separate personal identity**.
   Excel SolutionsV appears only as a project he built. New palette direction: **navy + gold +
   silver** (Svei's seeds: `#1F3A5C` navy, `#B38E5D` gold, `#B9C0C9` silver, `#F1EBDF` cream
   text) — refined token system in §8. The old ExcelSolutionsV blue/green (`#3182DF`,
   `#21B868`) must NOT drive the new design.
2. **Design ambition:** evolve toward **Awwwards-style immersive** — real motion design, not
   template defaults. Svei confirmed he disabled GSAP only out of copyright fear; GSAP is now
   100% free (see §6), so GSAP-driven sequences are back on the table.
3. **Content/CMS:** drop Firebase entirely. Static content is acceptable short-term, but a
   **real CMS is a requirement** of the target architecture → **Sanity** (see §9).
4. **Excel section:** small and curated (2–3 strong pieces max), **visual-first with selective
   links; live files are acceptable** where they strengthen the story (see §10).
5. **Stack:** migrate CRA → **Next.js (App Router) on Vercel** (see §5 for why).

---

## 3. SECURITY FINDINGS (own section — read first)

| # | Severity | Finding | Required action |
|---|----------|---------|-----------------|
| S1 | **Critical** | `.npmrc` commits a GreenSock registry auth token (`//npm.greensock.com/:_authToken=…`) to a **public** GitHub repo. It is also in git history. | Delete the token line from `.npmrc` (keep nothing but comments or delete the file). The Club GreenSock program no longer exists, so the token has little live value, but treat it as leaked: if a GreenSock account still exists, revoke tokens there. Decide with Svei whether to purge git history (`git filter-repo`) or accept the historical leak as low-risk; at minimum it must not be in the working tree. |
| S2 | **Critical** | `/dashboard` admin panel: any Google account that signs in reaches the upload form. Firestore/Storage rules are unverified. If rules allow writes for any authenticated user, **anyone can inject portfolio entries (name/description/URL/image) that render on the public site** — a stored-content injection/defacement vector. | Per Svei's decision, remove the dashboard and Firebase entirely (Phase 1). **Immediate mitigation, before any code ships:** in the Firebase console for `portfolio-dashboard-c2761`, set Firestore and Storage rules to deny all client writes. After migration, disable/delete the Firebase project. |
| S3 | **Critical** | `npm audit` (run 2026-08-16 against the declared ranges; exact lockfile counts may differ slightly): **36 vulnerabilities — 1 critical, 19 high, 7 moderate, 9 low.** Critical: `protobufjs` via the old `firebase` 9.10 SDK. High: `firebase` (direct), `react-scripts` (direct, mostly build-time transitive: nth-check, webpack-dev-server, etc.). Moderate: `react-router-dom` 6.3, `css-minimizer-webpack-plugin`. | Structurally resolved by removing Firebase (Phase 1) and migrating off CRA (Phase 2). Do not chase `npm audit fix --force` on CRA — it downgrades `react-scripts` to 0.0.0. Re-run audit at the end of each phase; exit criteria reference it. |
| S4 | **High (privacy/safety)** | Contact page renders Svei's street-level home address ("San Bernardino, CA. 92405"), an exact-coordinate map marker at `[34.13950, -117.30796]`, and a popup literally saying "Iván lives here!!". | Replace with a city-level map (or remove the map) and a city-only address line. Svei has been told this is the recommendation; implement unless he overrides in writing. |
| S5 | **High** | No security headers at all (no `vercel.json`, no framework headers): missing CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`/`X-Frame-Options`, `Permissions-Policy`. | Phase 2: configure via `headers()` in `next.config` (or `vercel.json`). Start CSP in report-only, then enforce. Keep the allowlist tiny: self + Sanity CDN (`cdn.sanity.io`) + EmailJS API + OpenStreetMap tiles if the map survives. |
| S6 | **Medium** | Contact form: EmailJS public key in client (normal for EmailJS) but **no abuse protection** — no origin restriction confirmed, no honeypot, no rate limit. Bots can drain the EmailJS quota / spam Svei. | Phase 2: enable EmailJS domain allowlist in the EmailJS dashboard (VERIFY), add a honeypot field + minimal client throttle. Optionally move sending behind a Next.js route handler to hide template/service IDs. No CAPTCHA unless abuse actually appears. |
| S7 | **Medium** | EmailJS is loaded twice (npm package AND a CDN `<script>` in `public/index.html` with a malformed-looking init key). The CDN script has no SRI hash — an avoidable supply-chain surface. | Remove the CDN script + inline init entirely; keep only the npm package. |
| S8 | **Low** | Leaflet CSS pulled from unpkg CDN at 1.7.1 while npm Leaflet is 1.9.3 (mismatch + external CDN dependency). | Import `leaflet/dist/leaflet.css` from the npm package. |
| S9 | **Low** | External links use `target='_blnak'` (typo → opens a named window, not a new tab). `rel='noreferrer'` is present, so no opener leak, but fix the typo. | Fix during Phase 1 typo sweep. |
| S10 | **Info** | Firebase web config (apiKey etc.) in client code — this is normal for Firebase and not a secret by itself. Moot once Firebase is removed. | None beyond S2. |

---

## 4. Full audit findings by category

Severity legend: **[C]** critical · **[I]** important · **[N]** nice-to-have.

### 4.1 Architecture
- **[C]** CRA / `react-scripts` is effectively unmaintained upstream (no releases since 2022,
  officially sunset as a recommendation by the React team). Staying on it means permanently
  unpatched transitive vulns (S3) and no modern features. This is the root driver of the
  Phase 2 migration.
- **[C]** Dead Netlify/Webpack pipeline (see §1) — delete `webpack.config.js`, root
  `index.js`, `public/_redirects`, the `build-webpack` script, and devDeps: `webpack`,
  `webpack-cli`, `html-webpack-plugin`, `clean-webpack-plugin`, `mini-css-extract-plugin`,
  `css-minimizer-webpack-plugin`, `terser-webpack-plugin`, `css-loader`, `html-loader`.
- **[I]** Unused/dead code: `gsap-trial` (unused — §6), `src/data/portfolio.json`,
  `src/Notes.txt`, root `notes.txt`, `src/logo.svg`, `public/react-logo*.png`,
  `public/react.ico`, `src/components/Projects/Practices/*`, `/rating` route + component,
  default `App.test.js`.
- **[I]** No code splitting: every route (including Firebase + Leaflet) ships in one bundle.
  Next.js route-based splitting fixes this for free; Leaflet should additionally be a
  dynamic import used only by the Contact page.
- **[N]** `Home/Logo/index.js`: `solidLogoRef` is assigned to two different `<img>` elements —
  the second assignment silently overwrites the first (latent bug if animation returns).
- **[N]** Several components call `clearTimeout()` with **no timer id** in the `useEffect`
  cleanup (Home, About, Contact, Skills) — a no-op; the timers are never actually cleared.
  Only Portfolio does it correctly.
- **[N]** Contact form uses `<li>` elements with no parent `<ul>` — invalid HTML.

### 4.2 Stack currency
- **[C]** React 18.2 (current major is 19), react-router 6.3 (moderate advisory, current is 7),
  firebase 9.10 (current is 11+, and being removed anyway), `react-helmet` (unmaintained —
  replaced by the Next.js Metadata API in Phase 2), testing-library versions are 2022-era.
  The migration resolves all of these at once; do not upgrade piecemeal on CRA first.

### 4.3 Node.js / Vercel migration — concrete plan
Current state: no `engines` in `package.json`; Node version is whatever the Vercel dashboard
says (VERIFY — likely 20.x, which Vercel is deprecating). Target: **Node 24 (LTS)**.

Phase 1 steps (on the current CRA site, so the site stays deployable during the rebuild):
1. In Vercel → Project → Settings → Build & Development → **Node.js Version → 24.x**.
2. Add to `package.json`: `"engines": { "node": ">=24 <25" }`.
3. Locally: install Node 24 (nvm-windows), `npm ci`/`npm i`, `npm run build`, confirm the
   build passes. Expectation: `react-scripts` 5 + dart-sass are Node-22-clean (the old
   OpenSSL flag was a react-scripts 4 problem). If anything breaks, it will be a transitive
   webpack plugin — record it in notes.md and solve, don't pin back to 20.
4. Redeploy from main and smoke-test the live site.

Phase 2 makes this permanent: Next.js 15 requires Node ≥18.18 and is fully happy on 22.
Nothing in the retained dependency set (EmailJS, Leaflet, GSAP, Sanity client) is
Node-version-sensitive at runtime (all client/edge-safe).

### 4.4 Animation library (finding + recommendation)
- **Finding:** `gsap-trial@3.11.1` is declared but unused — all GSAP code is commented out in
  `Home/Logo/index.js` (a DrawSVG logo-outline animation). The `.npmrc` GreenSock token (S1)
  exists only to install that package. Current animations: `animate.css` classes, custom SCSS
  keyframes, the `AnimatedLetters` stagger, a CSS `cubespinner`, a Pacman loader on every
  page, and a randomly blinking tag cloud.
- **License status (verified against GSAP's public announcements as of the audit date):**
  since April 2024 (Webflow acquisition) **GSAP and ALL its plugins — including SplitText,
  DrawSVG, MorphSVG, ScrollTrigger — are free for all use, commercial included.** The
  `gsap-trial` package and Club GreenSock tier are legacy. Implementer: re-verify at
  gsap.com/pricing before shipping, per standing instruction, but this is settled publicly.
- **Recommendation:**
  1. Phase 1: **remove `gsap-trial` and the `.npmrc` token** (nothing breaks — it's unused).
  2. Phase 3: **add the standard `gsap` package** and build the real motion system with it
     (ScrollTrigger + SplitText are now free — SplitText replaces the hand-rolled
     `AnimatedLetters`). Optionally pair with **Lenis** (MIT, free) for smooth scrolling.
  3. **Critique of current animations:** they are the tutorial's defaults — per-letter
     rubberBand hover, spinning cube, Pacman loader — instantly recognizable as the
    "CRA portfolio tutorial" look and part of why the site reads templated. Replace, don't
    polish. Specific replacements in §8.3.
  4. No paid tools are needed for anything in this spec. If a desired effect ever appears to
     require a paid asset, replicate it with GSAP/CSS instead and log it as a Phase 3+ task.

### 4.5 Performance
- **[C]** Client-side-rendered SPA: blank HTML shell until JS loads → poor LCP, poor SEO
  (fixed structurally by Next.js SSG).
- **[C]** Single bundle contains Firebase (heavy) + Leaflet + all routes (see 4.1).
- **[I]** Images unoptimized: multi-hundred-KB PNG logos (up to 1850px wide), JPG screenshots,
  no responsive sizes, no modern formats. Phase 2: `next/image` everywhere; re-export source
  art at sane sizes.
- **[I]** Fonts: `helvetica-neu.ttf` (uncompressed TTF) + woff/woff2 customs, no
  `font-display: swap`, no preload. Phase 3 replaces the font stack anyway (§8.2) — use
  `next/font` with woff2 only.
- **[N]** Render-blocking CDN stylesheet (Leaflet 1.7.1) and duplicate EmailJS script (S7/S8).

### 4.6 Design / visual identity (why it reads templated — specifics)
- **[C]** The layout is a widely-cloned YouTube tutorial's layout (notes.md references
  confirm the source videos): left icon sidebar, `<body>`-tag decorations, per-letter
  animated headings, rotating CSS cube, Pacman loader, tag-cloud skills. Recruiters and
  developers have seen this exact site hundreds of times — THIS is the "made by AI /
  template" smell, more than any individual color.
- **[C]** Copy is riddled with typos/errors that destroy the "senior engineer" story:
  "United Stetes", "Skills & Experiencie", "experiencie", "knoledge", "technologie",
  "enviroment", "Fron-end", "Taildwind", "I can explode all my qualifications" (should be
  something like "apply my skills fully"), meta attribute `name='descriprion'` (twice — so
  those pages ship NO description at all), `target='_blnak'` (4×). Full sweep in Phase 1;
  Phase 3 rewrites the copy entirely.
- **[I]** Keyword-stuffed meta description (the same city list pasted twice in one tag) reads
  as spam to both Google and humans (§4.8).
- **[I]** No type scale, no spacing system; three unrelated font families (Coolvetica,
  Helvetica Neue TTF, La Belle Aurore) straight from the tutorial.
- **[N]** Mixed logo identities (ExcelSolutionsV logos everywhere) — resolved by the brand
  decision (§2.1).

### 4.7 Content structure
- Current sections: Home / About / Portfolio / Skills / Contact (+hidden Dashboard, Rating).
- **[I]** The "software engineer who also builds better Excel tools than accountants" story is
  told nowhere — Skills mentions "Microsoft Excel" only as the biggest word in a tag cloud.
  Target information architecture (Phase 3): **Home (hook + selected work) → Work (web dev
  projects, from CMS) → Excel Lab (2–3 curated pieces, §10) → About (short, human, typo-free)
  → Contact.** Web dev remains the lead narrative; Excel Lab is one section, not the theme.
- **[N]** About copy is generic job-seeker filler; rewrite with one concrete personal hook
  (bilingual EN/ES, accountant-tooling niche, family, California) and zero clichés.

### 4.8 SEO / metadata
- **[C]** CSR-only + `react-helmet`: crawlers that don't execute JS get an empty shell;
  helmet tags are applied client-side. Next.js SSG + Metadata API is the fix (this is the
  main SEO argument for the migration).
- **[I]** No `sitemap.xml`; `robots.txt` is fine but references no sitemap.
- **[I]** No `og:image`, no `og:url`, no canonical; Twitter card is `summary` with no image.
  Phase 2: one branded OG image (1200×630) minimum; per-page metadata.
- **[I]** Keyword-stuffed description (see 4.6) — rewrite as one honest sentence per page.
- **[N]** `http://` (not https) links to excelsolutionsv.com in the Firestore/JSON data.

### 4.9 Accessibility
- **[C]** Per-letter animated headings: screen readers announce them letter-by-letter
  ("C", "o", "n"…). Any letter-stagger implementation must put the real text in an
  `aria-label` on the heading and `aria-hidden="true"` on the letter spans (GSAP SplitText
  has an `aria` option that handles this).
- **[I]** Icon-only nav links and social links have **no accessible names** — add
  `aria-label`s; hamburger/close icons are clickable FontAwesome icons, not buttons
  (no keyboard access) — must become `<button>`s.
- **[I]** Form fields have placeholders but no `<label>`s.
- **[I]** Blinking tag cloud + constant looping animations with **no
  `prefers-reduced-motion` handling** — every Phase 3 animation must respect it (single
  global GSAP `matchMedia` gate).
- **[N]** Meaningless alt text (`alt='developer'` on letter images); decorative images should
  have `alt=""`. Invalid `<li>`-without-list markup (4.1).
- **[N]** Contrast audit of the final palette is a Phase 3 exit criterion (§8.1 tokens are
  pre-checked for the main text/background pairs).

### 4.10 Mobile / responsive
- A hamburger nav exists and basic breakpoints are present in SCSS. Not exhaustively audited
  this session. **[I]** Phase 3 must design mobile-first and Phase 6 must verify: map and
  cube layouts at ≤375px, tap-target sizes, no horizontal scroll. (The current cube/tag-cloud
  disappear-or-cram behavior on small screens is exactly the kind of tutorial artifact the
  redesign replaces.)

### 4.11 README.md
- **[C]** It is 100% CRA boilerplate + `# carolina-portfolio` ×2 at the bottom (embarrassing;
  suggests cloned scaffolding — the git history's duplicated "first commit"s match).
- **Rewrite spec (Phase 1, small; Phase 2 updates it again after migration):**
  1. Title: `Iván "Svei" Villanueva — Portfolio`, one-line description, **live link**
     (https://portfolio.excelsolutionsv.com — update if the domain changes with the rebrand).
  2. Tech stack list (truthful for the current phase; updated each phase).
  3. Local dev: prerequisites (Node 24), install, run, build commands — matching reality,
     not CRA boilerplate.
  4. Deploy note: "Deploys to Vercel from `main`. Branch-per-phase workflow (see §11)."
  5. Pointer: "`notes.md` is the chronological build log; `handoff.md` is the rebuild spec."
  6. Delete ALL CRA boilerplate and the carolina lines.

---

## 5. Target architecture (the rebuild)

**Next.js 15+ (App Router) · TypeScript optional-but-recommended · SCSS Modules ·
GSAP (free) + Lenis · Sanity CMS · EmailJS (kept) · react-leaflet only if the map survives ·
Vercel, Node 24.**

Why Next.js over Vite/Astro here: SSG fixes the SEO/LCP problems (4.5, 4.8) natively on the
existing Vercel account; route-level code splitting, `next/image`, `next/font`, Metadata API,
and `headers()` directly close audit findings; Sanity's Next integration is first-class; and
the Awwwards-style page-transition work has mature patterns in Next. Astro would be lighter
but is a worse fit for the heavily interactive/animated direction chosen; staying on CRA is
ruled out (4.1). Styling stays SCSS (Svei's existing skill) as **SCSS Modules** per component
+ a global tokens file; do not introduce Tailwind in this rebuild unless Svei asks.

Structure sketch (folders lowercase kebab-case, per code style rules):

```
src/
  app/            # routes: page.tsx per section, layout.tsx, metadata
  components/     # small single-purpose components, one folder each
  lib/            # sanity client, email sending, gsap setup
  styles/         # tokens.scss (palette/type/spacing), globals
  content/        # (interim Phase 1-3) static JSON for projects
```

---

## 6. (merged into §4.4 — animation finding and recommendation live there)

## 7. Phased roadmap

> Phase 0 = the Fable audit session that produced this document (DONE).
> Phases 1+ are implementation work for Sonnet 5 (routine) or Opus 4.8 (Phase 2 and
> Phase 3 involve architectural judgment — prefer Opus for those two).
> Git workflow for every phase: **one branch per phase, test locally before merging to
> main, deploy to Vercel only from main.** Append every setup step / dependency change /
> config change to `notes.md` (numbered log style, never overwrite).
> **Commit messages:** Svei's rules — no double quotes, no single quotes, no apostrophes,
> ≤ ~10 words, plain text, given as a full copy-paste command. NOTE (flagged, not silently
> changed): an unquoted multi-word `-m` argument breaks in every shell, so the ready-to-paste
> commands below join words with hyphens to satisfy both the shell and the no-quotes rule.

### Phase 1 — Security triage + dead-weight removal (current CRA site stays live)
Branch: `phase-1-security-cleanup`
1. Firebase console: set Firestore + Storage rules to deny all client writes (S2 interim).
2. Remove `.npmrc` token (S1); decide history purge vs accept (document in notes.md).
3. Remove Firebase from the app: delete `firebase.js`, Dashboard, Login; Portfolio reads a
   local `src/content/projects.json` (seed it with the current two real entries, https URLs).
   Uninstall `firebase`.
4. Uninstall `gsap-trial`. Delete dead files/deps: webpack pipeline (4.1), `_redirects`,
   `/rating` route + component, `Projects/Practices`, `src/Notes.txt`, root `notes.txt`,
   CRA leftovers, `App.test.js`, `portfolio.json` (replaced by `content/projects.json`).
5. Contact page: city-level map + city-only address (S4); remove CDN EmailJS + Leaflet CSS
   from `index.html`, import Leaflet CSS from npm (S7, S8).
6. Typo sweep (every string in 4.6 including `_blnak` and both `descriprion`s); rewrite the
   two meta descriptions as single honest sentences (no city spam).
7. Node 24: Vercel dashboard setting + `engines` field + local build verification (§4.3).
8. README quick rewrite per §4.11.
**Exit criteria:** site deployed from main on Node 24 with zero Firebase code; `npm audit`
shows no critical advisories (remaining highs must all be `react-scripts` transitives,
documented in notes.md); no secrets in working tree; all listed typos gone.
Commit: `git commit -m phase-1-security-cleanup-node-24-dead-code-removal`

### Phase 2 — Migration to Next.js (feature parity, no redesign yet)

> **See `phase-2-plan.md` at repo root — it supersedes this section.** An Opus
> session on 2026-08-17 planned this phase in detail against the actual repo
> and the current npm registry. Three things below are now out of date:
> Next.js is 16, not 15; SCSS Modules are deferred to Phase 3 (reason in that
> file's §4.1); and the branch workflow no longer applies — Svei moved to
> working directly on `main`.

Branch: ~~`phase-2-nextjs-migration`~~ (superseded — work on `main`, push only
once the migration builds and passes a parity check)
1. Scaffold Next.js 15 App Router in-place (new `src/app`), port pages 1:1 with current
   visuals; SCSS Modules; delete react-helmet (Metadata API per route).
2. `next/image` for all images (re-export oversized PNGs), `next/font` for the (interim)
   fonts, dynamic import for the Leaflet map (client-only).
3. Security headers via `headers()` in next.config: HSTS, X-Content-Type-Options,
   Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, frame-ancestors
   none; CSP report-only first (S5).
4. EmailJS hardening (S6): domain allowlist in EmailJS dashboard, honeypot field, submit
   throttle; replace `alert()`/`window.location.reload()` with inline success/error state.
5. `sitemap.xml` + robots + canonical + og:image (one branded 1200×630) + per-page metadata.
6. Remove `animate.css`/`loaders.css`/`react-loaders` if no longer referenced after port.
**Exit criteria:** feature parity live on Vercel from main; Lighthouse (mobile) ≥85 perf /
≥95 SEO on Home; `npm audit` zero critical+high; all §3 items resolved except S4-if-overridden.
Commit: `git commit -m phase-2-nextjs-migration-headers-seo-parity`

### Phase 3 — Personal brand + immersive redesign
Branch: `phase-3-redesign`
Scope: §8 in full (palette tokens, typography, layout, motion system with GSAP+Lenis,
copy rewrite, accessibility patterns 4.9, mobile-first). Excel Lab section gets a designed
placeholder ("coming soon" tile) — content lands in Phase 5.
**Exit criteria:** new identity live; zero tutorial-recognizable elements remain (no sidebar
clone, no cube, no Pacman, no tag cloud); `prefers-reduced-motion` verified; axe DevTools
clean on all pages; copy proofread (zero typos, EN reviewed by Svei).
Commit: `git commit -m phase-3-personal-brand-redesign-gsap-motion`

### Phase 4 — Sanity CMS
Branch: `phase-4-sanity-cms`
Scope: §9. Projects + Excel pieces move from JSON to Sanity; ISR/webhook revalidation.
**Exit criteria:** Svei can add/edit a project in Sanity Studio and see it live without
touching code; build passes with zero content in the dataset (empty-state handled);
content JSON files deleted.
Commit: `git commit -m phase-4-sanity-cms-projects-and-excel-content`

### Phase 5 — Excel Lab section
Branch: `phase-5-excel-lab`
Scope: §10. 2–3 curated case studies, authored in Sanity, designed to the Phase 3 system.
**Exit criteria:** section live with real content Svei approved; each piece has image(s) +
outcome line; links/downloads only where Svei explicitly approved each one.
Commit: `git commit -m phase-5-excel-lab-curated-case-studies`

### Phase 6 — Performance, accessibility, SEO hardening
Branch: `phase-6-hardening`
Scope: enforce CSP (from report-only), image/font final pass, Lighthouse mobile ≥90 perf /
≥95 a11y / ≥95 SEO on all routes, full keyboard-nav test, contrast verification, Search
Console submission of sitemap, optional Vercel Analytics (privacy-friendly, no cookie
banner needed — do NOT add Google Analytics).
**Exit criteria:** the scores above, screenshotted into notes.md; CSP enforcing with no
console violations.
Commit: `git commit -m phase-6-performance-accessibility-seo-hardening`

---

## 8. Design system direction (for Phase 3)

### 8.1 Palette (refined from Svei's seeds — semantic tokens)
| Token | Hex | Use |
|---|---|---|
| `--bg` | `#131F30` | page background (navy-950, darkened from seed for depth) |
| `--surface` | `#1F3A5C` | cards/sections (Svei's navy seed) |
| `--accent` | `#B38E5D` | gold — CTAs, highlights, motion accents |
| `--accent-soft` | `#C9A87A` | gold hover/large-area tint |
| `--muted` | `#B9C0C9` | silver — secondary text, rules, icons |
| `--text` | `#F1EBDF` | cream — primary text |
Contrast pre-check: `#F1EBDF` on `#131F30` ≈ 13:1 (AAA); `#B9C0C9` on `#131F30` ≈ 8:1 (AA+);
`#B38E5D` on `#131F30` ≈ 4.9:1 — fine for large text/accents, don't use gold for body copy.
Implementer: re-verify final pairs with a contrast checker (Phase 6 exit criterion).

### 8.2 Typography
Replace all three current fonts. Direction: one distinctive display serif or high-contrast
grotesk for headlines + one clean grotesk for body (e.g., a pairing like Fraunces/Zodiak-style
display + Inter/General Sans-style body — final pick is a Phase 3 decision WITH Svei, from
free sources only: Google Fonts or Fontshare). Load via `next/font`, woff2, `display: swap`.
Type scale: fluid clamp() scale, ~6 steps; spacing on a 4px base grid. Define both in
`styles/tokens.scss`.

### 8.3 Motion system (GSAP + Lenis, all free)
Principles: motion communicates hierarchy, never decorates; everything gated behind one
`gsap.matchMedia()` reduced-motion check; 60fps or it ships without the effect.
- **Hero:** SplitText name reveal (masked line/char stagger, custom ease) — replaces
  `AnimatedLetters`; accessible via SplitText's aria handling.
- **Scroll:** ScrollTrigger section reveals (clip-path/opacity/y), one signature pinned
  sequence maximum (e.g., the Excel Lab intro), subtle parallax on imagery.
- **Micro-interactions:** magnetic CTA buttons, link underline draw-ins, cursor-aware card
  tilt (small), nav open/close choreography.
- **Page transitions:** brief covering wipe in brand navy w/ gold accent (App Router
  transition pattern or View Transitions API where supported).
- **Retire:** Pacman loader, cube, tag cloud, rubberBand hovers, blinking anything.

### 8.4 Reference portfolios for Svei to react to (pick what resonates, availability may vary)
1. dennissnellenberg.com — Awwwards-winning; calm luxury, buttery page transitions, magnetic
   buttons. **Closest overall match to the navy/gold ambition.**
2. p5aholic.me (Keita Yamada) — minimal structure, distinctive restrained motion.
3. brittanychiang.com — the gold standard for recruiter-clarity content structure (borrow
   the IA discipline, not the visuals).
4. cuberto.com — agency-grade cursor/micro-interaction language.
5. lusion.co — upper bound of immersive WebGL (calibration point; likely beyond scope).
6. bruno-simon.com — famous 3D playground (shows where "immersive" becomes gimmick; useful
   to define the line Svei doesn't want to cross).
Recommended calibration: **1's polish + 3's clarity + 2's restraint**, with 4's
micro-interactions sprinkled on CTAs.

---

## 9. CMS architecture (Sanity — Phase 4)

- Free tier is sufficient (personal project, 2 users, generous API limits). Studio mounted
  in-repo at `/studio` route (`next-sanity`), so no separate hosting.
- **Schemas (keep to exactly these two document types + settings):**
  - `project`: title, slug, summary (short), description (Portable Text), coverImage
    (with alt), gallery[], techStack[] (string list), liveUrl?, repoUrl?, featured (bool),
    orderRank.
  - `excelPiece`: title, slug, problem (short text — the accountant pain), solution
    (Portable Text), outcome (one metric line, e.g. hours saved), images[] (with alt),
    techniques[] (e.g. Power Query, VBA, dynamic arrays), fileUrl? (hosted workbook or repo
    link — only filled where Svei approved exposure), featured (bool).
  - `siteSettings` singleton: hero copy, about copy, social links, SEO defaults, og image.
- Data fetching: GROQ via `next-sanity` in server components; static generation with
  tag-based revalidation triggered by a Sanity webhook → `revalidateTag` route handler
  (secret-protected). No client-side Sanity fetches.
- Images through Sanity's CDN + `next/image` loader; alt text is a **required** field on
  every image (enforce in schema validation) — this backs the accessibility findings.
- Implementation session should load the `sanity-best-practices` skill if available; where
  this document and that skill conflict on Sanity specifics, the skill wins.
- Env vars via Vercel project settings (`SANITY_PROJECT_ID`, dataset, API version, webhook
  secret). Never commit tokens (see finding S1 for why this is written down).

---

## 10. Excel Lab section (decision + content)

- **Decision (Svei's, with the architect's agreement):** small and curated — 2–3 pieces max,
  presented **visual-first with selective links; live files/downloads are allowed** where
  they strengthen credibility. The audit found no reason to go bigger; the "less you show,
  the more you keep" constraint stands. If a future phase wants a gallery, that's a new
  decision for Svei, not a silent expansion.
- **Format per piece (case study, not screenshot dump):** Problem (the accountant's pain,
  one paragraph) → Solution (what he engineered: Power Query, data model, VBA architecture,
  dynamic arrays) → Outcome (one hard metric: hours saved, error rate, files processed) →
  1–3 polished visuals (staged data only — **no real client data, RFCs, names, or
  fiscal figures in any screenshot**) → optional link/file (per-piece approval by Svei).
- **Content selection:** Svei picks the 2–3 pieces during Phase 5 (candidates exist in his
  accounting-automation work; choosing them is a content conversation, not a code task).
  The section's framing line: a software engineer applying real engineering practice
  (versioning, testing, modular design) to spreadsheets — proving the "better Excel tools
  than a typical power-user accountant" claim by construction, not assertion.
- Position in IA: one section among Work/About/Contact — it must never outweigh the web-dev
  narrative (see 4.7).

---

## 11. Code style rules (verbatim, apply to ALL implementation phases)

* Small, single-purpose functions.
* "Classroom teacher" style explanatory comments — code must be debuggable in a fresh AI session with zero prior context.
* Natural-language, descriptive names.
* No clever-but-cryptic patterns.
* Small files, modular architecture, single responsibility principle.
* Folders: lowercase kebab-case. No spaces, accents, or special characters in filenames.

## 12. Standing process rules

- **Git:** one branch per phase → test locally → merge to main → Vercel deploys from main
  only. End every phase by giving Svei the ready-to-paste commit command (rules in §7 note).
- **notes.md:** append every new setup step, dependency add/remove, and config change as
  numbered log entries continuing the original log. Never overwrite or renumber history.
  `handoff.md` (this file) is the spec; `notes.md` is the permanent build record.
- **VERIFY items open at handoff time:** (a) actual Node version currently set in the Vercel
  dashboard; (b) Firestore/Storage rules state before S2 mitigation; (c) EmailJS dashboard
  domain-allowlist capability; (d) GSAP terms re-check at implementation time; (e) exact
  `npm audit` counts against the real lockfile after Phase 1's dependency removals.
- **Reminder for Svei (once, after this session):** add this project to
  `registro-proyectos.md` — name: react-portfolio (personal portfolio), stack: CRA→Next.js
  migration per this handoff, repo: `D:\repos\react-portfolio` (GitHub svei00/react-portfolio,
  public), relationship to other registry projects: none.
