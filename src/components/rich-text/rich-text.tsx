import {PortableText, type PortableTextComponents} from '@portabletext/react'
import type {PortableTextBlocks} from '@/lib/work/types'

// Renders any rich text that comes from Sanity (Portable Text): a project's
// description, an Excel Lab solution, the Home statement, the About body. The
// defaults already produce plain <p>, <ul>/<li>, <strong>, <em> and <h3>; the
// only override is the link mark, so external links open safely in a new tab.
// It adds no wrapper element, so the paragraphs land directly inside whatever
// container the caller provides, and that container's stylesheet styles them.
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

const RichText = ({value}: {value: PortableTextBlocks}) => (
  <PortableText value={value} components={components} />
)

export default RichText
