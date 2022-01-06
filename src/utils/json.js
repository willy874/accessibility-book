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
 * @param {string[]} keys
 * @param {Storage} storage
 * @returns {T}
 */
export function storageInit(keys, storage) {
  const data = {}
  for (const key of keys) {
    data[key] = storage.getItem(key) || null
  }
  return data
}
