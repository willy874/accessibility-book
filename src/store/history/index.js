import { apiGetHistoryList } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,HistoryModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setHistory
     * @param {HistoryState} state
     * @param {HistoryModel} history
     */
    [Mutations.SET_HISTORY]: function (state, model) {
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
  },
  actions: {
    /**
     * @name fetchHistoryList
     * @param {ActionContext<HistoryState,RootState>} store
     * @returns {Promise<HistoryModel>}
     */
    [Actions.FETCH_HISTORY_LIST]: async function (store) {
      const { commit } = store
      try {
        const res = await apiGetHistoryList()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_HISTORY, model)
          })

          return list
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
  },
  getters: {
    /**
     * @name historyList
     * @param {HistoryState} state
     * @returns {HistoryModel[]}
     */
    [Getters.HISTORY_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
