import { apiGetChapterById, apiGetChapterListByTagId } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations, Actions } from '@/consts'

/** @type {ChapterState} */
export const state = {
  /**
   * @type {Record<number,ChapterModel>}
   */
  collection: {},
  activeBook: null,
}

/**
 * @callback chapterList
 * @param {ChapterState} state
 * @returns {ChapterModel[]}
 */
/**
 * @callback getChapterListById
 * @param {ChapterState} state
 * @returns {(id: number) => ChapterModel}
 */
/** @type {GetterTree<ChapterState>} */
export const getters = {
  /** @type {chapterList} */
  chapterList(state) {
    return Object.values(state.collection)
  },
  /** @type {getChapterListById} */
  getChapterListById(state) {
    return (id) => state.collection[id]
  },
}

/**
 * @callback setChapter
 * @param {ChapterState} state
 * @param {ChapterModel} model
 */
/**
 * @callback setChapterActiveBook
 * @param {ChapterState} state
 * @param {BookModel} model
 */
/** @type {MutationTree<ChapterState>} */
export const mutations = {
  /** @type {setChapter} */
  setChapter(state, model) {
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
  /** @type {setChapterActiveBook} */
  setChapterActiveBook(state, model) {
    state.activeBook = model
  },
}

/**
 * @callback fetchChapterById
 * @param {ActionContext<ChapterState>} store
 * @param {number} id
 * @returns {Promise<ChapterModel>}
 */
/**
 * @callback fetchChapterListByTagId
 * @param {ActionContext<ChapterState>} store
 * @param {number} id
 * @returns {Promise<ChapterModel[]>}
 */
/** @type {ActionTree<ChapterState>} */
export const actions = {
  /** @type {fetchChapterById} */
  async fetchChapterById(store, id) {
    const { commit, dispatch } = store
    try {
      const res = await apiGetChapterById(id)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const chapter = res.data
        const book = await dispatch(Actions.FETCH_BOOK_BY_ID, chapter.book)
        commit(Mutations.SET_CHAPTER_ACTIVE_BOOK, book)
        commit(Mutations.SET_CHAPTER, chapter)
        return res.data
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /** @type {fetchChapterListByTagId} */
  async fetchChapterListByTagId(store, id) {
    const { commit } = store
    try {
      const res = await apiGetChapterListByTagId(id)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_CHAPTER, model)
        })
        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
