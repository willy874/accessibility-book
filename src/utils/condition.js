export function isDarkMode() {
  const mediaQuery = matchMedia('(prefers-color-scheme: dark)')
  return mediaQuery.matches
}

/**
 * @param {unknown} value
 * @returns {value is Function}
 */
export function isClass(value) {
  return (
    typeof value === 'function' &&
    Object.prototype.toString.call(value) === '[object Function]' &&
    'constructor' in value
  )
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
 * @returns {value is Object}
 */
export function isObject(value) {
  return typeof value === 'object' && value && value.constructor === Object && JSON.stringify(value) !== '{}'
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
 * @returns {value is string}
 */
export function isStringEmpty(value) {
  return typeof value === 'string' && /^\s*$/.test(value)
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
export function isNumberEmpty(value) {
  return typeof value === 'number' && isNaN(value)
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (value === undefined) return true
  if (value === null) return true
  if (isNumberEmpty(value)) return true
  if (isStringEmpty(value)) return true
  if (isArrayEmpty(value)) return true
  if (isObjectEmpty(value)) return true
  if (isBlobEmpty(value)) return true
}

/**
 * @param {Array<string|RegExp>} data
 * @param {string} text
 * @returns {boolean}
 */
export function isTextIncludes(data, text) {
  for (let index = 0; index < data.length; index++) {
    const value = data[index]
    if (value instanceof RegExp) {
      if (value.test(text)) return true
    } else {
      const reg = new RegExp(String(value))
      if (reg.test(text)) return true
    }
  }
  return false
}

/**
 * @param {Array<string|RegExp>} data
 * @param {string} text
 * @returns {boolean}
 */
export function isTextExcludes(data, text) {
  for (let index = 0; index < data.length; index++) {
    const value = data[index]
    if (value instanceof RegExp) {
      if (value.test(text)) return false
    } else {
      const reg = new RegExp(String(value))
      if (reg.test(text)) return false
    }
  }
  return true
}

/**
 * @template T
 * @param {AxiosResponse<T> | AxiosError<any>} res
 * @returns {res is AxiosError<any>}
 */
export function isAxiosError(res) {
  return res && res.isAxiosError
}
