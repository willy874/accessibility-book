import { apiGetChapterById, apiGetChapterByTagId } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,ChapterModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setChapter
     * @param {ChapterState} state
     * @param {ChapterModel} model
     */
    [Mutations.SET_CHAPTER]: function (state, model) {
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
     * @name fetchChapterById
     * @param {ActionContext<ChapterState,RootState>} store
     * @param {number} id
     * @returns {Promise<ChapterModel>}
     */
    [Actions.FETCH_CHAPTER_BY_ID]: async function (store, id) {
      const { commit } = store
      try {
        const res = await apiGetChapterById(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          commit(Mutations.SET_CHAPTER, res.data)
          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    /**
     * @name fetchChapterByTagId
     * @param {ActionContext<ChapterState,RootState>} store
     * @param {number} id
     * @returns {Promise<ChapterModel>}
     */
    [Actions.FETCH_CHAPTER_BY_TAG_ID]: async function (store, id) {
      const { commit } = store
      try {
        const res = await apiGetChapterByTagId(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          commit(Mutations.SET_CHAPTER, res.data)
          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
  },
  getters: {
    /**
     * @name chapterList
     * @param {ChapterState} state
     * @returns {ChapterModel[]}
     */
    [Getters.CHAPTER_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
