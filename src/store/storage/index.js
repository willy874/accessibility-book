import { StorageKey, Mutations, Actions } from '@/consts'
import Config from '@/config'
import { storageInit, cloneJson } from '@/utils'

const storage = Config.value.storage

export default {
  /**
   * @type {StorageState}
   */
  state: {
    local: storageInit(Object.values(StorageKey), storage),
  },
  mutations: {
    /**
     * @name createStorage
     * @param {StorageState} state
     * @param {{ key: string, value: string }} data
     */
    [Mutations.CREATE_STORAGE]: function (state, data) {
      console.log(data)
      if (!Object.hasOwnProperty.call(state.local, data.key)) {
        const newData = cloneJson(data)
        storage.setItem(data.key, data.value)
        state.local = newData
      }
    },
    /**
     * @name updateStorage
     * @param {StorageState} state
     * @param {{ key: string, value: string }} data
     */
    [Mutations.UPDATE_STORAGE]: function (state, data) {
      if (Object.hasOwnProperty.call(state.local, data.key)) {
        storage.setItem(data.key, data.value)
        state.local[data.key] = String(data.value)
      }
    },
    /**
     * @name deleteStorage
     * @param {StorageState} state
     * @param {string} key
     */
    [Mutations.DELETE_STORAGE]: function (state, key) {
      if (Object.hasOwnProperty.call(state.local, key)) {
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
      if (Object.hasOwnProperty.call(store.state.local, key)) {
        return store.state.local[key]
      }
    },
    /**
     * @name setStorage
     * @param {ActionContext<StorageState,RootState>} store
     * @param {{ key: string, value: string }} data
     */
    [Actions.SET_STORAGE]: async function (store, data) {
      const { state, commit } = store
      if (Object.hasOwnProperty.call(state.local, data.key)) {
        commit(Mutations.UPDATE_STORAGE, data)
      } else {
        commit(Mutations.CREATE_STORAGE, data)
      }
    },
    /**
     * @name setStorage
     * @param {ActionContext<StorageState,RootState>} store
     * @param {string} key
     */
    [Actions.REMOVE_STORAGE]: async function (store, key) {
      const { state, commit } = store
      if (Object.hasOwnProperty.call(state.local, key)) {
        commit(Mutations.DELETE_STORAGE, key)
      }
    },
  },
}
