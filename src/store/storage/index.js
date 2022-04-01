import { StorageKey, Mutations } from '@/consts'
import { storageInit, cloneJson } from '@/utils'

const storage = localStorage

/** @type {StorageState} */
export const state = {
  /**
   * @type {Record<StorageKey, string>}
   */
  local: storageInit(Object.values(StorageKey), storage),
}

/**
 * @callback createStorage
 * @param {StorageState} state
 * @param {{ key: string, value: string }} data
 */
/**
 * @callback updateStorage
 * @param {StorageState} state
 * @param {{ key: string, value: string }} data
 */
/**
 * @callback deleteStorage
 * @param {StorageState} state
 * @param {string} key
 */
/** @type {MutationTree<StorageState>} */
export const mutations = {
  /** @type {createStorage} */
  createStorage(state, data) {
    if (!Object.hasOwnProperty.call(state.local, data.key)) {
      const newState = cloneJson(state.local)
      storage.setItem(data.key, data.value)
      newState[data.key] = String(data.value)
      state.local = newState
    }
  },
  /** @type {updateStorage} */
  updateStorage(state, data) {
    if (Object.hasOwnProperty.call(state.local, data.key)) {
      storage.setItem(data.key, data.value)
      state.local[data.key] = String(data.value)
    }
  },
  /** @type {deleteStorage} */
  deleteStorage(state, key) {
    if (Object.hasOwnProperty.call(state.local, key)) {
      storage.removeItem(key)
      state.local[key] = ''
      delete state.local[key]
    }
  },
}

/**
 * @callback getStorage
 * @param {ActionContext<StorageState>} store
 * @param {string} key
 * @return {Promise<string>}
 */
/**
 * @callback setStorage
 * @param {ActionContext<StorageState>} store
 * @param {{ key: string, value: string }} data
 */
/**
 * @callback removeStorage
 * @param {ActionContext<StorageState>} store
 * @param {string} key
 */
/** @type {ActionTree<StorageState>} */
export const actions = {
  /** @type {getStorage} */
  async getStorage(store, key) {
    if (Object.hasOwnProperty.call(store.state.local, key)) {
      return store.state.local[key]
    }
  },
  /** @type {setStorage} */
  async setStorage(store, data) {
    const { state, commit } = store
    if (Object.hasOwnProperty.call(state.local, data.key)) {
      commit(Mutations.UPDATE_STORAGE, data)
    } else {
      commit(Mutations.CREATE_STORAGE, data)
    }
  },
  /** @type {removeStorage} */
  async removeStorage(store, key) {
    const { state, commit } = store
    if (Object.hasOwnProperty.call(state.local, key)) {
      commit(Mutations.DELETE_STORAGE, key)
    }
  },
}
