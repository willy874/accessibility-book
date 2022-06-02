import { apiGetBookList, apiGetBookById, apiGetBookListByQuery } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

/** @type {BookState} */
export const state = {
  /**
   * @type {Record<number,BookModel>}
   */
  collection: {},
}

/**
 * @callback bookList
 * @param {BookState} state
 * @returns {BookModel[]}
 */
/**
 * @callback getBookListById
 * @param {BookState} state
 * @returns {(id: number) => BookModel}
 */
/**
 * @callback getBookListByTagId
 * @param {BookState} state
 * @returns {(id: number) => BookModel[]}
 */
/** @type {GetterTree<BookState>} */
export const getters = {
  bookList(state) {
    return Object.values(state.collection)
  },
  getBookListById(state) {
    return (id) => state.collection[id]
  },
  getBookListByTagId(state) {
    return (id) => Object.values(state.collection).filter((model) => model.tag.some((t) => t.id === id))
  },
}

/**
 * @callback setBook
 * @param {BookState} state
 * @param {BookModel} model
 */
/** @type {MutationTree<BookState>} */
export const mutations = {
  setBook(state, model) {
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
 * @callback fetchBookList
 * @param {ActionContext<BookState>} store
 * @returns {Promise<BookModel[]>}
 */
/**
 * @callback fetchBookById
 * @param {ActionContext<BookState>} store
 * @param {string} id
 * @returns {Promise<BookModel>}
 */
/**
 * @callback fetchBookByQuery
 * @param {ActionContext<BookState>} store
 * @param {StringData} query
 * @returns {Promise<BookModel[]>}
 */
/** @type {ActionTree<BookState>} */
export const actions = {
  async fetchBookList(store) {
    const { commit } = store
    try {
      const res = await apiGetBookList()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_BOOK, model)
        })
        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  async fetchBookById(store, id) {
    const { commit } = store
    try {
      const res = await apiGetBookById(id)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        commit(Mutations.SET_BOOK, res.data)

        return res.data
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  async fetchBookByQuery(store, query) {
    const { commit } = store
    try {
      const res = await apiGetBookListByQuery(query)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_BOOK, model)
        })
        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
