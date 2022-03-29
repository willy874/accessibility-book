import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/config'
import { Mutations, Actions } from '@/consts'
import * as book from './book/index'
import * as bookmark from './bookmark/index'
import * as chapter from './chapter/index'
import * as history from './history/index'
import * as menu from './menu/index'
import * as news from './news/index'
import * as user from './user/index'
import * as tag from './tag/index'
import * as storage from './storage/index'

Vue.use(Vuex)

/**
 * @type {Store}
 */
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    init: false,
    route: null,
    loading: false,
  },
  mutations: {
    /**
     * @param {RootState} state
     * @param {boolean} bool
     */
    [Mutations.SET_INIT]: function (state, bool) {
      state.init = bool
    },
    /**
     * @param {RootState} state
     * @param {Route} route
     */
    [Mutations.SET_ROUTE]: function (state, route) {
      state.route = route
    },
    /**
     * @name setLoading
     * @param {RootState} state
     * @param {boolean} bool
     */
    [Mutations.SET_LOADING]: function (state, bool) {
      state.loading = bool
    },
  },
  actions: {
    [Actions.ROUTE_CHANGE]: async function (store, vm) {
      const { commit } = store
      const route = Config.getRoute(vm)
      commit(Mutations.SET_ROUTE, route)
      return route
    },
  },
  getters: {},
  /**
   * @typedef {Object} ModuleTree
   * @property {typeof book} book
   * @property {typeof bookmark} bookmark
   * @property {typeof chapter} chapter
   * @property {typeof history} history
   * @property {typeof menu} menu
   * @property {typeof news} news
   * @property {typeof user} user
   * @property {typeof tag} tag
   * @property {typeof storage} storage
   */
  /**
   * @type {ModuleTree}
   */
  modules: {
    user,
    storage,
    chapter,
    bookmark,
    book,
    tag,
    history,
    menu,
    news,
  },
})
