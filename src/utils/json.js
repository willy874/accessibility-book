export function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * @param {string[]} keys
 * @param {Storage} storage
 * @returns {{ [key: string]: string }}
 */
export function storageInit(keys, storage) {
  const data = {}
  for (const key of keys) {
    data[key] = storage.getItem(key) || null
  }
  return cloneJson(data)
}

export function treeEach(tree, func, children = 'child') {
  const list = [...tree]
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}
