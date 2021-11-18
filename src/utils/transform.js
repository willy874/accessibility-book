import { useMarkdown } from '@/plugins/markdown'

/**
 * @param {string} content
 * @returns {string}
 * @description
 * ```markdown
 * # 規則:
 * ## 轉譯前:
 *    1. 將 `\n` 替換成 `\n\n`
 * ## 轉譯後:
 *    1. 將 `<hr>` 替換成 `<br><hr><br>`
 * ```
 */
export function transformMarkdownToHtml(content) {
  const markdown = useMarkdown()
  // const html = markdown.render(content.replace(/\\n/g, '\n\n'))
  // return html.replace(/<hr>/g, '<br><hr><br>')
  return markdown.render(content)
}
