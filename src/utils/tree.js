import { isObject } from './condition'

/**
 * @param {object} object
 * @param {object[]} args
 * @return {object}
 */
export function deepAssign(object, ...args) {
  if (isObject(object)) {
    for (let i = 0; i < args.length; i++) {
      const target = args[i]
      if (isObject(target)) {
        for (const key in target) {
          if (isObject(target[key])) {
            object[key] = deepAssign(object[key], target[key])
          } else {
            object[key] = target[key]
          }
        }
      }
    }
  }
  return object
}
