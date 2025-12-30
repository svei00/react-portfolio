# Portfolio Build Notes

> This is Svei's original build log for portfolio.excelsolutionsv.com,
> kept as the running source of truth for how the project was set up.
> Converted from notes.txt to notes.md. New steps from later phases
> should be APPENDED below, numbered on from where the original log
> left off — never delete or renumber the original entries.

## Original build log

01. npx create-react-app react-portfolio --Install React App with create-react-app. In this case react-portfolio.
02. npm i @emailjs/browser --We'll use it to implement the contact form without installing a dedicated server.
03. npm i @fortawesome/free-brands-svg-icons --To install the fonts that we'll use in the project.
04. npm i @fortawesome/free-solid-svg-icons --To install the fonts that we'll use in the project/for navigation on the left side.
05. npm i @fortawesome/react-fontawesome --To use Font-awesome in react
06. npm i animate.css --CSS library to animate objects and fonts.
07. npm i gsap-trial --We use the trial version in order to do not use any account.
08. npm i loaders.css --A package for loader. We're using it to add a packman.
09. npm i react-leaflet --A package for using maps in our contact site.
10. npm i react-loaders --A complement/integration for loaders.css
11. npm i react-router-dom --Package to navigate throug three pages.
12. npm i sass --To write less CSS code
15. npm i --save-dev --save-exact prettier --Install prettier to format the code, remember the --save-dev is only for the developer
14. Load if not the project into vscode.
15. Add .prettierrc file wit the following configuration:
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": false,
    "singleQuote": false
16. Change the name of App.css to App.scss and change the import on App.js
17. Add assest folder.
18. For SEO (Meta data) use react-helmet.
    Install npm i react-helmet or via yarn: yarn add react-helmet
19. Deploy via Netlify with command line (CLI)
    a. Install Webpack via npm: npm i --save-dev webpack webpack-cli or via yarn yarn add webpack webpack-cli
    b. Create a file in root called webpack.config.js
    c. Install the following configuration.
        const path = require('path')
        const HtmlWebpackPlugin = require('html-webpack-plugin')
        const { CleanWebpackPlugin } = require("clean-webpack-plugin");
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
        const TerserPlugin = require("terser-webpack-plugin");
        const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

        module.exports = {
            entry: ['./index.js'],
            output: {
                filename: '[name].[contenthash].js',
                path: path.resolve(__dirname, "dist"),
                assetModuleFilename: 'assets/[hash][ext][query]'
            },
            plugins: [
                new MiniCssExtractPlugin({ filename: "[name].[hash].css" }),
                new CleanWebpackPlugin(),
                new HtmlWebpackPlugin({ template: './index.html' })
            ],
            module: {
                rules: [
                    {
                        test: /\.html$/,
                        use: ["html-loader"]
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {},
                            },
                            'css-loader',
                        ],
                    },
                    {
                        test: /\.(svg|png|jpg|gif)$/,
                        type: 'asset/resource'
                    }
                ],
            },
            optimization: {
                minimizer: [
                    new CssMinimizerPlugin(),
                    new TerserPlugin()
                ]
            },

        }
    d. Install dependecies:
       npm i --save-dev html-webpack-plugin clean-webpack-plugin mini-css-extract-plugin mini-css-extract-plugin  mini-css-extract-plugin terser-webpack-plugin css-minimizer-webpack-plugin css-loader html-loader
    e. Create a file in root called index.js and import all the javascript files
    f. Into index.js file import all the CSS files too.
    g. On package.json scripts write:
       - "build-webpack": "webpack --mode production"
       - then in the terminal npm run build-webpack

### References
* https://www.youtube.com/watch?v=ESHaail1eGc&t=0s
* https://www.youtube.com/watch?v=I2TNlHVJ9KQ
* https://www.youtube.com/watch?v=YnHsgQkY6Z4
* https://www.youtube.com/watch?v=3yD6Mwx6i0Q&t=2s
* https://codesandbox.io/s/br6fy — similar to Sloboba
* https://7zm9j.csb.app/works — similar as above
* https://rp2ms.csb.app/#/skills — interesting one, but too simple
* https://madox2.github.io/react-tagcloud/ library
* https://search.google.com/test/mobile-friendly — to test SEO
* https://www.youtube.com/watch?v=OGoPhwK_P_Q — Helmet SEO metadata
* https://www.academia-x.com/products/herramientas-frontend/categories/2148185847/posts/2149982621
* https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
* https://stackoverflow.com/questions/63414434/react-serve-s-build-the-term-serve-is-not-recognized-as-the-name-of-a-cmdlet
* https://stackoverflow.com/questions/56694075/react-app-showing-page-with-404-the-requested-path-could-not-be-found-when-usi
* https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook — disable exhaustive-deps
* https://www.youtube.com/watch?v=fQIerHqB71w — star rating
* https://medium.com/programming-essentials/how-to-create-a-star-rating-component-with-react-hooks-1b31b98df99a — star rating React
* https://dev.to/eveporcello/refactoring-the-starrating-component-with-react-hooks-5c79 — star rating React

## Audit-prep findings (added before the Fable session)

- **Animation library identified:** `gsap-trial`, installed specifically
  "in order to do not use any account" (step 07). This is GSAP's old
  trial/bonus-plugin package from before GSAP's licensing changed — it
  unlocked Club GreenSock-only plugins for a limited/watermarked trial
  without a paid membership. This is very likely the "free to use, but
  you have to pay once you publish" library Svei couldn't recall the
  name of.
- **Important update:** GSAP has been 100% free for ALL use, including
  commercial and published sites, since April 2024 — the Club
  GreenSock paid tier no longer exists. So the fix is not necessarily
  "replace the library," it may simply be "swap `gsap-trial` for the
  standard `gsap` package" to shed the legacy trial constraints and
  gain full access to every plugin for free. This must be verified and
  actioned in the Fable session.
- **Deploy target mismatch:** the original notes document a Netlify +
  custom Webpack deploy pipeline (step 19), but the site is currently
  live on Vercel at portfolio.excelsolutionsv.com. The Webpack config
  in these notes may be dead/unused if Vercel is building straight
  from `react-scripts` — needs confirming in the Fable session so the
  Node 20 migration plan targets what's actually running the build.
- **CRA confirmed as likely base:** `npx create-react-app` in step 01
  matches the CRA fingerprint already detected on the live page
  ("You need to enable JavaScript to run this app"). CRA is
  effectively unmaintained upstream — relevant to both the Node 20
  migration and the broader stack-currency audit.

## Fable audit session — 2026-08-16 (Phase 0)

20. Full A-to-Z audit performed (analysis only, no code changed). Findings,
    decisions and the phased roadmap written to `handoff.md` at repo root —
    that file is the spec for the implementation sessions (Sonnet 5 / Opus 4.8).
21. Key verified corrections to earlier assumptions: `gsap-trial` is installed
    but 100% UNUSED (all GSAP code commented out in Home/Logo) — fix is removal,
    then reintroduce standard free `gsap` in the redesign phase. The Netlify +
    Webpack pipeline (webpack.config.js, root index.js, _redirects) is confirmed
    dead — Vercel builds via react-scripts.
22. New findings not in the original log: a Firebase v9 app (`src/firebase.js`,
    /dashboard admin panel, Portfolio reads Firestore at runtime) exists and was
    never logged here; a GreenSock auth token is committed in `.npmrc` (public
    repo — security finding S1 in handoff.md); npm audit reports 36
    vulnerabilities (1 critical via firebase). Decisions made with Svei: drop
    Firebase, migrate CRA→Next.js, separate personal brand (navy/gold/silver
    palette), Sanity as CMS, small curated Excel Lab section.

## Phase 1 — Security triage + dead-weight removal

23. Branch `phase-1-security-cleanup` created off `main`. Removed the leaked
    GreenSock auth token line from `.npmrc` (S1) — the token had been sitting
    committed in this public repo. Kept the `@gsap:registry` line for now since
    `gsap-trial` is still installed; both the registry line and the package
    itself get removed together in a later Phase 1 step. History-purge decision
    (git filter-repo to scrub the token from past commits) is still open —
    flagged back to Svei rather than decided unilaterally, since the token has
    little live value now that Club GreenSock no longer exists, but the repo
    being public means it's technically exposed in history either way.
24. Svei locked down Firebase console rules for `portfolio-dashboard-c2761`
    (S2 interim mitigation): Firestore rules set to deny all read+write,
    Storage rules set to deny all read+write.
25. Removed Firebase from the codebase entirely: deleted `src/firebase.js`,
    `src/components/Dashboard/` (index.js + home.js), `src/components/Login/`.
    Removed the `/dashboard` route and its import from `src/App.js`. Portfolio
    page (`src/components/Portfolio/index.js`) no longer fetches from
    Firestore at runtime — it now imports a static `src/content/projects.json`
    seeded with the one confirmed-real entry (Excel Solutions, image asset
    verified present at `public/portfolio/1/LogoExcelTrim.png`), URL upgraded
    to https. Removed the now-dead `<Link to="/dashboard">` button that used to
    sit at the bottom of the portfolio grid. Uninstalled the `firebase` npm
    package (this alone should resolve the audit's one critical `protobufjs`
    vulnerability, S3). `npm run build` verified compiling clean after the
    change. `src/data/portfolio.json` (the old stale placeholder with two
    duplicate entries) is superseded by `src/content/projects.json` and is
    slated for deletion in the dead-code-removal step, not yet done.
26. Lockfile note: this repo standardizes on `yarn.lock` (tracked in git,
    real install history). Running `npm uninstall firebase` unexpectedly also
    rewrote `yarn.lock` in place (both files got new mtimes in the same
    second) and generated an untracked `package-lock.json`. Diffed the
    yarn.lock change — it only reflects the expected dependency-graph shrink
    from removing firebase, nothing suspicious added. Deleted the generated
    `package-lock.json` and added it to `.gitignore` so this repo does not
    end up with two competing lockfiles (which would make Vercel's
    package-manager auto-detection unpredictable). Going forward, prefer
    `yarn` commands over `npm` in this repo when yarn is available locally.
27. Process change mid-phase: per Svei's instruction, dropped the
    branch-per-phase git workflow for now — the `phase-1-security-cleanup`
    branch was merged straight into `main` (fast-forward, no divergence) and
    deleted. Phase 1 work continues directly on `main` from here.
28. Dead-weight removal pass: deleted the dead Netlify/Webpack pipeline
    (`webpack.config.js`, root `index.js`, `public/_redirects`, the
    `build-webpack` script, and all 9 webpack-only devDependencies:
    clean-webpack-plugin, css-loader, css-minimizer-webpack-plugin,
    html-loader, html-webpack-plugin, mini-css-extract-plugin,
    terser-webpack-plugin, webpack, webpack-cli); uninstalled `gsap-trial`
    and deleted `.npmrc` entirely (nothing left needs the GreenSock registry
    now that the trial package is gone); deleted the `/rating` route and its
    component (`src/components/Projects/Rating/`), the tutorial loop
    exercises (`src/components/Projects/Practices/`), `src/Notes.txt`, root
    `notes.txt`, CRA leftovers (`src/logo.svg`, `public/react-logo192.png`,
    `public/react-logo512.png`, `public/react.ico`), the default
    `src/App.test.js`, and the superseded `src/data/portfolio.json`.
    `npm run build` verified clean after all removals. Re-ran `npm audit`
    (temporary lockfile, not committed — this repo uses yarn.lock): 74
    vulnerabilities remain (5 critical, 35 high, 19 moderate, 15 low), but
    the earlier Firebase-only critical (`protobufjs`) is gone, and every
    remaining critical (`@babel/traverse`, `form-data`, `shell-quote`,
    `webpack`, `websocket-driver`) traces back to `react-scripts`
    5's own build-time toolchain (webpack-dev-server et al), not runtime
    code shipped to users. Matches handoff.md's expectation exactly — fully
    resolved only by the Phase 2 Next.js migration, not chased further here.
29. Node version correction: a Vercel build log Svei shared showed the actual
    error — `Found invalid or discontinued Node.js Version: 18.x` (not 20.x
    as handoff.md had guessed) — `Please set Node.js Version to 24.x`. Vercel
    has moved its minimum past what handoff.md originally targeted (Node 22),
    so every Node-version reference in handoff.md was corrected from 22 to
    24. Added `"engines": { "node": ">=24 <25" }` to `package.json`. Local
    Node here is already v24.18.0 and every build this session has run on
    it cleanly, so no local action needed. Vercel dashboard still needs
    Project Settings → Build & Development → Node.js Version set to 24.x —
    that's a dashboard action only Svei can do.
30. Contact page privacy fix (S4) + EmailJS/Leaflet cleanup (S7, S8):
    replaced the exact home-coordinate map marker `[34.13950, -117.30796]`
    (zoom 15, popup "Iván lives here!!") with San Bernardino's public
    city-center coordinates `[34.1083, -117.2898]` at city-level zoom 11 and
    a neutral "San Bernardino, CA" popup; dropped the zip code from the
    on-page address text (now city-level only, no street/zip). Removed the
    duplicate EmailJS CDN `<script>` + the malformed `emailjs.init` call
    from `public/index.html` (npm's `@emailjs/browser`, already used in
    Contact/index.js, is now the only EmailJS load). Removed the Leaflet
    1.7.1 CDN stylesheet from `public/index.html` and imported
    `leaflet/dist/leaflet.css` from the npm package (now 1.9.3, matching
    installed `leaflet`/`react-leaflet`) directly in Contact/index.js.
    Fixed two typos encountered in the same file while editing (`descriprion`
    -> `description` meta attribute, `United Stetes` -> `United States`) —
    the rest of the typo sweep (Sidebar's four `_blnak` instances, etc.) is
    still a separate pending step. `npm run build` verified clean; CSS
    bundle grew ~6KB since Leaflet's CSS is now bundled instead of loaded
    externally, which is expected and desired (fewer external requests).
31. Typo sweep across all pages: fixed `descriprion` -> `description` in
    Skills/index.js (Contact's copy was already fixed in the previous step);
    `Skills & Experiencie` -> `Skills & Experience`, `experiencie` ->
    `experience`, `Fron-end` -> `Front-end` (Skills); `knoledge` ->
    (rewritten), `technologie` -> (rewritten), `enviroment` -> `outdoors`,
    and `I can explode all my qualifications` -> `I can apply my skills
    fully` (About — matches handoff.md's suggested rewrite exactly); all
    four `target='_blnak'` -> `target='_blank'` in Sidebar (S9). Rewrote the
    keyword-stuffed meta descriptions in `App.js` (the same city list
    pasted twice into `description`, `og:description`, and
    `twitter:description`) as one honest sentence: fullstack engineer in
    the Inland Empire, California, building React apps. `npm run build`
    verified clean.
32. Contact map refined per Svei's feedback: he no longer lives in San
    Bernardino, so the map/address were updated to a general Southern
    California framing instead of naming a specific city. Marker moved to a
    neutral central-Inland-Empire point near Ontario, CA
    `[34.0633, -117.6509]`, zoomed out further (zoom 9) to read as regional
    rather than a home pin; popup changed to "Open to remote & Southern
    California" (his pick, doubles as an availability signal); the
    on-page address text below the form now reads "Southern California"
    instead of a named city. Map itself stays (Svei confirmed keeping it,
    just wanted it decoupled from any specific address). `npm run build`
    verified clean.
33. Rewrote `README.md` per handoff.md 4.11: dropped all CRA boilerplate and
    the garbled `carolina-portfolio` lines from wherever the repo was
    originally cloned. New content: title, live link, truthful tech stack
    (React 18/CRA today, Next.js migration flagged as planned), real local
    dev commands using `yarn` (matching the yarn.lock-is-canonical decision
    from step 26), a deploy note, and pointers to `handoff.md`/`notes.md`.
    This closes out every Phase 1 task except the Vercel dashboard Node
    version change, which only Svei can do.
34. Phase 1 exit-criteria check against handoff.md §7: Firebase code is
    fully gone (criterion met); no secrets in the working tree (criterion
    met — `.npmrc` deleted); all listed typos fixed (criterion met). The
    `npm audit` criterion needs a caveat — handoff.md expected "no critical
    advisories" with only highs left over as react-scripts transitives, but
    the current audit shows 5 criticals, and all 5 trace to react-scripts'
    own build-time toolchain (babel, form-data, shell-quote, webpack,
    websocket-driver), not to anything Phase 1 controls — the CVE landscape
    for that toolchain has simply gotten worse since handoff.md was
    written. Chasing this further on CRA means `npm audit fix --force`,
    which handoff.md explicitly forbids (it downgrades react-scripts to
    0.0.0). This is structurally the same situation handoff.md already
    planned for — fully resolved only by dropping CRA in Phase 2 — the
    letter of the exit criterion just no longer matches reality typed a
    while back. Flagged to Svei rather than silently marking it done.
35. Ran the full audit at Svei's request (temporary lockfile, discarded
    after). Found one fixable issue that actually matters: `react-router-dom`
    (a direct runtime dependency, shipped to the browser — unlike the 5
    build-time-only criticals) had a high-severity XSS-via-open-redirect
    advisory, fixed in `6.30.4`, which is within the existing `^6.3.0`
    semver range. Bumped `package.json` to `"react-router-dom": "^6.30.4"`
    and installed it — a normal semver-compatible dependency update, not a
    `--force`/breaking change. `npm run build` verified clean; audit total
    dropped from 74 to 73 vulnerabilities, the 35 highs dropped to 32. The 5
    remaining criticals are unchanged and are all react-scripts build-time
    toolchain (babel, form-data, shell-quote, webpack, websocket-driver) —
    same conclusion as step 34, only resolved by the Phase 2 migration.

## Phase 2 — Architecture planning (Opus 5 session, 2026-08-17)

36. Opus 5 session: planned the Next.js migration. No application code was
    changed. Output is `phase-2-plan.md` at repo root — the implementation
    spec for the Sonnet session that follows. Version targets were checked
    against the live npm registry rather than taken from handoff.md, which
    had drifted: Next.js is now **16.3.1** (handoff.md said 15), React
    **19.2.8**, and `react-leaflet` must go to **5.x** because v4 does not
    support React 19. Peer-dependency checks cleared `react-tagcloud`
    (react >=16.8.0) and `react-loaders` (react >=15) for React 19 — both
    only need to survive Phase 2 since Phase 3 retires them.
37. Decisions settled with Svei during planning: (a) the port is written in
    **TypeScript** — handoff.md had left this open as "optional but
    recommended", and the codebase is small enough that the cost is minimal
    while Phase 4 Sanity TypeGen benefits; (b) **EmailJS moves behind a
    Next.js route handler** rather than staying client-side — handoff.md S6
    called this optional, but the contact form is being rewritten in this
    phase anyway, so keeping it client-side would mean writing the same form
    twice. One VERIFY item attached: confirm EmailJS server-side REST
    sending is free-tier before committing to it, with the client SDK as a
    documented fallback.
38. Deliberate deviation from handoff.md recorded in `phase-2-plan.md` §4.1:
    **SCSS Modules are deferred from Phase 2 to Phase 3.** The survey found
    that `src/components/Layout/index.scss` styles `.about-page`,
    `.contact-page`, `.portfolio-page` and `.skills-page` — class names
    applied in four *other* components' JSX — along with all their
    descendant h1/p/.text-zone typography and the responsive block. CSS
    Modules scoping breaks exactly that pattern, so converting during Phase
    2 means hand-untangling shared typography and touching every className
    in every file, in the same phase that swaps the framework, with a
    visual-parity check that is hard to verify by eye. Since Phase 3
    rewrites nearly all ~1,100 SCSS lines from scratch anyway (new palette,
    type scale, and it retires the cube, Pacman loader, tag cloud and
    sidebar), Modules written in Phase 2 would just be deleted one phase
    later. Phase 2 therefore ports the stylesheets as global SCSS.
39. Other findings folded into the plan rather than actioned now: only 6 of
    the 22 files in `src/assets/images/` are actually referenced (the four
    `Screenshot_*.jpg`, 291/118/84/55 KB, are entirely dead); the Helvetica
    Neue `@font-face` declares `format('ttf')`, which is not a valid format
    keyword, so that font is almost certainly not loading on the live site
    today; and the `$primary-color`/`$secondary-color`/`$terciary-color`
    variables in `App.scss` are dead — no component stylesheet references
    them. Also flagged: since Svei dropped the branch-per-phase workflow,
    the migration must be done locally and **not pushed until it builds and
    passes a page-by-page parity check**, because Vercel auto-deploys every
    push to `main` and a half-migrated repo is a broken live site.

## Phase 2 — Implementation (Sonnet 5, working from phase-2-plan.md)

40. Svei confirmed Vercel dashboard is now on Node 24.x (closes out the last
    Phase 1 loose end).
41. Step 1 (scaffold): installed `next@16`, `react@19`, `react-dom@19`,
    `typescript`, `@types/node`, `@types/react`, `@types/react-dom`.
    Uninstalled the CRA-only packages: `react-scripts`, `react-router-dom`,
    `react-helmet`, `web-vitals`, and all three `@testing-library/*`
    packages. Bumped `react-leaflet` to `^5.0.0` (v4 does not support React
    19 — confirmed during planning) and `@fortawesome/react-fontawesome`
    from the pinned `0.2.0` to `^3.5.0` (that package jumps straight from
    0.2.x to 3.x, no 1.x/2.x releases — the `<FontAwesomeIcon>` API used in
    this codebase, icon/color/size/className/onClick, is stable across that
    jump). `package.json` scripts changed to `next dev` / `next build` /
    `next start`; removed the CRA-specific `eslintConfig` block (referenced
    `react-app`, which no longer exists) and the `eject` script. Removed the
    now-superseded CRA entry files: `src/index.js`, `src/App.js`,
    `src/reportWebVitals.js`, `src/setupTests.js`, `public/index.html`.
    Added `tsconfig.json` (with the `@/*` -> `src/*` path alias),
    `next-env.d.ts`, and a minimal `next.config.ts` (security headers land
    in a later step, once every route exists to verify a CSP against).
    **Expected state right now: the app does not build.** There is no
    `app/` directory yet — that starts next chunk. This is intentional per
    phase-2-plan.md §7.1: work happens locally and nothing gets pushed
    until the full migration builds and passes parity (step 14).
42. Steps 2-3 (global styles + fonts): created `src/styles/fonts.ts` using
    `next/font/local` for the three custom fonts (Helvetica Neue, La Belle
    Aurore, Coolvetica), each exposed as a `--font-*` CSS variable rather
    than trying to preserve the old literal family-name strings (that would
    have required `next/font` to fake arbitrary global family names, which
    it does not do). This also fixes the original `format('ttf')` bug on
    the Helvetica Neue face (not a valid CSS format keyword — that font was
    almost certainly never loading on the live CRA site). Created
    `src/styles/globals.scss` from the old `src/index.css` + `src/App.scss`
    — dropped the dead `.dashboard` rule (Firebase dashboard was removed in
    Phase 1) and the three unused `$primary-color`/`$secondary-color`/
    `$terciary-color` variables (nothing referenced them). `animate.css` and
    the pacman loader's `.scss` move to JS imports in the root layout
    (next chunk) instead of `@import '~loaders.css/...'`, since the
    webpack-only `~` alias does not resolve under Turbopack. Updated all 6
    literal `font-family: 'Coolvetica'` / `'coolvetica'` / `'La Belle
    Aurore'` occurrences across `Home/index.scss` and `Layout/index.scss`
    to reference the new CSS variables. Deleted `src/App.scss` and
    `src/index.css`, fully absorbed into the new files.
43. Steps 4-5 (root layout + Sidebar), plus the first real build checkpoint
    (start of step 6, Home only): built `src/app/layout.tsx` (renders
    Sidebar + the `.page`/`.tags` chrome that used to live in the CRA
    `Layout` component, root `metadata` with title template + OG/Twitter
    defaults), `src/components/sidebar/sidebar.tsx` (client component;
    `usePathname()` replaces react-router's `NavLink`, and in the process
    actually fixes the active-nav-icon highlight — the original used an
    `activeclassname` prop that react-router-dom v6 removed years ago, so
    it silently did nothing; hamburger/close icons became real
    `<button>`s per handoff.md §4.9), and the Home page
    (`src/components/home/home-view.tsx` + `logo.tsx`, `src/app/page.tsx`).
    Images stay as plain `<img src={imported.src}>` for now — proper
    `next/image` conversion is step 7, a separate pass across every page at
    once for consistency.
44. **Process note, worth remembering for the rest of Phase 2:** this
    filesystem is case-insensitive (confirmed by direct test). The first
    attempt at this step wrote the new lowercase `home/` and `sidebar/`
    component files, then ran `rm -rf` on the old PascalCase `Home`/
    `Sidebar` folders to clean up — but on a case-insensitive filesystem
    those are *the same directory*, so the new files had been written into
    the old folder the whole time, and the cleanup `rm -rf` deleted
    everything, new work included. Caught immediately because the
    subsequent build failed on "module not found," diffed against what
    should have existed, and rebuilt both components from scratch (Home's
    SCSS recovered from git history via `git show HEAD:...`, since it
    predated this session; everything else was retyped). No data was lost
    permanently, but the lesson stands for the four remaining pages
    (About, Skills, Portfolio, Contact) which have the exact same
    PascalCase-to-kebab-case rename ahead of them: **delete the old folder
    before writing the new one, never after, whenever the names differ
    only by case.**
45. Two build-blocking issues fixed, neither anticipated in
    phase-2-plan.md because they're specific to this exact toolchain
    version: (a) TypeScript resolved to **7.0.2** — not 5.x — and TS 7
    outright removed the `baseUrl` compiler option (the error names its own
    fix: rely on `paths` alone, resolved relative to the tsconfig file,
    with no `baseUrl` present). Removed it from `tsconfig.json`; the `@/*`
    alias still resolves correctly. (b) `react-loaders`' bundled type
    definitions mark `active: boolean` as a required prop on `<Loader>`,
    even though the original untyped CRA usage (`<Loader type='pacman' />`)
    never passed it. Added `active` explicitly in the new
    `pacman-loader.tsx` wrapper to satisfy the type and preserve identical
    always-on runtime behavior. Also fixed a Sass deprecation warning
    (`#{$i / 10}` division outside `calc()`) in `animated-letters.scss`
    using `math.div()` while touching that file.
46. First verified build checkpoint: `next build` compiles clean, `/` is
    statically generated, and `next start` was checked in the browser —
    correct page title, zero console errors, every asset (both custom
    fonts including the previously-broken `.ttf`, all images, all JS/CSS
    chunks) returned 200. Home is confirmed working end-to-end before
    continuing to the remaining four pages.
47. Ported About (`src/components/about/`) and Skills
    (`src/components/skills/`) using the same server-page/client-view
    split as Home. Installed `@types/react-tagcloud` (the package itself
    ships no types). About's meta description updated from "San Bernardino
    California" to "Inland Empire, California" to match the regional
    framing already established site-wide in Phase 1.
48. **Real bug, not a bundler quirk: React 19 removed `defaultProps`
    support for function components.** `react-tagcloud`'s `TagCloud` is a
    plain function component that relies entirely on `defaultProps` for
    `containerComponent` ('div'), `shuffle` (true), and `className`
    ('tag-cloud') — none of which were ever passed explicitly in the
    original CRA usage, because they didn't need to be under React 18.
    Under React 19, `props.containerComponent` came through as `undefined`
    (defaults silently no longer applied), so the library's own
    `React.createElement(Container, ...)` call became
    `React.createElement(undefined, ...)` — exactly React error #130,
    "Element type is invalid ... got: undefined". This took real digging to
    pin down: the error pointed at `TagCloud` and looked exactly like a
    module-resolution/bundler interop bug (undefined import), so a lot of
    the investigation went down that path first (dynamic import with
    ssr:false, deep-path imports bypassing the package's index.js,
    confirming via debug logging that the module namespace genuinely had a
    working `TagCloud` getter at both server and client) before the actual
    cause — defaultProps evaporating, not the import itself — became clear
    from reading the package's compiled source directly. Fixed by passing
    `containerComponent`, `shuffle`, and `className` explicitly as props
    (the `@types/react-tagcloud` package doesn't declare
    `containerComponent`, so it needs a narrow `as Record<string, unknown>`
    spread to satisfy TypeScript). **Worth remembering for the rest of this
    migration:** any other unmaintained pre-React-19 class-free component
    library still in the dependency tree (`react-loaders` is a class
    component, so it's not at risk the same way) could hit this same
    failure mode if it leans on `defaultProps` — if a similarly-shaped
    "element type is invalid" error shows up again, check for
    `defaultProps` on a function component before assuming it's a bundler
    problem.
49. Also hit, unrelated to the above: the Claude Browser tool's
    `read_console_messages` returned byte-identical stale output across
    multiple navigations and even after closing the tab — turned out a
    stray Next.js server process was still bound to port 3000 underneath a
    fresh one (Windows `taskkill` needed the literal PID from `netstat`,
    not a pgrep-style name match, which doesn't work the same way under
    Git Bash). Confirmed the console tool was truly stale (it was showing
    dev-only HMR/WebSocket log lines from a `next start` **production**
    session, which doesn't run HMR at all) and resolved it by opening a
    genuinely new browser tab (`tabs_create`) rather than trusting
    `preview_start`'s tab reuse.
50. Ported Portfolio (`src/components/portfolio/`, `src/types/project.ts`
    for the shared `Project` type). `app/portfolio/page.tsx` is a Server
    Component that imports `src/content/projects.json` directly and passes
    it down as a prop — matches phase-2-plan.md §6 step 10's intent of
    keeping the data-source boundary clean for the Phase 4 Sanity swap.
    Removed the dead `.loginDashboard` SCSS rule (the Firebase dashboard
    link it styled was deleted back in Phase 1).
51. Verified EmailJS server-side REST sending before committing to the
    route-handler architecture from phase-2-plan.md (the plan flagged this
    as a required check): public docs list "Email API" as available on
    every pricing tier including Free, and non-browser API access is a
    togglable account setting, not a paid-only gate — reasonable confidence
    from public sources, though not 100% certain without Svei's own
    dashboard. Proceeding with the route handler; flagged the one
    remaining unknown (the "Allow EmailJS API for non-browser
    applications" toggle in Account > Security) as an action item for him.
52. Ported Contact — the biggest page. `src/app/api/contact/route.ts`: a
    Next.js Route Handler that posts to EmailJS's REST API server-side
    using a private key read from `EMAILJS_PRIVATE_KEY` (never committed —
    `.env.example` documents the four required vars), with a honeypot
    field check and an in-memory 30-second per-IP throttle (handoff.md
    S6). `contact-form.tsx`: real `<ul>` wrapping the `<li>` fields (fixes
    the invalid markup from handoff.md §4.1), a visually-hidden `.sr-only`
    `<label>` per input (new utility class in globals.scss — accessibility
    fix, no visual change), a hidden honeypot field, and inline
    success/error status text replacing the original `alert()` +
    `window.location.reload(false)` (handoff.md Phase 2 step 4).
    `contact-map.tsx`: `react-leaflet` 5, dynamically imported with
    `ssr: false` from the client `contact-view.tsx` (dynamic-with-ssr:false
    cannot be called from a Server Component — this is why the map isn't
    imported directly in `app/contact/page.tsx`).
53. Two real runtime bugs surfaced and fixed while verifying Contact in the
    browser (both would have shipped broken otherwise):
    - Leaflet's default marker icon resolves its image URLs relative to
      the CSS file, which breaks under every bundler ("iconUrl not set in
      Icon options"). The standard fix — importing the marker PNGs as JS
      modules and pointing `L.Icon.Default.mergeOptions` at them — did not
      resolve correctly here, seemingly because the images live inside
      `node_modules/leaflet/dist/images/` rather than under `src/`. Fixed
      by copying the three default marker images into
      `public/leaflet/` (committed as static assets) and pointing
      `iconUrl`/`iconRetinaUrl`/`shadowUrl` at plain `/leaflet/*.png`
      paths instead.
    - `@types/leaflet` and `@types/react-tagcloud` both had to be
      installed separately — neither `leaflet` nor `react-tagcloud` ships
      its own type declarations, and TypeScript's `strict: true` mode
      fails the build on untyped imports rather than silently treating
      them as `any`.
    Uninstalled `@emailjs/browser` (the client-side EmailJS SDK) since
    sending now happens through the route handler. `next build` produces
    all 5 routes clean (`/`, `/about`, `/skills`, `/portfolio`, `/contact`
    static; `/api/contact` correctly dynamic), and every page was checked
    in the browser on a fresh tab with zero console errors. **Phase 2 step
    6 (porting all five pages) is now complete.**
54. Step 7 (images to `next/image`): converted every remaining `<img>` to
    `next/image` — the three Home hero letters (`priority`, since they're
    the LCP element per phase-2-plan.md §6 step 7), the two absolutely
    positioned Excel logo images in `Logo` (`fill`, matching the existing
    `position: absolute; width: 100%` CSS exactly), the two Sidebar logos
    (explicit `sizes` matching their small fixed CSS width so Next doesn't
    fetch an oversized responsive breakpoint), and the dynamic Portfolio
    project image (`fill`, with the original onError-swaps-to-fallback
    behavior reimplemented as component state, since next/image doesn't
    allow mutating `src` directly from an onError callback the way a plain
    `<img>` does). Deleted the 22 unused files in `src/assets/images/` —
    only 6 were ever referenced in code (confirmed by grep before
    deleting): the three CRA/tutorial 3D letters, the two Excel logos, and
    the sidebar sub-logo. That includes the four `Screenshot_*.jpg` files
    (291/118/84/55 KB, entirely dead weight) and the unused `LogoExcelv2_*`
    set. `next build` verified clean, and Home/Portfolio/Contact were all
    re-checked in the browser — every image now resolves through Next's
    `/_next/image` optimizer with zero console errors.
55. Correction to this log itself: entry 42 (global styles + fonts) had
    been appended at the end of the file instead of its correct
    chronological position between 41 and 43 — an editing mistake within
    this same session, not a rewrite of settled history, so fixed by
    moving the block into place rather than left standing. Numbering 40-53
    is now sequential with no gaps or duplicates.
56. Step 11 (security headers): added `headers()` to `next.config.ts` —
    HSTS, `X-Content-Type-Options: nosniff`,
    `Referrer-Policy: strict-origin-when-cross-origin`,
    `X-Frame-Options: DENY`, a restrictive `Permissions-Policy`, and CSP in
    **report-only** mode (handoff.md S5, phase-2-plan.md §6 step 11 — moves
    to enforcing in Phase 6 once report-only has run live with no
    surprises). Deliberately no nonces: that would force every route
    dynamic, defeating the static generation this migration exists to
    deliver. Verified all headers present with `curl -I` against a real
    `next start` server.
57. Step 12 (SEO files): `app/robots.ts` (same permissive policy as the old
    `public/robots.txt`, now actually pointing at a sitemap — it pointed at
    none before, handoff.md §4.8), `app/sitemap.ts` (all 5 routes),
    `app/manifest.ts` (the old `public/manifest.json` was untouched CRA
    boilerplate — literally "short_name": "React App" — this is the first
    real manifest the site has had), and `app/opengraph-image.tsx` using
    `next/og` for a generated (not static-asset) branded image, since the
    site has no finalized brand palette yet — that's Phase 3 — so this
    uses the current live colors and is trivial to regenerate once the
    real palette lands. Added `alternates.canonical` to all 5 pages.
    Deleted the now-superseded `public/manifest.json` and
    `public/robots.txt`. Verified all of `/robots.txt`, `/sitemap.xml`,
    `/manifest.webmanifest`, and the response headers directly via curl
    against a real server — all correct.
58. Step 13 (final cleanup): removed the empty leftover
    `src/components/Projects/` directory (its contents were already
    deleted in Phase 1) and the stale local `build/` folder from before
    the migration (untracked — CRA's old output dir, harmless but dead).
    Swept for remaining plain `<img>` tags, `console.log` debug leftovers,
    and a stray `package-lock.json` — none found.
59. **Sass was never actually bumped during this migration** —
    phase-2-plan.md's verified target was 1.102.0, but `package.json`
    still said `^1.54.8` through every step up to this point. Caught it
    only via the `npm audit` re-run below: an outdated `sass@1.56.1`
    pulled in `chokidar` → `braces`/`picomatch`, plus its own `immutable`
    dependency, all 3 flagged high severity. Bumped `sass` to latest
    (`^1.103.1`) directly rather than patching the transitives — `npm
    audit` went from 3 high to **0 vulnerabilities, zero of any
    severity**. `next build` re-verified clean after the bump.
60. Step 14, full verification pass:
    - `next build`: clean, all 10 routes present (5 pages + `/api/contact`
      correctly dynamic + `/sitemap.xml` + `/robots.txt` +
      `/manifest.webmanifest` + `/opengraph-image`, everything else static).
    - Every one of the 5 pages hit fresh in the browser (`tabs_create` each
      time, learned earlier this session that tab reuse serves stale
      console history): zero console errors on all 5, only harmless
      Next.js route-prefetch "preloaded but not used" warnings.
    - Contact form tested end-to-end: filled and submitted, hit
      `/api/contact`, correctly got a 500 with "Email service is not
      configured" (expected — no `.env.local` in this environment) and
      displayed it inline with **no crash and no `alert()`** — confirms
      the whole client/server/error-state chain actually works, not just
      that it compiles.
    - `npm audit`: **0 vulnerabilities** (see step 59) — exceeds the "zero
      critical, zero high" exit criterion.
    - Compared against the live site (`portfolio.excelsolutionsv.com`,
      still the pre-Phase-2 CRA build): same hero text, same structure,
      confirms no content regression.
    - Lighthouse mobile, run against both the new build and the live site
      for a fair baseline comparison (both via `next start` locally / the
      real live URL, not dev mode):
      | | Live (pre-Phase-2) | This build |
      |---|---|---|
      | Performance | 75 | **82** |
      | SEO | 100 | **100** |
      | Accessibility | — | **94** |
      | Best Practices | — | **100** |
      | LCP | 6.4s | **4.3s** |
      Real improvement, but performance lands at 82, short of the >=85
      target in phase-2-plan.md §8. Root cause identified via Lighthouse's
      LCP breakdown: the LCP element is the `<h2>` tagline, and ~4.2s of
      its delay is `elementRenderDelay` — traced to the **original**
      `animation-delay` choreography in `home.scss` (`h2 { animation:
      fadeIn 1s 1.8s backwards }` stacked on the `.container`'s own 1s
      delay). This CSS was ported byte-for-byte from the CRA source, not
      something Phase 2 changed — and per phase-2-plan.md's own "no
      redesign" mandate for this phase, it should not be changed here.
      handoff.md §8.3 already plans to retire this entire staggered-fade
      system in Phase 3's GSAP-based motion rework. **Recommendation:
      accept 82 for Phase 2 and let Phase 3 close the gap** — chasing it
      now would mean either redesigning the reveal animation (out of
      scope) or fighting a metric that's structurally tied to a system
      already scheduled for replacement.
    **Phase 2 is functionally complete.** Per phase-2-plan.md §7.1, still
    not pushed — that's Svei's call once he's reviewed this.
61. **Phase 3 planning session (Opus, 2026-08-21).** Produced
    `phase-3-plan.md` at repo root — the plan of record for Phase 3,
    superseding handoff.md §7 Phase 3 / §8 where the two disagree (§8 was
    written before the repo was on Next.js 16 and before Svei picked his
    reference portfolios). Phase 3 is divided into eight independently
    deployable sub-phases (3.0 foundations → 3.7 audit).
62. **Live-site incident found while planning, not previously recorded:
    `portfolio.excelsolutionsv.com` does not serve this repository.** DNS
    resolves to `75.2.60.5` (Netlify), the response carries
    `Server: Netlify`, and the HTML body is the **pre-Phase-1 CRA build** —
    it still contains the `unpkg.com/leaflet@1.7.1` CSS link (S8), the
    `cdn.jsdelivr.net/@emailjs/browser` script tag with the inline
    `emailjs.init(...)` key (S7), the keyword-stuffed meta description
    (§4.6), the CRA `manifest.json`, and none of the Phase 2 security
    headers. Phase 1 and Phase 2 are both pushed to `origin/main` but have
    never reached a user — every security fix in both phases is currently
    unshipped. There is no `.vercel/`, no `vercel.json` and no
    `netlify.toml` in the repo, so neither host's config is under version
    control. Svei's earlier Vercel failure ("didnt change the engine to
    nextjs") is consistent with a Vercel project created while the repo was
    still CRA: Vercel locks the Framework Preset at project-creation time
    and does not re-detect it when the repo's framework changes, so a CRA
    preset runs `react-scripts build` against a Next.js repo and fails.
    Resolution (Svei's decision this session): **move to Vercel**, with the
    dashboard steps written out in phase-3-plan.md §2. Netlify stays up but
    unpublished for about a week after the DNS cutover.
63. **VERIFY item (d) from handoff.md §12 closed: GSAP licensing
    re-checked at implementation time.** `gsap@3.15.0` publishes under the
    GSAP Standard "no charge" License, and **SplitText now ships inside the
    free public npm package** — confirmed by inspecting the published
    tarball's file list (`dist/SplitText.js`, `src/SplitText.ts`,
    `types/split-text.d.ts` all present). The paid Club GreenSock tier Svei
    originally feared (and which caused the `.npmrc` token leak, S1) no
    longer exists. `lenis@1.3.26` is MIT, `@gsap/react@2.1.2` follows the
    GSAP standard license. No private registry and no auth token is needed
    for any of the Phase 3 motion stack.
64. Decisions taken by Svei during the planning session, recorded so they
    are not re-litigated: (a) **typography is Fraunces (display, variable —
    its SOFT/WONK axes get animated during the hero reveal, which is the
    deliberately non-derivative part of the design) + General Sans (body,
    self-hosted from Fontshare)**; (b) **no under-construction page** — the
    substitute is that every sub-phase must leave `main` deployable and
    visually coherent, and the animated work he wanted goes into a branded
    404/error page plus the Excel Lab "coming soon" tile instead; (c) move
    hosting to Vercel; (d) add a **build stamp to the footer** (commit SHA
    + build date, read server-side from `VERCEL_GIT_COMMIT_SHA`, falling
    back to "local") so he can tell at a glance which build is actually
    being served — this is what the Netlify incident above cost him.
    Reference-portfolio calibration, in his ranking: Dennis Snellenberg
    first (but explicitly not its big icons), Lusion second (the playful
    hero type animation and featured-work reveal, not its WebGL), Cuberto
    third (its project showcase is the model for the Excel Lab section),
    Bruno Simon fourth and treated as the line not to cross. He raised
    "don't be a copycat" twice unprompted, so phase-3-plan.md §6 makes it
    an explicit take-the-principle / refuse-the-execution table.
65. Design decision worth flagging because it shapes the whole sub-phase
    ordering: **repaint first, rebuild second.** Sub-phase 3.0 repoints
    every hardcoded colour and font in the *existing* stylesheets at the
    new tokens before any layout changes, so the entire site becomes
    navy/gold/cream in the new type in one commit while layouts stay put.
    Every later sub-phase then upgrades one page. This is what makes "keep
    the live site working while redesigning" true without an
    under-construction page — there is never a commit where half the site
    is tutorial-blue and half is brand-navy.
66. Also settled during planning: **page transitions use React's
    `<ViewTransition>`**, not the hand-rolled GSAP covering wipe that
    handoff.md §8.3 imagined. Verified against the bundled Next 16 docs
    (`node_modules/next/dist/docs/01-app/02-guides/view-transitions.md`):
    it works in the App Router with no configuration, supports directional
    `transitionTypes` on `<Link>` and shared-element morphs by `name`, and
    degrades to an instant navigation where unsupported. The shared-element
    morph is what gives the `/work` index → case-study navigation the
    continuity effect Svei liked on Dennis's work page. One gotcha the docs
    call out and the implementer must respect: the `enter`/`exit` wrapper
    goes in each `page.tsx`, **never** in `layout.tsx`, because layouts
    persist across navigation and so their enter/exit never fire.
