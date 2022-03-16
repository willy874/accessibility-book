import { apiGetNewsList, apiGetNewsById } from '@/api/index'
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
     * @name setNews
     * @param {NewsState} state
     * @param {NewsModel} news
     */
    [Mutations.SET_NEWS]: function (state, model) {
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
     * @name fetchNewsList
     * @param {ActionContext<NewsState,RootState>} store
     * @returns {Promise<NewsModel>}
     */
    [Actions.FETCH_NEWS_LIST]: async function (store) {
      const { state, commit } = store
      try {
        const res = await apiGetNewsList()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_NEWS, model)
          })
          if (state.loading) return list
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
    [Actions.FETCH_NEWS_BY_ID]: async function (store, id) {
      const { commit } = store
      try {
        const res = await apiGetNewsById(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          commit(Mutations.SET_NEWS, res.data)

          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
  },
  getters: {
    /**
     * @name newsList
     * @param {NewsState} state
     * @returns {NewsModel[]}
     */
    [Getters.NEWS_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
