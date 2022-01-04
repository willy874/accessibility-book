import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/index'
import storage from './storage/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    init: false,
  },
  mutations: {},
  actions: {},
  getter: {},
  modules: {
    user,
    storage,
  },
})
