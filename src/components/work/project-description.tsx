import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlocks} from '@/lib/work/types'

// Renders a project's rich-text description (Portable Text from Sanity). The
// defaults already produce plain <p>, <ul>/<li>, <strong>, <em> and <h3>; the
// only override is the link mark, so external links open safely in a new tab.
// Styling lives in work.module.scss (.detailDescription), not here.
const components: PortableTextComponents = {
  marks: {
    link: ({value, children}) => {
      const href: string = value?.href ?? ''
      const isExternal = href.startsWith('http')
      return (
        <a href={href} {...(isExternal && {target: '_blank', rel: 'noreferrer'})}>
          {children}
        </a>
      )
    },
  },
}

const ProjectDescription = ({value}: {value: PortableTextBlocks}) => (
  <PortableText value={value} components={components} />
)

export default ProjectDescription
