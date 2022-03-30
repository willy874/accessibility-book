import { apiGetHistoryList } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

export const state = {
  /**
   * @type {Record<number,HistoryModel>}
   */
  collection: {},
}

/**
 * @callback historyList
 * @param {HistoryState} state
 * @returns {HistoryModel[]}
 */
/** @type {GetterTree<HistoryState>} */
export const getters = {
  /** @type {historyList} */
  historyList(state) {
    return Object.values(state.collection)
  },
}

/**
 * @callback setHistory
 * @param {HistoryState} state
 * @param {HistoryModel} model
 */
/** @type {MutationTree<HistoryState>} */
export const mutations = {
  /** @type {setHistory} */
  setHistory(state, model) {
    if (Object.hasOwnProperty.call(state.collection, model)) {
      state.collection[model.id] = model
    } else {
      const collection = {
        ...state.collection,
        [model.id]: model,
      }
      state.collection = collection
    }
  },
}

/**
 * @callback fetchHistoryList
 * @param {ActionContext<HistoryState>} store
 * @param {void} payload
 * @returns {Promise<HistoryModel[]>}
 */
/** @type {ActionTree<HistoryState>} */
export const actions = {
  /** @type {fetchHistoryList} */
  async fetchHistoryList(store, payload) {
    const { commit } = store
    try {
      const res = await apiGetHistoryList()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_HISTORY, model)
        })

        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
