import { Mutations } from '@/consts'
import Config from '@/config'
import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { apiGetSiteConf } from '@/api/index'

export const state = {
  init: false,
  route: null,
  loading: false,
  aboutText: '',
}

/** @type {GetterTree<RootState>} */
export const getters = {}

/**
 * @callback setInit
 * @param {RootState} state
 * @param {boolean} bool
 */
/**
 * @callback setRoute
 * @param {RootState} state
 * @param {Route} route
 */
/**
 * @callback setLoading
 * @param {RootState} state
 * @param {boolean} bool
 */
/**
 * @callback aboutText
 * @param {RootState} state
 * @param {string} str
 */
/** @type {MutationTree<RootState>} */
export const mutations = {
  /** @type {setInit} */
  setInit(state, bool) {
    state.init = bool
  },
  /** @type {setRoute} */
  setRoute(state, route) {
    state.route = route
  },
  /** @type {setLoading} */
  setLoading(state, bool) {
    state.loading = bool
  },
  /** @type {aboutText} */
  setAboutText(state, str) {
    state.aboutText = str
  },
}

/**
 * @callback routeChange
 * @param {ActionContext<RootState>} store
 * @param {Vue} vm
 * @returns {Promise<Route>}
 */
/**
 * @callback fetchSiteConf
 * @param {ActionContext<RootState>} store
 * @returns {Promise<SiteConf>}
 */
/** @type {ActionTree<RootState>} */
export const actions = {
  /** @type {routeChange} */
  async routeChange(store, vm) {
    const { commit } = store
    const route = Config.getRoute(vm)
    commit(Mutations.SET_ROUTE, route)
    return route
  },
  /** @type {fetchSiteConf} */
  async fetchSiteConf(store) {
    try {
      const res = await apiGetSiteConf()
      store.commit('setAboutText', res.data.about)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      } else {
        return res.data
      }
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
