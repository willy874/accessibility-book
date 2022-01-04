import { StorageKey, Mutations, Actions } from '@/consts'
import Config from '@/config'
import { cloneJson, storageInit } from '@/utils'

const storage = Config.value.storage

export default {
  /**
   * @type {StorageState}
   */
  state: {
    storage: storageInit(StorageKey),
  },
  mutations: {
    /**
     * @name createStorage
     * @param {StorageState} state
     * @param {{ key: string, value: string }} data
     */
    [Mutations.CREATE_STORAGE]: function (state, data) {
      if (!Object.hasOwnProperty.call(state.storage, data.key)) {
        const data = cloneJson(state.storage)
        data[data.key] = Object.prototype.toString.call(data.value)
        state.storage = data
      }
    },
    /**
     * @name updateStorage
     * @param {StorageState} state
     * @param {{ key: string, value: string }} data
     */
    [Mutations.UPDATE_STORAGE]: function (state, data) {
      if (Object.hasOwnProperty.call(state.storage, data.key)) {
        storage.setItem(data.key, data.value)
        state.storage = Object.prototype.toString.call(data.value)
      }
    },
    /**
     * @name deleteStorage
     * @param {StorageState} state
     * @param {string} key
     */
    [Mutations.DELETE_STORAGE]: function (state, key) {
      if (Object.hasOwnProperty.call(state.storage, key)) {
        storage.removeItem(key)
        state[key] = ''
        delete state[key]
      }
    },
  },
  actions: {
    /**
     * @name getStorage
     * @param {ActionContext<StorageState,RootState>} store
     * @param {string} key
     * @return {Promise<string>}
     */
    [Actions.GET_STORAGE]: async function (store, key) {
      if (Object.hasOwnProperty.call(store.state.storage, key)) {
        return store.state.storage[key]
      }
    },
    /**
     * @name setStorage
     * @param {ActionContext<StorageState,RootState>} store
     * @param {{ key: string, value: string }} data
     */
    [Actions.SET_STORAGE]: async function (store, data) {
      const { state, commit } = store
      if (Object.hasOwnProperty.call(state.storage, data.key)) {
        commit(Mutations.UPDATE_STORAGE)
      } else {
        commit(Mutations.CREATE_STORAGE)
      }
    },
    /**
     * @name setStorage
     * @param {ActionContext<StorageState,RootState>} store
     * @param {string} key
     */
    [Actions.REMOVE_STORAGE]: async function (store, key) {
      const { state, commit } = store
      if (Object.hasOwnProperty.call(state.storage, key)) {
        commit(Mutations.DELETE_STORAGE)
      }
    },
  },
}
