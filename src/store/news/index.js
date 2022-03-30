import { apiGetNewsList, apiGetNewsById } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

export const state = {
  /**
   * @type {Record<number,BookModel>}
   */
  collection: {},
}

/**
 * @callback newsList
 * @param {NewsState} state
 * @returns {NewsModel[]}
 */
/** @type {GetterTree<NewsState>} */
export const getters = {
  /** @type {newsList} */
  newsList(state) {
    return Object.values(state.collection)
  },
}

/**
 * @callback setNews
 * @param {NewsState} state
 * @param {NewsModel} model
 */
/** @type {MutationTree<NewsState>} */
export const mutations = {
  /** @type {setNews} */
  setNews(state, model) {
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
 * @callback fetchNewsList
 * @param {ActionContext<NewsState>} store
 * @param {void} payload
 * @returns {Promise<NewsModel[]>}
 */
/**
 * @callback fetchNewsById
 * @param {ActionContext<NewsState>} store
 * @param {number} id
 * @returns {Promise<ResponseCollection<NewsModel>>}
 */
/** @type {ActionTree<NewsState>} */
export const actions = {
  /** @type {fetchNewsList} */
  async fetchNewsList(store, payload) {
    const { commit } = store
    try {
      const res = await apiGetNewsList()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_NEWS, model)
        })
        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /** @type {fetchNewsById} */
  async fetchNewsById(store, id) {
    const { commit } = store
    try {
      const res = await apiGetNewsById(id)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        commit(Mutations.SET_NEWS, res.data)
        return res.data
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
