import _debounce from 'lodash/debounce'
import _throttle from 'lodash/throttle'

export function formDataFormat(data) {
  const format = (value, keys = []) => {
    Object.keys(value).forEach((key) => {
      const formName = [...keys, key].map((k, i) => (i ? `[${k}]` : k)).join('')
      if (value[key] instanceof Blob) {
        formData.append(formName, value[key], value[key].name)
      } else if (value[key] && typeof value[key] === 'object') {
        format(value[key], [...keys, key])
      } else if (value[key] !== undefined) {
        formData.append(formName, value[key])
      }
    })
  }
  const formData = new FormData()
  format(data)
  return formData
}

export function formUrlEncodedFormat(data) {
  const queryParams = new URLSearchParams()
  for (const key in data) {
    const value = data[key]
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v))
    } else if (typeof value === 'object') {
      queryParams.append(key, JSON.stringify(value))
    } else {
      queryParams.append(key, value)
    }
  }
  return queryParams
}

/**
 * @template T
 * @param {T} fn
 * @param {number} wait
 * @returns {T}
 */
export function throttle(fn, wait) {
  // @ts-ignore
  return _throttle(fn, wait)
}

/**
 * @template T
 * @param {T} fn
 * @param {number} wait
 * @returns {T}
 */
export function debounce(fn, wait) {
  // @ts-ignore
  return _debounce(fn, wait)
}
