import { apiGetChapterById, apiGetChapterListByTagId } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,ChapterModel>}
     */
    collection: {},
    activeBook: null,
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
    /**
     * @name setChapterActiveBook
     * @param {ChapterState} state
     * @param {BookModel} model
     */
    [Mutations.SET_CHAPTER_ACTIVE_BOOK]: function (state, model) {
      state.activeBook = model
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
      const { commit, dispatch } = store
      try {
        const res = await apiGetChapterById(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const chapter = res.data
          const book = await dispatch(Actions.FETCH_BOOK_BY_ID, chapter.book)
          commit(Mutations.SET_CHAPTER_ACTIVE_BOOK, book)
          commit(Mutations.SET_CHAPTER, chapter)
          return res.data
        }
      } catch (error) {
        return handleHttpErrorLog(error)
      }
    },
    /**
     * @name fetchChapterListByTagId
     * @param {ActionContext<ChapterState,RootState>} store
     * @param {number} id
     * @returns {Promise<ChapterModel>}
     */
    [Actions.FETCH_CHAPTER_LIST_BY_TAG_ID]: async function (store, id) {
      const { commit } = store
      try {
        const res = await apiGetChapterListByTagId(id)
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.results
          list.forEach((model) => {
            commit(Mutations.SET_CHAPTER, model)
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
     * @name chapterList
     * @param {ChapterState} state
     * @returns {ChapterModel[]}
     */
    [Getters.CHAPTER_LIST]: function (state) {
      return Object.values(state.collection)
    },
    /**
     * @name getChapterListById
     * @param {ChapterState} state
     * @returns {(id: number) => ChapterState}
     */
    [Getters.GET_CHAPTER_BY_ID]: function (state) {
      return (id) => state.collection[id]
    },
  },
}
