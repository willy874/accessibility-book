import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/config'
import { Getters, Mutations, Actions } from '@/consts'
import * as user from './user/index'
import * as storage from './storage/index'
import chapter from './chapter/index'
import bookmark from './bookmark/index'
import book from './book/index'
import tag from './tag/index'
import history from './history/index'
import menu from './menu/index'
import news from './news/index'

Vue.use(Vuex)

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
    /**
     * @name fetchUserInfo
     * @param {Store<RootState>} store
     * @param {Vue>} vm
     * @returns {Promise<void>}
     */
    [Actions.ROUTE_CHANGE]: async function (store, vm) {
      const { commit } = store
      const route = Config.getRoute(vm)
      // instance.$router.replace(route)
      commit(Mutations.SET_ROUTE, route)
      return route
    },
  },
  getters: {
    /**
     * @param {RootState} state
     * @returns {boolean}
     */
    [Getters.IS_LOGIN]: function (state) {
      return Boolean(state.user.info && state.storage.storage)
    },
  },
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
