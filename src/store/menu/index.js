import { apiGetMenuJson } from '@/api/index'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { Mutations } from '@/consts'

/** @type {MenuState} */
export const state = {
  /**
   * @type {Record<number,MenuModel>}
   */
  collection: {},
}

/**
 * @callback menuList
 * @param {MenuState} state
 * @returns {MenuModel[]}
 */
/** @type {GetterTree<MenuState>} */
export const getters = {
  /** @type {menuList} */
  menuList(state) {
    return Object.values(state.collection)
  },
}

/**
 * @callback setMenuList
 * @param {MenuState} state
 * @param {MenuModel} model
 */
/** @type {MutationTree<MenuState>} */
export const mutations = {
  setMenuList(state, model) {
    if (Object.hasOwnProperty.call(state.collection, model)) {
      state.collection[model.uuid] = model
    } else {
      const collection = {
        ...state.collection,
        [model.uuid]: model,
      }
      state.collection = collection
    }
  },
}

/**
 * @callback fetchMenuList
 * @param {ActionContext<MenuState>} store
 * @param {void} payload
 * @returns {Promise<MenuModel>}
 */
/** @type {ActionTree<MenuState>} */
export const actions = {
  async fetchMenuList(store, payload) {
    const { commit } = store
    try {
      const res = await apiGetMenuJson()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        const list = res.data.content.menu
        list.forEach((model) => {
          commit(Mutations.SET_MENULIST, model)
        })
        return list
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
