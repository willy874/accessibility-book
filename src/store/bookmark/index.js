import { apiGetBookMarkList, apiPostBookMark, apiDeleteBookMark } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

/**
 * @type {BookMarkState}
 */
export const state = {
  /**
   * @type {Record<number,BookMarkModel>}
   */
  collection: {},
}

/**
 * @callback bookmarkList
 * @param {BookMarkState} state
 * @returns {BookMarkModel[]}
 */
export const getters = {
  bookmarkList(state) {
    return Object.values(state.collection)
  },
}

/**
 * @callback setBookmark
 * @param {BookMarkState} state
 * @param {BookMarkModel} model
 */
/**
 * @callback removeBookmark
 * @param {BookMarkState} state
 * @param {number} id
 */
export const mutations = {
  /** @type {setBookmark} */
  setBookmark(state, model) {
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
  /** @type {removeBookmark} */
  removeBookmark(state, id) {
    if (Object.hasOwnProperty.call(state.collection, id)) {
      state.collection[id] = null
      delete state.collection[id]
    }
  },
}

/**
 * @callback fetchBookmarkList
 * @param {ActionContext<BookMarkState,RootState>} store
 * @param {void} payload
 * @returns {Promise<BookMarkModel[]>}
 */
/**
 * @callback addBookmark
 * @param {ActionContext<BookMarkState,RootState>} store
 * @param {BookMarkRequestParam} params
 * @returns {Promise<ResponseCollection<BookMarkModel>>}
 */
/**
 * @callback deleteBookmark
 * @param {ActionContext<BookMarkState,RootState>} store
 * @param {number} id
 * @returns {Promise<BookMarkModel>}
 */
export const actions = {
  /** @type {fetchBookmarkList} */
  async fetchBookmarkList(store, payload) {
    const { commit } = store
    try {
      const res = await apiGetBookMarkList()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_BOOKMARK, model)
        })

        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /** @type {addBookmark} */
  async addBookmark(store, params) {
    const { commit } = store
    try {
      commit(Mutations.SET_LOADING, params.chapter)
      const res = await apiPostBookMark(params)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        commit(Mutations.SET_BOOKMARK, res.data)
        return res.data
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /** @type {deleteBookmark} */
  async deleteBookmark(store, id) {
    const { state, commit } = store
    try {
      commit(Mutations.SET_LOADING, id)
      const res = await apiDeleteBookMark(id)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const bookmark = state.collection[id]
        commit(Mutations.REMOVE_BOOKMARK, id)

        return bookmark
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
