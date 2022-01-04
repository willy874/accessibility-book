import { apiGetChapterById } from '@/api/index'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,ChapterModel>}
     */
    ChapterCollection: {},
  },
  mutations: {
    /**
     * @name setChapter
     * @param {ChapterState} state
     * @param {ChapterModel} data
     */
    [Mutations.SET_CHAPTER]: function (state, data) {
      const collection = {
        ...state.ChapterCollection,
        [data.id]: data,
      }
      state.ChapterCollection = collection
    },
  },
  actions: {
    /**
     * @name fetchChapterById
     * @param {ActionContext<object,RootState>} store
     * @param {number} id
     * @returns {Promise<ChapterModel>}
     */
    [Actions.FETCH_CHAPTER_BY_ID]: async function (store, id) {
      const { commit } = store
      const res = await apiGetChapterById()
      commit(Mutations.SET_CHAPTER, res.data)
      return res.data
    },
  },
  getters: {
    /**
     * @name chapterList
     * @param {ChapterState} state
     * @returns {ChapterModel[]}
     */
    [Getters.CHAPTER_LIST]: function (state) {
      return Object.values(state.ChapterCollection)
    },
  },
}
