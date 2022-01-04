import { apiGetBookMark, apiPostBookMark, apiDeleteBookMark } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,BookMarkModel>}
     */
    bookMarCollection: {},
  },
  mutations: {
    /**
     * @name setBookmark
     * @param {BookMarkState} state
     * @param {BookMarkModel} bookmark
     */
    [Mutations.SET_BOOKMARK]: function (state, bookmark) {
      if (Object.hasOwnProperty.call(state.bookMarCollection, bookmark)) {
        state.bookMarCollection[bookmark.id] = bookmark
      } else {
        const collection = {
          ...state.bookMarCollection,
          [bookmark.id]: bookmark,
        }
        state.bookMarCollection = collection
      }
    },
    /**
     * @name removeBookmark
     * @param {BookMarkState} state
     * @param {number} id
     */
    [Mutations.REMOVE_BOOKMARK]: function (state, id) {
      if (Object.hasOwnProperty.call(state.bookMarCollection, id)) {
        state.bookMarCollection[id] = null
        delete state.bookMarCollection[id]
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
        const res = await apiGetBookMark()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          res.data.forEach((bookmark) => {
            commit(Mutations.SET_BOOKMARK, bookmark)
          })
          return res.data
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
        const res = await apiDeleteBookMark(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const bookmark = state.bookMarCollection[id]
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
      return Object.values(state.bookMarCollection)
    },
  },
}
