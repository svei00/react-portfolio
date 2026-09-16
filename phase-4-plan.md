# phase-4-plan.md — Sanity CMS

> Planning session: 2026-10-11 (Opus). Supersedes handoff.md §7 "Phase 4" and
> §9 where they disagree — §9 was written before the Sanity best-practices
> skill was consulted (handoff §9 itself says the skill wins on Sanity
> specifics) and before the LinkedIn / ExcelSolutionsV alignment work.
>
> **This file is the plan. `notes.md` remains the append-only build record.**
> Implementation sessions (Sonnet) read this file, then the sub-phase they
> are on, then start.
>
> **Svei is on Windows PowerShell.** Every command handed to him chains with
> `;` or sits on its own line — never `&&`.

---

## 1. What Svei decided (do not re-litigate)

Asked directly during this planning session (2026-10-11):

1. **English content, schema ready for Spanish.** Only English gets written
   now. The schema stores every editable text as a per-language array (see §4)
   so adding Spanish later means *filling fields and adding routes*, not
   migrating content. His question was whether that is "the same build at the
   same time" — it is not:
   - **Schema-ready for Spanish** (this phase): roughly 10% more schema work,
     zero visible change on the site.
   - **Actually bilingual site** (a future phase, not scheduled): `/en` and
     `/es` URL prefixes with redirects, a language toggle, `hreflang` tags,
     and translating every piece of copy. That is the big cost, and it is
     deferred until he decides he wants it.
2. **The separation between development and Excel/data work:**
   - **Work** (`project` documents) = software he builds that is not specific
     to accounting: web apps, mobile apps, general-purpose desktop apps
     (Cover Studio, FrutiApp, Bloom Aquatics, Pura Vida, the ExcelSolutionsV
     site itself as a MERN app).
   - **Excel Lab** (`excelPiece` documents) = accounting, tax and data
     automation, whatever the language — Excel, VBA, Power Query, *and*
     Python tools whose job is accounting work (CFDI processing, workpapers,
     DIOT, SISUB/ICSOE, CONTPAQi reports, SAT/IMSS/INFONAVIT retrieval).
   - Rule of thumb for an ambiguous piece: *if the outcome is measured in
     accounting terms (hours of close, errors in a póliza, compliance
     filings), it is Excel Lab.*
3. **Check ExcelSolutionsV's own `/about` and `/projects` pages too** — done,
   see §2.

---

## 2. What the research found (inputs this plan is built on)

### 2.1 ExcelSolutionsV already has the Excel Lab content, in Spanish

`excelsolutionsv.com/projects` already describes the accounting tools in
exactly the shape handoff §10 wanted for Excel Lab — **El problema / Qué hace /
Lo que lo hace distinto / Nota honesta / Herramientas** — for six main tools
(Automatizador SAT → sistema contable with an ML account classifier,
Anonimizador de CFDI, Procesador de CFDI, Papeles de trabajo contable-fiscal,
Automatizador SISUB/ICSOE, Automatizador de trámites SAT/IMSS/INFONAVIT) plus
four smaller ones (Cargador masivo de REP, Renombrador de CFDI, Reporteador,
Generador de DIOT).

Consequences for this plan:

- The `excelPiece` schema (§4.3) **mirrors that structure field for field**,
  so Phase 5 is mostly translating and curating, not inventing.
- Handoff decision 4 still stands: **Excel Lab shows 2-3 curated pieces.**
  ExcelSolutionsV stays the full, Spanish, accountant-facing catalogue. Every
  Excel Lab piece links to its ExcelSolutionsV write-up (`catalogUrl`), and
  the Excel Lab page links to the full catalogue once. That resolves the
  duplication instead of fighting it.
- **The same "must not contradict" rule as LinkedIn applies between the two
  sites** (tool names, status, tech, and the "honest note" caveats).

### 2.2 Cross-site discrepancies to fix (outside this repo — Svei's or another session's)

- `excelsolutionsv.com/projects` says the personal portfolio is "React y
  TypeScript". It is Next.js now. Fix in the `blogExcelSolutionsV` repo.
- `excelsolutionsv.com/about` says the software-engineering degree was
  conferred in 2023; LinkedIn (and now the portfolio's Background block) show
  the study dates 2017-2021. Both can be true (studies ended 2021, title
  issued 2023) — pick one phrasing and use it on all three surfaces.
- `excelsolutionsv.com/projects` lists **Crónicas del Vejerete** (Next.js
  blog) — a real project missing from the portfolio's Work. Add it during
  4.3 (Svei confirms the live URL).

### 2.3 Sanity best-practices skill vs handoff §9 — where the plan departs

| handoff §9 said | this plan does | why |
|---|---|---|
| Studio embedded at `/studio` in the Next.js app | **Standalone Studio** in a `studio/` folder, deployed with `sanity deploy` to Sanity's free hosting (`<name>.sanity.studio`) | The skill's recommendation (faster builds, Studio auto-updates, TypeGen watch). Portfolio-specific reasons on top: an embedded Studio would force the site's CSP wide open (Sanity's own scripts, websockets, frames) right before Phase 6 is supposed to *enforce* CSP, and its large bundle would sit in the same build that currently scores 90 on Lighthouse. Svei's `tours-web` embedded the Studio and its NOTES.md records three separate problems that caused (a `projectId` config error that needed `'use client'`, `sanity init` overwriting the route, CORS setup). |
| `next-sanity` for fetching | **`@sanity/client` + `@sanity/image-url` + `@portabletext/react` + `@sanity/webhook`** directly | `next-sanity` lists `sanity` and `styled-components` as peer dependencies — Studio packages the website itself does not need once the Studio lives elsewhere. The website only fetches published content on the server. |
| Localized fields not specified | **`sanity-plugin-internationalized-array`** | The skill explicitly says *not* to use `{ en, es }` localized objects (they hit attribute limits) — which is the pattern `tours-web` uses. Do not copy that pattern here. |
| Tag revalidation via webhook | **Same**, but with Next 16's two-argument `revalidateTag(tag, 'max')` | The skill's example uses the one-argument form, which Next 16 deprecated (`node_modules/next/dist/docs/01-app/03-api-reference/04-functions/revalidateTag.md`). |

### 2.4 Versions verified on npm (2026-10-11)

`sanity` 6.18.0 · `@sanity/client` 8.9.0 · `@sanity/image-url` 2.1.1 ·
`@portabletext/react` 8.0.1 · `@sanity/webhook` 4.0.4 · `groq` 6.18.0 ·
`sanity-plugin-internationalized-array` 5.3.3 (requires
`@sanity/language-filter` as a peer; `@sanity/assist` is optional) ·
`next-sanity` 13.3.4 (not used, see 2.3).

Re-check with `npm view <pkg> version` at implementation time.

---

## 3. Prerequisite — the live site (blocks 4.6 only)

The webhook in 4.6 needs a deployed URL to call. As of 2026-10-11
`portfolio.excelsolutionsv.com` still serves the pre-Phase-1 Netlify build
(phase-3-plan.md §2). Sub-phases 4.0-4.5 can all be built and verified
locally; **4.6 cannot finish until the Vercel deployment works** — the
`*.vercel.app` URL is enough, the custom domain is not required.

---

## 4. Content model

All three types live in `studio/schemaTypes/`. Every text field Svei edits is
an internationalized array; `en` is required, `es` is optional and hidden by
the language filter until he wants it. Code-level UI strings (nav labels,
button text) stay in code — they are not content.

### 4.1 Shared building blocks

- **Languages**: a static list `[{ id: 'en', title: 'English' }, { id: 'es',
  title: 'Español' }]` passed to the plugin — no `locale` document type needed
  for two fixed languages.
- **`simpleBlockContent`**: Portable Text with Normal style, bold/italic,
  links, bullet lists. No headings beyond H3, no embedded images (images go in
  their own fields so they always get alt text).
- **`accessibleImage`** object: `image` with `hotspot: true` + `alt`
  (internationalized string, **`en` required** — handoff §9: alt text is a
  required field, enforced in validation). Every usage sets a field
  `description` stating the aspect ratio and what the image should show
  (phase-3-plan.md §13 — Svei's request that the CMS explain itself at the
  point of entry).
- Querying any localized field always goes through one GROQ pattern:
  `coalesce(field[_key == $locale][0].value, field[_key == "en"][0].value)`
  with `$locale` fixed to `"en"` for now. Put it in one helper so Spanish later
  changes one constant.

### 4.2 `project` — Work (development)

Matches `src/types/project.ts` today plus two fields the audits asked for.

| field | type | notes |
|---|---|---|
| `title` | i18n string | required |
| `slug` | slug | required, from `title.en` |
| `summary` | i18n string | required, max ~120 chars (tile text) |
| `description` | i18n `simpleBlockContent` | replaces today's plain-string description |
| `platform` | string, list: `web` / `mobile` / `desktop` | new — shown on the tile, and the Work side of the §1.2 separation |
| `year` | number | new — LinkedIn has dates for its projects; keeps both in step |
| `coverImage` | `accessibleImage` | required. Description: "Cover, 4:3, the single best representative shot" |
| `gallery` | array of `accessibleImage` | optional, 2-4. Description: "Supporting shots, any ratio" |
| `techStack` | array of strings | required, at least 1 |
| `liveUrl` / `repoUrl` | url | optional |
| `featured` | boolean | |
| `orderRank` | number | manual sort |

### 4.3 `excelPiece` — Excel Lab (accounting, tax and data automation)

Mirrors ExcelSolutionsV's structure (§2.1) and handoff §10's
Problem → Solution → Outcome.

| field | type | maps to ExcelSolutionsV | notes |
|---|---|---|---|
| `title` | i18n string | tool name | required |
| `slug` | slug | | required |
| `problem` | i18n text | El problema | required |
| `solution` | i18n `simpleBlockContent` | Qué hace | required |
| `differentiator` | i18n text | Lo que lo hace distinto | optional |
| `outcome` | i18n string | — (new) | required — **one hard metric** (hours saved, files per month, errors caught). Handoff §10 requires it; ExcelSolutionsV doesn't have it yet, so Svei writes these in Phase 5. |
| `honestNote` | i18n text | Nota honesta | optional — keep it; it is the most credible thing on that page |
| `status` | string, list: `in-use` / `active-development` | | both ExcelSolutionsV pages already distinguish these |
| `tools` | array of strings | Herramientas | required |
| `images` | array of `accessibleImage` | | 1-3, **staged data only** — validation description repeats handoff §10's rule: no real client data, RFCs, names or fiscal figures in any screenshot |
| `fileUrl` | url | | optional, only where Svei approved exposure per piece |
| `catalogUrl` | url | the piece's ExcelSolutionsV section | optional |
| `featured` / `orderRank` | | | |

### 4.4 `siteSettings` — singleton (fixed `_id: "siteSettings"`)

The one document with an explicit id (the skill's rule: let Sanity generate
ids for everything else; singletons controlled by Studio Structure are the
exception).

| group | fields |
|---|---|
| Identity | `name`, `title` (i18n — "Software Developer · Accounting Automation"), `location` (i18n — **city level only**, description repeats handoff finding S4), `email` |
| Home | `positioningStatement` (i18n block) |
| About | `aboutBody` (i18n block), `background` (array of `{ label, items[] }`), `skillGroups` (array of `{ label, skills[] }`) |
| Contact | `contactIntro` (i18n text) |
| Links | `socialLinks` (array of `{ label, url }`) |
| SEO | `seoDescription` (i18n string), `ogImage` (`accessibleImage`, 1200×630, optional — falls back to the generated `opengraph-image.tsx`) |

**Why About's Background and Skills move into the CMS:** handoff decision 6
says the site must be re-checked against LinkedIn whenever those change. In
the CMS, keeping them in step is a 2-minute Studio edit instead of a code
change.

---

## 5. Sub-phases

Each sub-phase ends deployable and committable, same rule as Phase 3.

### 4.0 — Sanity project and Studio scaffold (Svei's hands for the login parts)

1. **Svei**: create the project at <https://www.sanity.io/manage> (free plan),
   dataset `production`, **public** dataset (portfolio content is public
   anyway; drafts stay private either way). Note the project ID — it is not a
   secret.
2. **Svei**, from the repo root (the CLI must run from the root, not inside
   `src/`, or it switches to the embedded flow):

   ```powershell
   npm create sanity@latest -- --project <projectId> --dataset production --template clean --typescript --output-path studio
   ```

3. **Implementer**, before committing anything from `studio/`:
   - `.gitignore`: change `package-lock.json` to `/package-lock.json` — the
     current pattern would also ignore `studio/package-lock.json`, and the
     Studio is an npm project (its own lockfile is correct; the root stays on
     yarn).
   - `tsconfig.json` (root): add `"studio"` to `exclude`, so `next build`'s type
     check never compiles Studio code.
   - `studio/.env` / `studio/.env.local` hold `SANITY_STUDIO_PROJECT_ID` and
     `SANITY_STUDIO_DATASET`; confirm the generated `.gitignore` inside
     `studio/` ignores `.env.local`.
4. Install the i18n plugin in `studio/`:
   `npm install sanity-plugin-internationalized-array @sanity/language-filter`.

**Exit:** `npm run dev` inside `studio/` opens the empty Studio on
`localhost:3333`; `next build` at the root is unaffected.

### 4.1 — Schemas, structure, validation; deploy the Studio

1. Schemas from §4: `simpleBlockContent`, `accessibleImage`, `project`,
   `excelPiece`, `siteSettings`.
2. Studio Structure: a **"Site settings"** item opening the singleton directly
   (no list, no "create new"); then "Work" and "Excel Lab" lists. Remove
   `siteSettings` from the global "create new" menu and from duplicate/delete
   actions.
3. Language filter configured with English shown by default.
4. Field `description`s on every image field (§4.1) and on `location`.
5. **Svei**: `npx sanity deploy` from `studio/` (picks the
   `<name>.sanity.studio` hostname, logs in). Because the Studio is hosted by
   Sanity and the site only fetches on the server, **no CORS origin needs to be
   added** — unlike `tours-web`.

**Exit:** Svei can open the hosted Studio, see the three content areas, and is
blocked from saving a project without a cover image + English alt text.

### 4.2 — Website data layer (no visible change yet)

1. Root dependencies (yarn, not npm):
   `npx yarn add @sanity/client @sanity/image-url @portabletext/react @sanity/webhook groq`
2. `src/sanity/` (kebab-case files, small single-purpose modules):
   - `env.ts` — reads `NEXT_PUBLIC_SANITY_PROJECT_ID`,
     `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_VERSION`; throws a clear error
     if the project ID is missing (a silent empty string produced a confusing
     failure in `tours-web`).
   - `client.ts` — `createClient({ ..., useCdn: false })`. `useCdn: false` is
     deliberate and taken from `tours-web`'s own lesson: two stacked caches
     (Sanity CDN + Next) made "I published and nothing happened" ambiguous.
     Next's cache is the only cache.
   - `fetch.ts` — one `sanityFetch({ query, params, tags })` helper passing
     `next: { tags, revalidate: 3600 }`: instant updates via webhook tags
     (4.6), plus a one-hour fallback so a missed webhook can't leave content
     stale forever. **Verify** Next 16's `fetch` caching semantics against
     `node_modules/next/dist/docs/` before writing it (AGENTS.md) — Next 15+
     does not cache `fetch` by default, so the options are what opt in.
   - `queries.ts` — every query wrapped in `defineQuery` (from `groq`) for
     TypeGen; the localized-field `coalesce` helper lives here.
   - `image.ts` — `@sanity/image-url` builder; `next/image` keeps working via
     `images.remotePatterns` for `cdn.sanity.io`.
3. TypeGen: run from `studio/` with the root's `src/sanity/` as the query
   source; generated types go to `src/sanity/types.ts` (committed).
4. `next.config.ts`: `images.remotePatterns` + CSP `img-src` gains
   `https://cdn.sanity.io`. `connect-src` does **not** change (all fetching is
   server-side).
5. `.env.example` documents the new variables (project ID, dataset, API
   version, `SANITY_REVALIDATE_SECRET`). No write token anywhere in the app.

**Exit:** build clean, site unchanged, a throwaway server-side query returns
`[]` from the empty dataset.

### 4.3 — Work from Sanity; seed the existing projects

1. Seed script `scripts/seed-sanity.ts` (runs on Node 24's built-in
   TypeScript support: `node scripts/seed-sanity.ts`, no `tsx` dependency).
   Reads the current `src/content/projects.json`, uploads each cover image
   from `public/portfolio/` when the file exists, and creates `project`
   documents. Rules:
   - Let Sanity generate `_id`s (the skill's global rule); make the script
     idempotent by **skipping a project whose slug already exists**, not by
     inventing ids.
   - `description` strings become a single Portable Text paragraph under
     `en`; `platform` and `year` are added per project (values listed in
     notes.md when seeding).
   - Uses a **write token** from a gitignored `.env.local`, created by Svei
     in sanity.io/manage → API → Tokens, and **deleted after seeding**.
   - Adds **Crónicas del Vejerete** (§2.2) once Svei confirms its URL.
2. `src/app/work/page.tsx`, `work/[slug]/page.tsx` and `sitemap.ts` read from
   Sanity. `generateStaticParams` keeps static generation; new slugs added
   later render on demand and are then cached (default `dynamicParams`).
3. Portable Text rendering for `description` with `@portabletext/react` and
   the site's own typography (no new styles beyond what `work.module.scss`
   already defines).
4. Keep `projects.json` until 4.6 proves the CMS path end to end.

**Exit:** `/work` and every detail page render identically from Sanity; an
empty `project` list shows the existing empty state.

### 4.4 — Excel Lab from Sanity

1. `/excel-lab` lists `excelPiece` documents (featured, ordered) using the
   §4.3 fields. **With zero pieces, the current Phase 3.5 page — pinned
   intro + "Coming soon" tiles — is the empty state, unchanged.** Nothing is
   lost while Phase 5 content doesn't exist yet.
2. The single pinned ScrollTrigger sequence stays exactly as built
   (handoff §8.3 — one pin site-wide).
3. Add `/excel-lab/[slug]` (Problem → Solution → Outcome → images → honest
   note → tools → links), same patterns as `/work/[slug]`, so Phase 5 is
   content-only.
4. One link to the full ExcelSolutionsV catalogue on the Excel Lab index.

**Exit:** the page renders identically with zero pieces; one test piece
created in the Studio and deleted again renders on both index and detail.

### 4.5 — Site settings drive the shared copy

Move into `siteSettings`: Home positioning statement + tagline, About body,
Background, Skills, Contact intro + location + email, footer social links,
default SEO description. Each component keeps a **coded fallback** equal to
today's copy, so a missing or half-filled settings document never produces
a blank page (handoff §7 Phase 4 exit criterion: build passes with zero
content). Seed the singleton from today's copy as part of the 4.3 script.

**Exit:** editing the tagline in the Studio and publishing changes the site
(locally: after a refetch; deployed: after 4.6).

### 4.6 — Webhook, deploy, verify, retire the JSON

1. `src/app/api/revalidate/route.ts`: verify the signature with
   `@sanity/webhook` (`SANITY_REVALIDATE_SECRET`), then
   `revalidateTag(tag, 'max')` for each tag in the payload. Reject unsigned
   calls with 401.
2. **Svei** in sanity.io/manage → API → Webhooks: URL
   `https://<deployment>/api/revalidate`, filter
   `_type in ["project", "excelPiece", "siteSettings"]`, projection
   `{ "tags": [_type] }`, secret = the same `SANITY_REVALIDATE_SECRET` added in
   Vercel's environment variables.
3. Vercel env vars (Production + Preview): project ID, dataset, API version,
   revalidate secret.
4. Verification, all real, none assumed:
   - publish a change in the Studio, confirm it appears on the deployed site
     without a redeploy;
   - **empty-dataset build**: point a local build at an empty dataset
     (`development`, created for this test) and confirm `next build` passes and
     every page shows its empty state or fallback copy;
   - axe on every route, Lighthouse mobile on Home and Work — must not drop
     below Phase 3.7's numbers (Home 90, Work 89);
   - `yarn audit` 0 vulnerabilities.
5. Delete `src/content/projects.json` and the `@/content` import path
   (handoff §7 Phase 4 exit criterion). `data/` stays gitignored.

**Exit:** handoff §7 Phase 4 exit criteria — Svei adds or edits a project in
the Studio and sees it live without touching code; build passes with zero
content; content JSON deleted.

---

## 6. Risks

| risk | handling |
|---|---|
| Live site still on Netlify | 4.0-4.5 don't need it; 4.6 needs only the `*.vercel.app` URL. Flag at every sub-phase handoff until it's fixed. |
| Write token leaks (the Phase 1 `.npmrc` token history) | Only the seed script ever uses one; `.env.local` only; Svei deletes the token right after seeding; no token in the website at all. |
| Spanish fields confuse an English-only editor | Language filter hides `es` by default. |
| Studio's lockfile silently ignored | `.gitignore` fix in 4.0 step 3, before the first Studio commit. |
| Copying `tours-web`'s `{ en, es }` objects by habit | §2.3 — explicitly the pattern the Sanity skill rejects. Use `internationalizedArray`. |
| Excel Lab and ExcelSolutionsV drift apart | Same "must not contradict" rule as LinkedIn; `catalogUrl` on every piece makes the pair visible. |
| Real client data in an Excel Lab screenshot | Schema description repeats handoff §10; Svei approves every image in Phase 5. |

---

## 7. Session handoff

- **Planning is done; implement in Sonnet**, one sub-phase per session (or
  several per session while context allows), in order 4.0 → 4.6.
- Each session: read handoff.md §11 (code style) and §12, this file's §1, §2.3
  and its sub-phase, and append numbered entries to `notes.md` (currently at
  82).
- Never run `git add` / `git commit` — hand Svei the command, **chained with
  `;` for PowerShell**.
- Return to Opus if Phase 5 starts (choosing and writing the 2-3 Excel Lab
  pieces and their outcome metrics is content judgment), or if anything here
  turns out wrong once real Sanity code exists.

Suggested commit messages:

```
phase-4-0-sanity-studio-scaffold
phase-4-1-sanity-schemas-structure-studio-deploy
phase-4-2-sanity-data-layer-client-queries-typegen
phase-4-3-work-from-sanity-seed-projects
phase-4-4-excel-lab-from-sanity-detail-route
phase-4-5-site-settings-drive-shared-copy
phase-4-6-webhook-revalidation-retire-projects-json
```

---

## 8. Addendum — sub-phase 4.0 as actually executed (2026-10-12)

- **Project:** `b0kesagv`, named "portfolio", dataset `production`, public.
  `c9ny14fn` (given first) is **someone else's project** — it answers on
  Sanity's public API but is not in Svei's account. Never use it.
- **The login must match the one used on sanity.io/manage.** Svei's CLI was
  logged in with GitHub while the project was created under his Gmail login
  (Sanity treats them as two users). Fix: `npx sanity@latest logout` then
  `npx sanity@latest login` with the right provider; confirm with
  `npx sanity@latest projects list`.
- **Scaffold in a neutral directory, then move it in.** Running
  `sanity init` / `create-sanity` from the repo root fails with
  `Failed to read "studio/package.json"` because the root is a Next.js app and
  the CLI switches flows. Working recipe: scaffold into an empty folder
  outside the repo with `sanity init --project b0kesagv --dataset production
  --template clean --typescript --output-path studio --package-manager npm
  --no-git --yes`, copy the folder (minus `node_modules`) to `<repo>/studio`,
  then `npm install` inside it.
- **Project ID is hard-coded** in `studio/sanity.config.ts` and
  `studio/sanity.cli.ts` as the CLI generated it (it is not a secret). The plan's
  `SANITY_STUDIO_*` env-var step is dropped; the website still reads
  `NEXT_PUBLIC_SANITY_PROJECT_ID` (step 4.2).
- **Studio `npm audit` shows 18 findings** (chokidar/braces/micromatch/js-yaml
  inside Sanity's own CLI tooling). Editor-only, never shipped to visitors,
  fixable only upstream; do not run `npm audit fix --force`. The site's own
  `yarn audit` is the one that must stay at 0.
