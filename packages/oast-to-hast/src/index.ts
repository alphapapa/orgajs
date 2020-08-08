import { Comment, Element, Properties, Root, Text } from 'hast'
import { Document, Section } from 'orga'
import u from 'unist-builder'
import handlers, { Handler } from './handlers'
import { all } from './transform'

export type HNode = Element | Comment | Text

const defaultOptions = {
  excludeTags: ['noexport'],
  selectTags: [] as string[],
  highlight: true,
  handlers: {} as { [key: string]: Handler },
}

type Options = typeof defaultOptions

// export = function toHAST(tree, options: any = {}) {
//   const meta = tree.meta || {}
//   h.handlers = Object.assign(handlers, options.handlers || {})
//   h.footnoteSection = options.footnoteSection || `footnotes`
//   const eTags = meta.exclude_tags
//   if (eTags) {
//     h.excludeTags = eTags.split(/\s+/)
//   } else {
//     h.excludeTags = options.excludeTags || [`noexport`]
//   }
//   const sTags = meta.select_tags
//   if (sTags) {
//     h.selectTags = sTags.split(/\s+/)
//   } else {
//     h.selectTags = options.selectTags || []
//   }
//   h.highlight = options.highlight || false
//   return transform(h, tree)
// }

// interface ElementInfo {
//   tagName: string;
//   properties?: Properties;
//   children?: Element['children'];
// }

const build = ({
  tagName,
  properties,
  children = [],
} : {
  tagName: string;
  properties?: Properties;
  children?: Array<HNode>}): HNode => {
  return {
    type: 'element',
    tagName,
    properties,
    children,
  }
}

const h = (
  tagName: string,
  properties: Properties | undefined = undefined
) => (...children: HNode[]): HNode => {
  return build({
    tagName,
    properties,
    children,
  })
}

const defaultContext = {
  ...defaultOptions,
  h,
  u,
}

export type Context = typeof defaultContext

export { Handler }

export default (
  oast: Document | Section,
  options: Partial<Options> = {}
): Root => {
  // TODO: get metadata
  const context = {
    ...defaultContext,
    ...options,
    handlers: { ...handlers, ...options.handlers },
  }

  const eTags = oast.properties['exclude_tags']
  if (eTags) {
    context.excludeTags = eTags.split(/\s+/).filter(Boolean)
  }

  // console.log({ context })

  return u('root', all(context)(oast.children))
}
