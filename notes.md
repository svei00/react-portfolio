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
