export function isApp() {
  var res = window.navigator.userAgent.match(/StApp\/([a-zA-Z0-9]*)\/(\d\.\d\.\d)\/([a-zA-Z0-9]*)/)
  if (res) {
    return {
      isApp: true,
      merchant: res[1],
      version: res[2],
      platform: res[3],
    }
  }
  return false
}

export function getBoundingClientRect(dom) {
  return dom.getBoundingClientRect()
}

export function getViewportOffset(element) {
  const doc = document.documentElement
  const docScrollLeft = doc.scrollLeft
  const docScrollTop = doc.scrollTop
  const docClientLeft = doc.clientLeft
  const docClientTop = doc.clientTop
  const pageXOffset = window.pageXOffset
  const pageYOffset = window.pageYOffset
  const box = getBoundingClientRect(element)
  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0)
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0)
  const offsetLeft = retLeft + pageXOffset
  const offsetTop = rectTop + pageYOffset
  const left = offsetLeft - scrollLeft
  const top = offsetTop - scrollTop
  const clientWidth = window.document.documentElement.clientWidth
  const clientHeight = window.document.documentElement.clientHeight
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left,
    bottomIncludeBody: clientHeight - top,
  }
}
