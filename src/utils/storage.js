import store from '@/store'
import { Actions } from '@/consts'

/**
 * @param {import('@/consts').StorageKey} key
 * @return {Promise<string>}
 */
export function getStorage(key) {
  return store.dispatch(Actions.GET_STORAGE, key)
}

/**
 * @param {import('@/consts').StorageKey} key
 * @param {string} value
 * @return {Promise<void>}
 */
export function setStorage(key, value) {
  return store.dispatch(Actions.SET_STORAGE, { key, value })
}

/**
 * @param {import('@/consts').StorageKey} key
 * @return {Promise<void>}
 */
export function removeStorage(key) {
  return store.dispatch(Actions.REMOVE_STORAGE, key)
}
