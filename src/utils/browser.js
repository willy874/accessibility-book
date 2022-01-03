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
