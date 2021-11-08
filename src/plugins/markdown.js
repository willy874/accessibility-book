import MarkdownIt from 'markdown-it'
import markdownItLatex from 'markdown-it-latex'
import markdownItTexmath from 'markdown-it-texmath'
// import markdownItLatex2Img from 'markdown-it-latex2img'
// import markdownItAbbr from 'markdown-it-abbr'
// import markdownItDeflist from 'markdown-it-deflist'
// import markdownItEmoji from 'markdown-it-emoji'
// import markdownItFootnote from 'markdown-it-footnote'
// import markdownItImsize from 'markdown-it-imsize'
// import markdownItMark from 'markdown-it-mark'
// import markdownItPandocRenderer from 'markdown-it-pandoc-renderer'
// import markdownItSup from 'markdown-it-sup'
// import markdownItSub from 'markdown-it-sub'

const markdown = MarkdownIt()
markdown.use(markdownItLatex)
markdown.use(markdownItTexmath)
// markdown.use(markdownItLatex2Img)
// markdown.use(markdownItAbbr)
// markdown.use(markdownItDeflist)
// markdown.use(markdownItEmoji)
// markdown.use(markdownItFootnote)
// markdown.use(markdownItImsize)
// markdown.use(markdownItMark)
// markdown.use(markdownItPandocRenderer)
// markdown.use(markdownItSup)
// markdown.use(markdownItSub)

export function installMarkdown(vm) {
  vm.prototype.$markdown = markdown
}

export function useMarkdown() {
  return markdown
}
