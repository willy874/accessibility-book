import { useMarkdown } from '@/plugins/markdown'

/**
 * @param {string} content
 * @returns {string} htmlText
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
  const contentText = content.replace(/\r\n/g, '\r\n\r\n')
  const html = markdown.render(contentText)
  const htmlText = html
    .replace(/<hr>/g, '<br><hr><br>')
    .replace(/&lt;br\/&gt;/g, '<br>')
    .replace(/&amp;nbsp/g, '<br>')
  return htmlText
}
