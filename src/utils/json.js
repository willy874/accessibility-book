/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @template T
 * @param {T} storage
 * @returns {T}
 */
export function storageInit(storage) {
  const obj = cloneJson(storage)
  for (const key in obj) {
    obj[key] = null
  }
  return obj
}
