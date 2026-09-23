// One-time import of the site's existing content into Sanity (phase 4.3).
//
//   Dry run (default; no token, writes nothing, shows exactly what it would do):
//     node scripts/seed-sanity.mts
//
//   Export the documents as NDJSON (to validate them offline against the Studio schema):
//     node scripts/seed-sanity.mts --ndjson > seed.ndjson
//     (then, from studio/:  npx sanity documents validate --file ../seed.ndjson)
//
//   Real run:
//     node --env-file=.env.local scripts/seed-sanity.mts --write
//
// What it does
//   - Creates one `project` document per entry in src/content/projects.json,
//     uploading the cover image from public/ when the file exists.
//   - Creates the `siteSettings` singleton from src/content/site-copy.ts.
//
// Safety rules (this script writes to the live dataset)
//   - NEVER overwrites. A project whose slug already exists is skipped, and
//     siteSettings is created only if absent (createIfNotExists), so anything
//     edited in the Studio is safe and the script can be re-run.
//   - Ordinary documents get Sanity-generated ids (no invented ids); only the
//     singleton uses a fixed id, as the Sanity best-practices skill requires.
//   - Needs SANITY_WRITE_TOKEN (an Editor token) in .env.local ONLY. Create it
//     at sanity.io/manage > API > Tokens, and DELETE it there as soon as this
//     has run. It is never printed and never committed (.env.local is
//     gitignored).
//
// This file deliberately has no dependency on the website's src/sanity/*
// modules: it builds its own client with the write token, because the website
// itself never holds one.

import {createClient} from '@sanity/client'
import {randomUUID} from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {SITE_COPY} from '../src/content/site-copy.ts'

const ROOT = path.resolve(import.meta.dirname, '..')
const WRITE = process.argv.includes('--write')

// ---- Building blocks (the exact shapes the Studio's plugin stores) ----------

const newKey = () => randomUUID().replace(/-/g, '').slice(0, 12)

// sanity-plugin-internationalized-array v5 stores [{_key, _type, language, value}].
const localizedString = (value: string) => [
  {_key: newKey(), _type: 'internationalizedArrayStringValue', language: 'en', value},
]
const localizedText = (value: string) => [
  {_key: newKey(), _type: 'internationalizedArrayTextValue', language: 'en', value},
]
const block = (text: string) => ({
  _key: newKey(),
  _type: 'block',
  style: 'normal',
  markDefs: [],
  children: [{_key: newKey(), _type: 'span', text, marks: []}],
})
const localizedBlocks = (paragraphs: readonly string[]) => [
  {
    _key: newKey(),
    _type: 'internationalizedArraySimpleBlockContentValue',
    language: 'en',
    value: paragraphs.map(block),
  },
]

// ---- Reading the existing content ------------------------------------------

type JsonProject = {
  title: string
  slug: string
  summary: string
  description: string
  coverImage: {src: string; alt: string}
  techStack: string[]
  liveUrl: string | null
  repoUrl: string | null
  featured: boolean
  orderRank: number
  platform: 'web' | 'mobile' | 'desktop'
  year: number
}

const projects: JsonProject[] = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'src/content/projects.json'), 'utf8'),
)

// public/portfolio/2/x.png is referenced as /portfolio/2/x.png in the JSON.
const coverFilePath = (project: JsonProject) => path.join(ROOT, 'public', project.coverImage.src)

// ---- Document builders ------------------------------------------------------

type UploadedAsset = {_id: string}

function buildProjectDocument(project: JsonProject, coverAsset: UploadedAsset | null) {
  return {
    _type: 'project',
    title: localizedString(project.title),
    slug: {_type: 'slug', current: project.slug},
    summary: localizedString(project.summary),
    description: localizedBlocks([project.description]),
    platform: project.platform,
    year: project.year,
    // Only attach a cover when the file really exists. A project without one
    // shows as invalid in the Studio (cover is required there), which is the
    // intended reminder to add it; the website shows a placeholder frame.
    ...(coverAsset && {
      coverImage: {
        _type: 'accessibleImage',
        image: {_type: 'image', asset: {_type: 'reference', _ref: coverAsset._id}},
        alt: localizedString(project.coverImage.alt),
      },
    }),
    techStack: project.techStack,
    ...(project.liveUrl && {liveUrl: project.liveUrl}),
    ...(project.repoUrl && {repoUrl: project.repoUrl}),
    featured: project.featured,
    orderRank: project.orderRank,
  }
}

function buildSiteSettingsDocument() {
  return {
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: SITE_COPY.name,
    title: localizedString(SITE_COPY.title),
    location: localizedString(SITE_COPY.location),
    email: SITE_COPY.email,
    positioningStatement: localizedBlocks(SITE_COPY.positioningStatement),
    aboutBody: localizedBlocks(SITE_COPY.aboutBody),
    background: SITE_COPY.background.map((group) => ({
      _key: newKey(),
      _type: 'backgroundGroup',
      label: group.label,
      items: [...group.items],
    })),
    skillGroups: SITE_COPY.skillGroups.map((group) => ({
      _key: newKey(),
      _type: 'skillGroup',
      label: group.label,
      skills: [...group.skills],
    })),
    contactIntro: localizedText(SITE_COPY.contactIntro),
    socialLinks: SITE_COPY.socialLinks.map((link) => ({
      _key: newKey(),
      _type: 'socialLink',
      ...link,
    })),
    seoDescription: localizedString(SITE_COPY.seoDescription),
  }
}

// ---- Dry run ----------------------------------------------------------------

// Prints every document that would be created, one JSON object per line. The
// cover asset id is a well-formed placeholder, so Sanity's own validator can
// check the documents' shape offline.
function exportNdjson() {
  const placeholderAsset = {_id: 'image-0123456789abcdef0123456789abcdef01234567-1440x1080-png'}
  for (const project of projects) {
    const hasCover = fs.existsSync(coverFilePath(project))
    console.log(JSON.stringify({_id: 'seed-' + project.slug, ...buildProjectDocument(project, hasCover ? placeholderAsset : null)}))
  }
  console.log(JSON.stringify(buildSiteSettingsDocument()))
}

function dryRun() {
  console.log('DRY RUN: nothing is written and no token is needed.\n')
  for (const project of projects) {
    const cover = coverFilePath(project)
    const hasCover = fs.existsSync(cover)
    const doc = buildProjectDocument(project, hasCover ? {_id: 'image-DRYRUN'} : null)
    console.log(
      `project  ${String(project.orderRank).padStart(2)}  ${project.slug.padEnd(24)} ${project.platform.padEnd(8)} ${project.year}  cover: ${
        hasCover ? 'will upload ' + path.relative(ROOT, cover) : 'MISSING (' + project.coverImage.src + ')'
      }`,
    )
    if (process.argv.includes('--show')) console.log(JSON.stringify(doc, null, 2))
  }
  const settings = buildSiteSettingsDocument()
  console.log(
    `\nsiteSettings  fields: ${Object.keys(settings)
      .filter((k) => !k.startsWith('_'))
      .join(', ')}`,
  )
  console.log('\nTo write for real: node --env-file=.env.local scripts/seed-sanity.mts --write')
}

// ---- Real run ---------------------------------------------------------------

async function write() {
  const token = process.env.SANITY_WRITE_TOKEN
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!token) {
    console.error(
      'SANITY_WRITE_TOKEN is not set. Create an Editor token at sanity.io/manage > API > Tokens, add it to .env.local, and run again.',
    )
    process.exit(1)
  }
  if (!projectId || !dataset) {
    console.error('NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET are missing. Run with --env-file=.env.local.')
    process.exit(1)
  }

  const client = createClient({projectId, dataset, apiVersion: '2026-10-01', token, useCdn: false})
  console.log(`Writing to project ${projectId}, dataset "${dataset}".\n`)

  let created = 0
  let skipped = 0

  for (const project of projects) {
    const existingId = await client.fetch(
      '*[_type == "project" && slug.current == $slug][0]._id',
      {slug: project.slug},
    )
    if (existingId) {
      console.log(`skip     ${project.slug} (already exists: ${existingId})`)
      skipped++
      continue
    }

    let asset: UploadedAsset | null = null
    const cover = coverFilePath(project)
    if (fs.existsSync(cover)) {
      asset = await client.assets.upload('image', fs.createReadStream(cover), {
        filename: path.basename(cover),
      })
    } else {
      console.log(`         ${project.slug}: no cover file at ${project.coverImage.src}, created without one`)
    }

    const doc = await client.create(buildProjectDocument(project, asset))
    console.log(`created  ${project.slug} -> ${doc._id}`)
    created++
  }

  // createIfNotExists: leaves an existing (possibly Studio-edited) settings
  // document completely untouched.
  const settings = await client.createIfNotExists(buildSiteSettingsDocument())
  console.log(`siteSettings ready (${settings._id})`)

  console.log(`\nDone: ${created} created, ${skipped} skipped.`)
  console.log('Now DELETE the write token at sanity.io/manage > API > Tokens and remove it from .env.local.')
}

if (process.argv.includes('--ndjson')) {
  exportNdjson()
} else if (WRITE) {
  await write()
} else {
  dryRun()
}
