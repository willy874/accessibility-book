import { apiGetBookMarkList, apiPostBookMark, apiDeleteBookMark } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,BookMarkModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setBookmark
     * @param {BookMarkState} state
     * @param {BookMarkModel} model
     */
    [Mutations.SET_BOOKMARK]: function (state, model) {
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
    /**
     * @name removeBookmark
     * @param {BookMarkState} state
     * @param {number} id
     */
    [Mutations.REMOVE_BOOKMARK]: function (state, id) {
      if (Object.hasOwnProperty.call(state.collection, id)) {
        state.collection[id] = null
        delete state.collection[id]
      }
    },
  },
  actions: {
    /**
     * @name fetchBookmarkList
     * @param {ActionContext<BookMarkState,RootState>} store
     * @returns {Promise<BookMarkModel>}
     */
    [Actions.FETCH_BOOKMARK_LIST]: async function (store) {
      const { commit } = store
      try {
        const res = await apiGetBookMarkList()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_BOOKMARK, model)
          })

          return list
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    /**
     * @name addBookmark
     * @param {ActionContext<BookMarkState,RootState>} store
     * @param {BookMarkRequestParam} params
     * @returns {Promise<BookMarkModel>}
     */
    [Actions.ADD_BOOKMARK]: async function (store, params) {
      const { commit } = store
      try {
        commit(Mutations.SET_LOADING, params.chapter)
        const res = await apiPostBookMark(params)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          commit(Mutations.SET_BOOKMARK, res.data)

          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    /**
     * @name addBookmark
     * @param {ActionContext<BookMarkState,RootState>} store
     * @param {number} id
     * @returns {Promise<BookMarkModel>}
     */
    [Actions.DELETE_BOOKMARK]: async function (store, id) {
      const { state, commit } = store
      try {
        commit(Mutations.SET_LOADING, id)
        const res = await apiDeleteBookMark(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const bookmark = state.collection[id]
          commit(Mutations.REMOVE_BOOKMARK, id)

          return bookmark
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
  },
  getters: {
    /**
     * @name bookmarkList
     * @param {BookMarkState} state
     * @returns {BookMarkModel[]}
     */
    [Getters.BOOKMARK_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
