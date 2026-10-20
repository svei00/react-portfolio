import {defineQuery} from 'groq'

// Every GROQ query the site runs. They are wrapped in defineQuery so TypeGen
// (npm run typegen in studio/) can read them and generate result types into
// src/sanity/types.ts.
//
// Localized fields are stored as [{_key, language, value}] (plugin v5 — NOT
// matched by _key). The same expression is repeated for every localized field:
//
//   coalesce(field[language == $locale][0].value, field[language == "en"][0].value)
//
// i.e. "this language, else English". It is spelled out each time instead of
// being built from a shared string because TypeGen analyses queries
// statically and cannot see through string interpolation. `$locale` is always
// supplied by sanityFetch (src/sanity/fetch.ts).
//
// Images are returned as { image: {asset, crop, hotspot}, alt } — exactly what
// urlFor() in src/sanity/image.ts needs, plus the localized alt text.

// ---- Work -------------------------------------------------------------

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`)

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && defined(slug.current)] | order(orderRank asc) {
    "slug": slug.current,
    "title": coalesce(title[language == $locale][0].value, title[language == "en"][0].value),
    "summary": coalesce(summary[language == $locale][0].value, summary[language == "en"][0].value),
    platform,
    year,
    techStack,
    featured,
    orderRank,
    "coverImage": coverImage{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    }
  }
`)

export const PROJECT_QUERY = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    "slug": slug.current,
    "title": coalesce(title[language == $locale][0].value, title[language == "en"][0].value),
    "summary": coalesce(summary[language == $locale][0].value, summary[language == "en"][0].value),
    "description": coalesce(description[language == $locale][0].value, description[language == "en"][0].value),
    platform,
    year,
    techStack,
    liveUrl,
    repoUrl,
    "coverImage": coverImage{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    },
    "gallery": gallery[]{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    }
  }
`)

// ---- Excel Lab ----------------------------------------------------------

export const EXCEL_PIECE_SLUGS_QUERY = defineQuery(`
  *[_type == "excelPiece" && defined(slug.current)]{ "slug": slug.current }
`)

export const EXCEL_PIECES_QUERY = defineQuery(`
  *[_type == "excelPiece" && defined(slug.current)] | order(orderRank asc) {
    "slug": slug.current,
    "title": coalesce(title[language == $locale][0].value, title[language == "en"][0].value),
    "problem": coalesce(problem[language == $locale][0].value, problem[language == "en"][0].value),
    "outcome": coalesce(outcome[language == $locale][0].value, outcome[language == "en"][0].value),
    status,
    tools,
    featured,
    orderRank,
    "coverImage": images[0]{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    }
  }
`)

export const EXCEL_PIECE_QUERY = defineQuery(`
  *[_type == "excelPiece" && slug.current == $slug][0]{
    "slug": slug.current,
    "title": coalesce(title[language == $locale][0].value, title[language == "en"][0].value),
    "problem": coalesce(problem[language == $locale][0].value, problem[language == "en"][0].value),
    "solution": coalesce(solution[language == $locale][0].value, solution[language == "en"][0].value),
    "differentiator": coalesce(differentiator[language == $locale][0].value, differentiator[language == "en"][0].value),
    "outcome": coalesce(outcome[language == $locale][0].value, outcome[language == "en"][0].value),
    "honestNote": coalesce(honestNote[language == $locale][0].value, honestNote[language == "en"][0].value),
    status,
    tools,
    fileUrl,
    catalogUrl,
    "images": images[]{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    }
  }
`)

// ---- Site settings (singleton, fixed _id) -------------------------------

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name,
    "title": coalesce(title[language == $locale][0].value, title[language == "en"][0].value),
    "location": coalesce(location[language == $locale][0].value, location[language == "en"][0].value),
    email,
    "positioningStatement": coalesce(positioningStatement[language == $locale][0].value, positioningStatement[language == "en"][0].value),
    "aboutBody": coalesce(aboutBody[language == $locale][0].value, aboutBody[language == "en"][0].value),
    background[]{label, items},
    skillGroups[]{label, skills},
    "contactIntro": coalesce(contactIntro[language == $locale][0].value, contactIntro[language == "en"][0].value),
    socialLinks[]{label, url},
    "seoDescription": coalesce(seoDescription[language == $locale][0].value, seoDescription[language == "en"][0].value),
    "ogImage": ogImage{
      image{asset, crop, hotspot},
      "alt": coalesce(alt[language == $locale][0].value, alt[language == "en"][0].value)
    }
  }
`)
