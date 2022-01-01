export function isDarkMode() {
  const mediaQuery = matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery.matches
}

export function isClass(value) {
  return Object.prototype.toString.call(value) === '[object Function]' && 'constructor' in value
}
