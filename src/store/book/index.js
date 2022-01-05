import { apiGetBookList, apiGetBookById } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,BookModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setBook
     * @param {BookState} state
     * @param {BookModel} book
     */
    [Mutations.SET_BOOK]: function (state, model) {
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
     * @name fetchBookList
     * @param {ActionContext<BookState,RootState>} store
     * @returns {Promise<BookModel>}
     */
    [Actions.FETCH_BOOK_LIST]: async function (store) {
      const { commit } = store
      try {
        const res = await apiGetBookList()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_BOOK, model)
          })
          return list
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    /**
     * @name fetchBookById
     * @param {ActionContext<BookState,RootState>} store
     * @param {number} id
     * @returns {Promise<BookModel>}
     */
    [Actions.FETCH_BOOK_BY_ID]: async function (store, id) {
      const { commit } = store
      try {
        const res = await apiGetBookById(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          commit(Mutations.SET_BOOK, res.data)
          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
  },
  getters: {
    /**
     * @name bookList
     * @param {BookState} state
     * @returns {BookModel[]}
     */
    [Getters.BOOK_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}