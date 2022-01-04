import { apiGetChapterById } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,ChapterModel>}
     */
    chapterCollection: {},
  },
  mutations: {
    /**
     * @name setChapter
     * @param {ChapterState} state
     * @param {ChapterModel} chapter
     */
    [Mutations.SET_CHAPTER]: function (state, chapter) {
      if (Object.hasOwnProperty.call(state.chapterCollection, chapter)) {
        state.chapterCollection[chapter.id] = chapter
      } else {
        const collection = {
          ...state.chapterCollection,
          [chapter.id]: chapter,
        }
        state.chapterCollection = collection
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
  },
  getters: {
    /**
     * @name chapterList
     * @param {ChapterState} state
     * @returns {ChapterModel[]}
     */
    [Getters.CHAPTER_LIST]: function (state) {
      return Object.values(state.chapterCollection)
    },
  },
}
