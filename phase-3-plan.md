# phase-3-plan.md — Personal brand + immersive redesign

> Planning session: 2026-08-21 (Opus). Supersedes handoff.md §7 "Phase 3" and
> §8 where the two disagree — §8 was written before the repo was on Next.js 16
> and before Svei picked his reference portfolios. Everything not contradicted
> here still stands.
>
> **This file is the plan. `notes.md` remains the append-only build record.**
> Implementation sessions (Sonnet) should read this file, then the relevant
> sub-phase section, then start.

---

## 1. What Svei decided (do not re-litigate)

Answers given during this planning session:

1. **Reference calibration.** Ranked, in his words:
   - **dennissnellenberg.com — first.** "Covers the most." Caveat: **he does
     not like the big icons.** Take the pacing, restraint and work-page rhythm;
     do not take the oversized iconography.
   - **lusion.co — second.** Specifically loved: the playful hero type
     animation ("bold ideas, bring life"), the featured-work reveal, the
     astronaut scroll scene under "creative ideas become immersive
     experiences," and the "L" + about animation.
   - **cuberto.com — third, "the most sobrio."** Specifically: **the projects /
     work showcase section is the model for how the Excel work should be
     presented** — which he notes is a similar idea to Dennis's work page.
   - **bruno-simon.com — fourth.** Nice, and the gamification works, but
     explicitly the line he does not want to cross.
2. **Typography: Fraunces (display) + General Sans (body).** Locked.
3. **No under-construction page.** Every sub-phase ships as a complete,
   deployable state instead. The animated work he wanted goes into the branded
   404/error pages and the Excel Lab "coming soon" tile (§3.7, §3.5).
4. **Move hosting to Vercel** (see §2 — this is a live incident, not a
   preference).
5. **Footer build stamp**, so he can tell at a glance which build is actually
   being served. His words: "in one deployment it fails in vercel since i
   didnt change the engine to nextjs."

He said twice, unprompted, that he does not want to be a copycat. §6 is the
explicit guardrail for that.

---

## 2. Live-site incident (resolve before or during 3.0)

Discovered while planning, not previously recorded:

**`portfolio.excelsolutionsv.com` does not serve this repository.** DNS resolves
to `75.2.60.5` (Netlify), the response carries `Server: Netlify`, and the HTML
body is the **pre-Phase-1 CRA build**. It still contains:

- the `unpkg.com/leaflet@1.7.1` CSS link (finding S8, "fixed" in Phase 1),
- the `cdn.jsdelivr.net/@emailjs/browser` script tag **plus the inline
  `emailjs.init("{6ReGD36Xmth9bgAU017GS}")` call** (finding S7),
- the keyword-stuffed meta description (§4.6),
- `manifest.json` CRA boilerplate,
- none of the Phase 2 security headers.

So Phase 1 and Phase 2 are pushed to `origin/main` but **have never reached a
user.** Every security fix in both phases is currently unshipped. This also
means the constraint "the live site must keep working while I redesign" was
protecting a build that is strictly worse than what is already committed.

There is no `.vercel/` directory, no `vercel.json`, and no `netlify.toml` in the
repo, so neither host's configuration is under version control.

### Why the earlier Vercel deploy failed

Svei recalls a Vercel deployment failing because he "didn't change the engine to
nextjs." That is consistent with the Vercel project having been created while
this repo was still Create React App: Vercel locks in a **Framework Preset** at
project-creation time and does not re-detect it when the repo's framework
changes. A CRA preset runs `react-scripts build` and publishes `build/` — against
a Next.js repo that fails outright.

### What Svei needs to do in the Vercel dashboard

Claude cannot verify or change any of this — the Vercel CLI is not installed
here, and the Vercel MCP server needs an OAuth flow that this non-interactive
session cannot run. **To let Claude inspect deployments and pull env vars in
future sessions**, install the CLI:

```bash
npm i -g vercel
```

Dashboard steps (his hands, in this order):

1. Find the existing project at <https://vercel.com/dashboard>. If one exists
   for this repo, open **Settings → Build & Deployment → Framework Preset** and
   set it to **Next.js**. Clear any custom Build Command / Output Directory
   overrides left over from CRA. If no project exists, create one by importing
   `svei00/react-portfolio` — a fresh import detects Next.js correctly.
2. **Settings → Build & Deployment → Node.js Version → 24.x** (matches the
   `engines` field in `package.json`).
3. **Settings → Environment Variables** — add the four EmailJS vars documented
   in `.env.example`, Production + Preview. The private key is server-only;
   it must **not** get a `NEXT_PUBLIC_` prefix.
4. **EmailJS dashboard → Account → Security** — enable "Allow EmailJS API for
   non-browser applications." This is the open action item from `notes.md`
   entry 51; the contact form's route handler cannot send without it.
5. Trigger a deploy and confirm the preview URL renders all five pages.
6. **Only then** move the domain: add `portfolio.excelsolutionsv.com` in Vercel
   → Settings → Domains, follow its DNS instructions at the registrar. Leave
   the Netlify site in place, unpublished but not deleted, for about a week.
7. After the cutover, confirm with:

```bash
curl -sI https://portfolio.excelsolutionsv.com | grep -i "server\|content-security"
```

   Expect a Vercel `Server` header and the
   `Content-Security-Policy-Report-Only` header from `next.config.ts`.

### Footer build stamp (Svei's request)

`src/lib/build-info.ts` — a server-only module, read by the footer, which is a
Server Component, so no `NEXT_PUBLIC_` exposure is needed:

```ts
// Vercel injects VERCEL_GIT_COMMIT_SHA at build time. Locally it is absent,
// so the stamp reads "local" and makes that obvious at a glance.
export const buildInfo = {
  commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local',
  // Evaluated once at build time for statically generated pages, which is
  // exactly the timestamp we want to display.
  builtAt: new Date().toISOString().slice(0, 10),
}
```

Rendered small and muted in the footer: `local · 2026-08-21` or
`a4c2574 · 2026-08-21`. The repo is public, so the commit SHA is not sensitive.
This lands in 3.0 (as a bare line) and moves into the designed footer in 3.1.

---

## 3. Sub-phase breakdown

Eight sub-phases. Each one is independently committable and **must leave `main`
in a deployable, visually coherent state** — that is the whole substitute for
the under-construction page.

The ordering rests on one decision, worth stating plainly:

> **Repaint first, rebuild second.** Sub-phase 3.0 repoints every hardcoded
> colour and font in the *existing* stylesheets at the new tokens, before any
> layout changes. From that moment the entire site is navy/gold/cream in
> Fraunces + General Sans, even though the layouts are still the old ones. Every
> later sub-phase then upgrades one page's layout and motion. There is never a
> commit where half the site is tutorial-blue and half is brand-navy.

---

### 3.0 — Foundations: tokens, fonts, motion plumbing, Vercel

No layout changes. Ships looking like the same site in new clothes.

1. Vercel migration per §2 (Svei's dashboard actions + the build-stamp module).
2. **`src/styles/tokens.scss`** — the single source of truth:
   - Palette as CSS custom properties on `:root`, from handoff §8.1
     (`--bg #131F30`, `--surface #1F3A5C`, `--accent #B38E5D`,
     `--accent-soft #C9A87A`, `--muted #B9C0C9`, `--text #F1EBDF`).
     Custom properties rather than Sass variables, so GSAP can read and animate
     them and so Phase 6 can verify contrast against live computed values.
   - Fluid type scale, ~6 steps, `clamp()`-based, named semantically
     (`--step--1` … `--step-5`), not by pixel size.
   - Spacing on a 4px base grid, exposed as `--space-1` … `--space-12`.
   - Motion tokens: `--ease-out-expo`, `--ease-in-out-quart`, `--dur-fast`,
     `--dur-base`, `--dur-slow`. Every animation in the system pulls from these
     so the timing feels like one hand made it.
   - A z-index scale, so the cursor / overlay menu / transition layers never
     fight.
   - Sass is used only for breakpoint mixins and maths — not for colour.
3. **Fonts.** Fraunces via `next/font/google` (variable, so the `SOFT`/`WONK`
   axes are available at runtime — see 3.2); General Sans downloaded from
   Fontshare as woff2 into `src/assets/fonts/` and loaded via
   `next/font/local`. Both `display: swap`. Delete Coolvetica, La Belle Aurore
   and `helvetica-neu.ttf` and their `fonts.ts` entries once nothing references
   them.
4. **Global repaint pass** across the eight existing `.scss` files: every
   literal hex repointed to a token, every `var(--font-coolvetica)` /
   `var(--font-la-belle-aurore)` repointed to the new families. In the same
   pass, delete the decorative `<body>` / `<h1>` / `</html>` pseudo-element
   "code tags" from `layout.scss` and `layout.tsx` — they are the single most
   recognisable tutorial artefact in the markup and nothing in the new design
   uses them.
5. **Motion foundation** — install `gsap@^3.15`, `@gsap/react@^2.1`,
   `lenis@^1.3`:
   - `src/lib/motion/gsap-setup.ts` — registers ScrollTrigger, SplitText and
     the custom eases exactly once, client-side only.
   - `src/lib/motion/reduced-motion.ts` — the **single** `gsap.matchMedia()`
     gate required by handoff §8.3 and §4.9. Every animation in the codebase
     registers inside it. There must be exactly one of these; a second one is a
     bug.
   - `src/lib/motion/smooth-scroll-provider.tsx` — Lenis, wired to
     `ScrollTrigger.update` and driven by the GSAP ticker (never two rAF loops),
     and **disabled entirely** under `prefers-reduced-motion: reduce`.
   - Nothing animates yet. This sub-phase only proves the plumbing loads,
     tree-shakes, and does not regress the Lighthouse score.
6. Introduce **SCSS Modules** for anything new from here on
   (`component-name.module.scss`, explicit `@use '@/styles/tokens' as *;` per
   file — no `additionalData` magic). Existing global stylesheets convert as
   their page gets rebuilt, not before. This is the deferral from
   `phase-2-plan.md` §4.1 finally coming due.

**Exit:** deployed on Vercel from `main`, domain cut over, whole site navy/gold/
cream in the new type, layouts untouched, build stamp visible, Lighthouse mobile
not below the Phase 2 baseline of 82.

**Licence note (closes handoff §12 VERIFY item d):** verified this session —
`gsap@3.15.0` publishes under the GSAP *Standard "no charge" License*, and
**SplitText now ships inside the free public npm package** (`dist/SplitText.js`
is present in the published tarball). The paid Club GreenSock tier that Svei
originally feared is gone. `lenis@1.3.26` is MIT. No `.npmrc` token, no private
registry, nothing to leak — which is what finding S1 was about.

---

### 3.1 — Chrome: navigation, footer, page transitions, cursor

The layer that touches every page. After this, the site *reads* as the new site
regardless of which page you land on.

1. **Kill the icon sidebar.** It is the biggest single tutorial tell (§4.6) and
   its FontAwesome icons are exactly the "big icons" Svei dislikes about the
   Dennis reference. Replace with a slim top bar: wordmark left, three or four
   **text** links right, no icons. On mobile, a full-screen overlay menu with
   staggered GSAP choreography on open/close. The hamburger stays a real
   `<button>` (that fix from Phase 2 carries over), with focus trapping and
   `Escape` to close.
2. **Real footer**: contact CTA, social links **with accessible names** (§4.9),
   and the build stamp from §2.
3. **Page transitions** via React's `<ViewTransition>`, which works in the
   Next 16 App Router with **no configuration**
   (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`).
   Use the directional pattern: `transitionTypes={['nav-forward']}` /
   `['nav-back']` on `<Link>`, and the matching `enter`/`exit` maps wrapped
   around each **`page.tsx`** — the docs are explicit that layouts persist
   across navigation, so a wrapper in `layout.tsx` never fires.
   This replaces the hand-rolled GSAP overlay wipe that handoff §8.3 imagined;
   it is less code, it is interruptible, and it degrades to an instant
   navigation on browsers without support.
4. **Custom cursor** — the Cuberto-flavoured micro-interaction language: a small
   follower that scales and labels on hover targets. Gated behind
   `(pointer: fine)` **and** the reduced-motion check. Never a blob; see §6.
5. **Magnetic CTA buttons** and **link underline draw-ins** as reusable
   primitives in `src/components/motion/`, so later sub-phases compose them
   rather than reinventing them.

**Exit:** every route shares the new chrome; keyboard navigation works through
the whole nav; transitions verified in Chromium and Safari; reduced-motion
verified to disable smooth scroll, cursor and transitions.

---

### 3.2 — Home: the signature moment

The page that has to carry the Awwwards ambition. Everything else can be quiet;
this cannot.

1. **Hero: SplitText name reveal with a Fraunces variable-axis animation.**
   Masked line/char stagger on a custom ease, and — the part that is ours, not
   borrowed — GSAP tweens Fraunces's `SOFT` and `WONK` axes during the reveal,
   so the letterforms visibly change character as they settle rather than merely
   sliding into place. This is the honest answer to the Lusion hero Svei loved:
   same *feeling* of type that is alive and playful, arrived at through a
   different mechanism, with no WebGL and no astronaut.
   Accessibility is not optional here: the real text goes in `aria-label` on the
   heading with `aria-hidden="true"` on the split spans (SplitText's `aria`
   option handles this) — finding §4.9 [C] is specifically about this.
2. **Scroll choreography**, ScrollTrigger-driven: intro → the positioning
   statement (the "software engineer who builds better Excel tools than
   accountants do" story that §4.7 says is currently told nowhere) → a selected
   work teaser → contact CTA. Section reveals on clip-path/opacity/y. At most
   **one** pinned sequence in the entire site, and it is reserved for the Excel
   Lab intro (3.5) — not spent here.
3. **Retire**: `AnimatedLetters`, the three 3D letter images, the rotating CSS
   cube in `logo.tsx`, the Pacman loader. All four are named in the handoff exit
   criteria as things that must not survive.
4. **This should close the Phase 2 performance gap.** `notes.md` entry 60 traced
   ~4.2s of LCP `elementRenderDelay` to the stacked CSS `animation-delay`
   choreography in `home.scss` (`.container` 1s + `h2` 1.8s). That system is
   deleted here. Re-run Lighthouse mobile at the end of this sub-phase; expect
   the 82 to move up meaningfully.

**Exit:** Home fully rebuilt, zero tutorial elements remaining on it, 60fps on a
mid-range laptop, reduced-motion path renders the same content statically.

---

### 3.3 — Work index + case studies

The Cuberto/Dennis pattern Svei explicitly asked for.

1. **Route rename** `/portfolio` → `/work`, with a permanent redirect in
   `next.config.ts` so no existing link breaks, and `sitemap.ts` updated.
2. **Index**: large image tiles on a generous grid, hover reveal of title and
   role, no icons. Restrained — this is the "sobrio" register.
3. **Detail route** `/work/[slug]`, entered via a **shared-element
   `<ViewTransition>` morph** — the same `name` on the index thumbnail and the
   detail hero, so the image travels rather than the page swapping. This is the
   documented Step 1 pattern from the Next 16 guide and it is exactly the
   continuity effect that makes the Dennis work page feel expensive.
4. **Restructure `src/content/projects.json` now to mirror the Phase 4 Sanity
   `project` schema exactly** (handoff §9: title, slug, summary, description,
   coverImage + alt, gallery, techStack, liveUrl, repoUrl, featured,
   orderRank). Doing this here means Phase 4 is a data-*source* swap with the
   components untouched, instead of a second rewrite. The current file has four
   ad-hoc keys and one entry; it needs real content from Svei.

**Open item for Svei:** the index currently holds **one** project. A work page
with one tile undercuts the whole story. He needs to supply two to four real
projects (title, one-line summary, what he built, stack, link, one good image
each) before this sub-phase can finish.

**Exit:** `/work` live with the morph transition working, `/portfolio`
redirecting, JSON shaped to the Sanity schema.

---

### 3.4 — About + the death of `/skills`

1. **Delete `/skills` and the tag cloud.** The tag cloud is named in the handoff
   exit criteria as something that must not survive, it is a per-word blinking
   animation with no reduced-motion handling (§4.9), and it is the *only* place
   the Excel story currently appears — as the largest word in a word cloud,
   which is precisely the problem §4.7 describes. Skills fold into About as
   typeset groups. Redirect `/skills` → `/about`; drop `react-tagcloud` and
   `@types/react-tagcloud`.
2. **Copy rewrite** per §4.7: one concrete personal hook (bilingual EN/ES, the
   accountant-tooling niche, family, California), zero job-seeker clichés, zero
   typos. **This is a content conversation with Svei, not a code task** — the
   implementation session should draft and he approves.
3. The **face photo** lives here, at a size where a face actually reads.

**Exit:** About is the human page, `/skills` is gone and redirecting, copy
approved by Svei in writing.

---

### 3.5 — Excel Lab placeholder

Required by handoff §7 Phase 3: a *designed* "coming soon," not a gap.

1. `/excel-lab` route, added to nav and sitemap.
2. Built in the Cuberto showcase register Svei pointed at, with the framing line
   from §10 — a software engineer applying real engineering practice
   (versioning, testing, modular design) to spreadsheets — and two or three
   placeholder tiles marked as forthcoming, honestly labelled. Nothing pretends
   to be finished content.
3. **The one pinned scroll sequence** in the whole site belongs here, on the
   section intro (handoff §8.3 allows exactly one).
4. Real case studies land in Phase 5, authored in Sanity.

**Exit:** the section exists in the IA and reads as intentional.

---

### 3.6 — Contact

1. Form restyled to the new system. The hardened route handler, honeypot,
   throttle, real `<label>`s and inline status from Phase 2 all stay as-is —
   that work was correct and this sub-phase is presentation only.
2. **Recommendation: retire the map.** `leaflet` + `react-leaflet` +
   `@types/leaflet` + the three committed marker PNGs + an
   `img-src https://*.tile.openstreetmap.org` CSP allowance, all to render a
   city-level dot that — after the finding S4 fix correctly stripped the street
   address — now communicates nothing a typeset "Inland Empire, California"
   line does not. Dropping it removes a dependency, a CSP entry and a
   client-only dynamic import. **Svei's call**; if he wants a map, it stays and
   gets restyled to the palette.

**Exit:** Contact matches the system; form still sends end-to-end against real
EmailJS credentials.

---

### 3.7 — Retire, brand marks, audit

1. **Dependency removal** — everything the redesign orphaned:
   `animate.css`, `loaders.css`, `react-loaders`, `react-tagcloud`,
   `@types/react-tagcloud`, and the three FontAwesome packages if the new
   icon-free nav does not need them. Delete the unused font files and images.
   Re-run `npm audit`; Phase 2 ended at zero and it must stay there.
2. **Branded `not-found.tsx` and `error.tsx`** using the motion language — this
   is where the animation work from the under-construction idea actually lands
   (§1.3), in two pages that get used rather than one that ideally never is.
3. **Favicon and monogram** — see §5.
4. **Regenerate `app/opengraph-image.tsx`** on the real palette. `notes.md`
   entry 57 explicitly built the current one as a placeholder "since the site
   has no finalized brand palette yet — that's Phase 3." This is that moment.
5. **Audit sweep** against the handoff §7 exit criteria:
   - axe DevTools clean on every route,
   - `prefers-reduced-motion` verified per animation, not just globally,
   - contrast re-verified on the *final* pairs with a checker (gold `#B38E5D`
     is ~4.9:1 on the navy — fine for large text and accents, **never** body
     copy; the tokens file should carry that as a comment),
   - full keyboard navigation,
   - copy proofread end to end, English reviewed by Svei,
   - Lighthouse mobile ≥85 (the ≥90 target belongs to Phase 6).

**Exit:** handoff §7 Phase 3 exit criteria met in full.

---

## 4. Information architecture (target, after 3.5)

```
/            Home        hook, positioning, selected work teaser, CTA
/work        Work        web dev projects        (was /portfolio, redirected)
/work/[slug] Case study  shared-element morph from the index
/excel-lab   Excel Lab   2-3 curated pieces      (placeholder in 3.5, real in Phase 5)
/about       About       human, bilingual, skills folded in  (absorbs /skills)
/contact     Contact     form + typeset location
```

Redirects to configure in `next.config.ts`: `/portfolio → /work` and
`/skills → /about`, both permanent. Web dev stays the lead narrative; Excel Lab
is one section and must never outweigh it (§4.7).

---

## 5. Favicon — Svei's direct question

**Do not put your face on the favicon.** A favicon renders at 16×16 and 32×32.
A photograph of a face at that size resolves to an ambiguous brown smudge; the
tab becomes unidentifiable, which is the one job a favicon has.

Use a **gold monogram on navy** — a single letter or a tight two-letter
lockup — designed as SVG so it stays crisp, with the standard PNG sizes
generated from it. That is what actually survives the size, and it doubles as a
wordmark for the nav and a watermark for the OG image.

The face belongs in two places, and both are in this plan: the **About page**
(3.4), at a size where a human face communicates warmth, and the **OG image**
(3.7), at 1200×630, where a real face measurably improves link click-through.
Dennis's site works the same way — the identity is a mark, the person appears at
full size where there is room for them.

---

## 6. Anti-copycat guardrails

Svei raised this twice unprompted, so it gets teeth. For each reference: what we
take is a *principle*; what we refuse is an *execution*.

| Reference | Take (principle) | Refuse (execution) |
|---|---|---|
| dennissnellenberg.com | Pacing, restraint, generous whitespace, magnetic CTAs, the rhythm of the work page | The oversized icons (he said so himself), the layout as a shape, the colour story |
| lusion.co | The conviction that the hero should feel alive and playful; type as a character, not a label | WebGL, the astronaut, their specific type reveal, any 3D scene. **No WebGL in Phase 3 at all** |
| cuberto.com | The cursor-as-language idea; the sober restraint of the project grid | Their cursor's blob morphology, their grid proportions, their colour |
| bruno-simon.com | Nothing. It is the boundary marker | Gamification of any kind. This is the line |

**Ours, owed to nobody:** the Fraunces variable-axis type reveal; navy/gold/
silver/cream; the Excel Lab framed as engineering case studies with hard outcome
metrics; the bilingual accountant-tooling positioning. If a reviewer can name the
site we copied, the sub-phase failed.

---

## 7. Motion budget (hard limits)

- **`prefers-reduced-motion` is a gate, not a nicety.** Exactly one
  `gsap.matchMedia()` in the codebase; every animation registers inside it;
  Lenis is fully disabled in the reduced branch. Verified per sub-phase, not
  once at the end.
- **60fps or it ships without the effect** (handoff §8.3, verbatim). Profile on
  a mid-range laptop, not on the dev machine at full power.
- **No WebGL, no Three.js, no physics engine in Phase 3.** That is the Bruno
  Simon line.
- **One pinned ScrollTrigger sequence site-wide**, reserved for Excel Lab.
- **Lighthouse mobile must not drop below 85 at any sub-phase boundary.** If a
  sub-phase costs more than it earns, the effect comes out. Phase 6 raises the
  bar to 90.
- GSAP + ScrollTrigger + SplitText + Lenis is roughly 70KB gzipped. That is an
  acceptable price for this ambition *only* if it stays client-side and
  route-split — never in the server bundle, never on a route that does not
  animate.

---

## 8. Risks and how each is handled

| Risk | Handling |
|---|---|
| The whole redesign stalls for days mid-phase | Every sub-phase is independently deployable and visually coherent (§3, "repaint first"). Whatever is on `main` is always shippable. This replaces the under-construction page. |
| Half-new/half-old visual incoherence | 3.0's global repaint means the entire site changes palette and type in one commit, before any layout work starts. |
| `/work` ships with one project | Flagged as an open item in 3.3. Svei supplies two to four real projects before that sub-phase closes. |
| Motion tanks performance | §7 budget, enforced at every sub-phase boundary, not at the end. |
| Phase 4 forces a second rewrite of the work components | 3.3 shapes `projects.json` to the Sanity `project` schema up front, so Phase 4 swaps the data source only. |
| Vercel cutover breaks the live site | Netlify stays up, unpublished but undeleted, for about a week after the DNS switch (§2). |
| Copy ships with typos again | 3.4 and 3.7 both gate on Svei's written approval. Typos are what §4.6 says destroyed the senior-engineer story the first time. |

---

## 9. Session handoff

**This planning session is Opus. Implementation is Sonnet**, one sub-phase per
session, in order. Each implementation session should:

1. Read `handoff.md` §11 (code style rules — small single-purpose functions,
   classroom-teacher comments, descriptive names, kebab-case folders) and §12.
2. Read this file's §3 entry for its sub-phase, plus §6 and §7 in full — those
   two are the constraints most likely to be violated by accident.
3. Append numbered entries to `notes.md` (currently at 60) for every dependency
   change, config change and decision.
4. End by handing Svei a ready-to-paste commit command — hyphen-joined, no
   quotes, no apostrophes, ≤ ~10 words. **Never run `git add` or `git commit`
   directly.**

Suggested commit messages, one per sub-phase:

```
phase-3-0-design-tokens-fonts-motion-foundation
phase-3-1-new-chrome-nav-footer-page-transitions
phase-3-2-home-hero-reveal-scroll-choreography
phase-3-3-work-index-case-studies-shared-morph
phase-3-4-about-rewrite-retire-skills-tagcloud
phase-3-5-excel-lab-designed-placeholder
phase-3-6-contact-restyle-retire-map
phase-3-7-retire-deps-brand-marks-accessibility-audit
```

Return to Opus if a sub-phase turns out to need a real design decision this plan
did not settle.

---

## 13. Addendum — image spec for content, and Phase 4 CMS note

Added 2026-08-26, mid-3.4/3.5, from a live conversation with Svei.

**Work project images (until Phase 4 replaces JSON with Sanity):** every
project needs a `coverImage` (4:3, the single best representative shot) and
gets a matching detail hero (16:9, can be the same shot). `gallery[]` is
optional, any aspect ratio, 2-4 supporting shots. Applies uniformly to web
projects, desktop apps, and Python tools — a clean screenshot of the main
window/output for the latter two.

**Phase 4 Sanity schema requirement (do not lose this):** every image field
on the `project` and `excelPiece` schemas must carry a real `description`
in its `defineField` config explaining what the image should show and its
expected aspect ratio (e.g. "Cover image, 4:3, the single best
representative shot of the project") — visible to whoever is filling out
Sanity Studio, so the content-entry step is self-documenting instead of
requiring a separate reference doc. This was Svei's own request: "help me
figure out what kind of images" should live in the CMS, at the point of
entry, not just in project docs like this one.

**Skill honesty note:** Python appears in About's skills as its own "Data &
Automation" group, separate from "Languages" (JS/TS/PHP/SQL) — deliberately,
since this portfolio site itself is TypeScript/Next.js, and Python must
never read as if it were used to build it. Python's real home is data
analysis work and the CFDI-App project. Any skill added in the future needs
the same honesty check: which bucket does it honestly belong to, not just
"is it true I know this."
