// The site's shared copy, in one place. Two jobs:
//
//   1. It is what scripts/seed-sanity.mts writes into the `siteSettings`
//      document in Sanity the first time (so the CMS starts out matching the
//      live site exactly).
//   2. From step 4.5 on, it is the coded FALLBACK the components use when the
//      `siteSettings` document is missing or half empty — so an empty or
//      unreachable CMS can never produce a blank page (handoff.md section 7,
//      Phase 4 exit criterion: "build passes with zero content").
//
// After seeding, Sanity is the source of truth and this file is only the
// fallback — edit copy in the Studio, not here. This file has no imports on
// purpose, so plain Node can load it for the seed script.
//
// Career facts here (title, location, employers, dates, degrees) must match
// LinkedIn (linkedin.com/in/ivan-e-villanueva) — handoff.md section 2,
// decisions 6-7.

export const SITE_COPY = {
  name: 'Ivan E. Villanueva',
  title: 'Software Developer · Accounting Automation',
  // City level only (handoff finding S4).
  location: 'Guadalajara, Mexico · Remote',
  email: 'svei00@gmail.com',

  positioningStatement: [
    'I turn manual accounting and tax workflows into controlled, automated processes with Excel and Python, and build the web apps around them with React and Next.js. Twenty-plus years in accounting, audit, and tax taught me the real problem is structural, not technical: manual steps, rework, and no audit trail.',
  ],

  aboutBody: [
    "I'm a software developer based in Guadalajara, Mexico, working remotely. I turn manual accounting and tax workflows into controlled, automated processes with Excel and Python, and build the web apps around them with React and Next.js.",
    "I come to software from accounting: more than 20 years across audit, tax, and consulting, including Deloitte México and nine years at Mexico's tax authority (SAT), where I rose to department head. Since 2014 I have run ExcelSolutionsV, building tools for accountants and teaching Excel and Python.",
    'I work in English and Spanish, which is also why so much of my tooling covers CFDI and SAT workflows for Mexican accountants.',
    "Outside of work, I'm a husband and father who's happiest on a walk through the woods or planning the next family trip.",
  ],

  background: [
    {
      label: 'Work',
      items: [
        'Accounting & Systems Consultant, ECA Estructura & Arquitectura · 2013 – present',
        'Founder & Accounting Automation Developer, ExcelSolutionsV · 2014 – present',
        'Department Head, Servicio de Administración Tributaria (SAT) · 2005 – 2014',
        'Audit Associate, Deloitte · 2004 – 2005',
      ],
    },
    {
      label: 'Education',
      items: [
        'Ingeniería en Desarrollo de Software, UnADM · 2017 – 2021',
        'Bachelor of Laws, Universidad de Guadalajara · Mariano Otero Prize',
        'Public Accounting, Universidad de Guadalajara',
      ],
    },
  ],

  // Data & Automation first (what LinkedIn leads with) and kept apart from
  // Languages: this site is TypeScript, so Python must not sit beside JS/TS
  // and imply it built the site.
  skillGroups: [
    {
      label: 'Data & Automation',
      skills: ['Python', 'Microsoft Excel', 'VBA', 'Power Query', 'SQLite', 'CFDI / XML'],
    },
    {label: 'Languages', skills: ['JavaScript', 'TypeScript', 'PHP', 'SQL']},
    {
      label: 'Frontend',
      skills: ['React', 'React Native', 'HTML5', 'CSS3', 'TailwindCSS', 'Bootstrap'],
    },
    {
      label: 'Backend & Tools',
      skills: ['Node.js', 'Express.js', 'Git', 'NPM', 'Webpack', 'Jest'],
    },
  ],

  contactIntro:
    "I'm open to remote full-time, part-time, and contract work in accounting automation, data analysis, and software development. If you have a different request or question, use the form below.",

  socialLinks: [
    {label: 'LinkedIn', url: 'https://www.linkedin.com/in/ivan-e-villanueva'},
    {label: 'GitHub', url: 'https://github.com/svei00/'},
    {label: 'YouTube', url: 'https://www.youtube.com/channel/UCbxQit2ZC4U1eUwdZVQkhwg'},
    {label: 'Twitter', url: 'https://twitter.com/svei00'},
  ],

  seoDescription:
    'Software developer in Guadalajara, Mexico, automating accounting and tax workflows with Excel and Python, and building web apps with React and Next.js.',
} as const
