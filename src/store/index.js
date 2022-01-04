import Vue from 'vue'
import Vuex from 'vuex'
import { Getters, Mutations } from '@/consts'
import user from './user/index'
import storage from './storage/index'
import chapter from './chapter/index'
import bookmark from './bookmark/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    init: false,
  },
  mutations: {
    /**
     * @param {RootState} state
     * @param {boolean} bool
     * @returns {boolean}
     */
    [Mutations.SET_INIT]: function (state, bool) {
      state.init = bool
    },
  },
  actions: {},
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
  },
})
