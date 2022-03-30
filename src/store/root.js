import { Mutations } from '@/consts'
import Config from '@/config'

export const state = {
  init: false,
  route: null,
  loading: false,
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
}

/**
 * @callback routeChange
 * @param {ActionContext<RootState>} store
 * @param {Vue} vm
 * @returns {Promise<Route>}
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
}
