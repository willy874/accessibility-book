import { apiGetMenuJson } from '@/api/index'
import { HttpError, handleHttpErrorLog } from '@/utils'
import { Getters, Mutations, Actions } from '@/consts'

export default {
  state: {
    /**
     * @type {Record<number,MenuModel>}
     */
    collection: {},
  },
  mutations: {
    /**
     * @name setMenuList
     * @param {MenuState} state
     * @param {MenuModel[]} model
     */
    [Mutations.SET_MENULIST]: function (state, model) {
      if (Object.hasOwnProperty.call(state.collection, model)) {
        state.collection[model.sort] = model
      } else {
        const collection = {
          ...state.collection,
          [model.sort]: model,
        }
        state.collection = collection
      }
    },
  },
  actions: {
    /**
     * @name fetchMenuList
     * @param {ActionContext<MenuState,RootState>} store
     * @returns {Promise<MenuModel>}
     */
    [Actions.FETCH_MENU_LIST]: async function (store) {
      const { commit } = store
      try {
        const res = await apiGetMenuJson()
        if (res.isAxiosError) {
          throw new HttpError(res)
        } else {
          const list = res.data.content.menu
          list.forEach((model) => {
            commit(Mutations.SET_MENULIST, model)
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
     * @name menuList
     * @param {MenuState} state
     * @returns {MenuModel[]}
     */
    [Getters.MENU_LIST]: function (state) {
      return Object.values(state.collection)
    },
  },
}
