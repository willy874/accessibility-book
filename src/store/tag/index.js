import { apiGetTagList } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

export const state = {
  /**
   * @type {Record<number,TagModel>}
   */
  collection: {},
}

/**
 * @callback tagList
 * @param {TagState} state
 * @returns {TagModel[]}
 */
/** @type {GetterTree<TagState>} */
export const getters = {
  /** @type {tagList} */
  tagList(state) {
    return Object.values(state.collection)
  },
}

/**
 * @callback setTag
 * @param {TagState} state
 * @param {TagModel} model
 */
/** @type {MutationTree<TagState>} */
export const mutations = {
  /** @type {setTag} */
  setTag(state, model) {
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
 * @callback fetchTagList
 * @param {ActionContext<TagState>} store
 * @param {void} payload
 * @returns {Promise<TagModel[]>}
 */
/** @type {ActionTree<TagState>} */
export const actions = {
  /** @type {fetchTagList} */
  async fetchTagList(store, payload) {
    const { commit } = store
    try {
      const res = await apiGetTagList()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.results
        list.forEach((model) => {
          commit(Mutations.SET_TAG, model)
        })

        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
