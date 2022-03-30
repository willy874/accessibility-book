import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations, actions } from './root'
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
  state,
  // getters,
  mutations,
  actions,
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
