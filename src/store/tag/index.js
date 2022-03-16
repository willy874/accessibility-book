import { apiGetTagList } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,TagModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setTag
     * @param {TagState} state
     * @param {TagModel} tag
     */
    [Mutations.SET_TAG]: function (state, model) {
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
     * @name fetchTagList
     * @param {ActionContext<TagState,RootState>} store
     * @returns {Promise<TagModel>}
     */
    [Actions.FETCH_TAG_LIST]: async function (store) {
      const { commit } = store
      try {
        const res = await apiGetTagList()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_TAG, model)
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
     * @name tagList
     * @param {TagState} state
     * @returns {TagModel[]}
     */
    [Getters.TAG_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
