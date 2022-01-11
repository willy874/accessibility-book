export function isDarkMode() {
  const mediaQuery = matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery.matches
}

/**
 * @param {unknown} value
 * @returns {value is Function}
 */
export function isClass(value) {
  return Object.prototype.toString.call(value) === '[object Function]' && 'constructor' in value
}

/**
 * @param {unknown} value
 * @returns {value is Array}
 */
export function isArrayEmpty(value) {
  return Array.isArray(value) && JSON.stringify(value.filter(Boolean)) === '[]'
}

/**
 * @param {unknown} value
 * @returns {value is Object}
 */
export function isObjectEmpty(value) {
  return typeof value === 'object' && value && value.constructor === Object && JSON.stringify(value) === '{}'
}

/**
 * @param {unknown} value
 * @returns {value is Blob}
 */
export function isBlobEmpty(value) {
  return value instanceof Blob && (value.size === 0 || value.type === '')
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  let result
  if (value === undefined) result = true
  if (value === null) result = true
  if (typeof value === 'number' && isNaN(value)) result = true
  if (typeof value === 'string' && /^\s*$/.test(value)) result = true
  if (isArrayEmpty(value)) result = true
  if (isObjectEmpty(value)) result = true
  if (isBlobEmpty(value)) result = true
  return result
}
