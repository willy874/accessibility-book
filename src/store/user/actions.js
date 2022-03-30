import { HttpError, handleHttpErrorLog, isAxiosError } from '@/utils'
import { apiGetUserInfo, apiPatchUserInfo, apiPostUserLogin, apiPostLogout } from '@/api'
import { RouterName, StorageKey, Mutations, Actions } from '@/consts'
import Config from '@/config'

/**
 * @callback fetchUserInfo
 * @param {ActionContext<UserState>} store
 * @returns {Promise<UserModel>}
 */
/**
 * @callback updateUserInfo
 * @param {ActionContext<UserState>} store
 * @param {UserUpdateRequestParam} data
 * @returns {Promise<UserModel>}
 */
/**
 * @callback checkLoginReplace
 * @param {ActionContext<UserState>} store
 * @returns {Promise<boolean>}
 */
/**
 * @callback login
 * @param {ActionContext<UserState>} store
 * @param {LoginRequestParam} data
 * @returns {Promise<string>}
 */
/**
 * @callback logout
 * @param {ActionContext<UserState>} store
 * @returns {Promise<void>}
 */
/** @type {ActionTree<UserState>} */
export default {
  /** @type {fetchUserInfo} */
  async fetchUserInfo(store) {
    const { state, commit } = store
    try {
      const res = await apiGetUserInfo()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      }
      commit(Mutations.SET_USER_INFO, res.data)
      return state.info
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },

  /** @type {updateUserInfo} */
  async updateUserInfo(store, data) {
    const { state, commit } = store
    try {
      const res = await apiPatchUserInfo(data)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      }
      commit(Mutations.SET_USER_INFO, res.data)
      return state.info
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },

  /** @type {checkLoginReplace} */
  async checkLoginReplace(store) {
    const { dispatch } = store
    try {
      /** @type {Vue} */
      const vm = Config.useApp()
      /** @type {Route} */
      const route = Config.getRoute()
      const loginRoutes = Config.value.loginRoutes
      const token = await dispatch(Actions.GET_STORAGE, StorageKey.TOKEN)
      if (token) {
        if (loginRoutes.includes(route.name)) {
          const replaceRoute = await dispatch(Actions.GET_STORAGE, StorageKey.REPLACE_ROUTE)
          if (replaceRoute) {
            await vm.$router.replace({ name: replaceRoute })
            await dispatch(Actions.REMOVE_STORAGE, StorageKey.REPLACE_ROUTE)
          } else {
            await vm.$router.replace({ name: RouterName.HOME })
          }
        }
        return true
      } else {
        if (loginRoutes.includes(route.name)) {
        } else {
          await dispatch(Actions.SET_STORAGE, { key: StorageKey.REPLACE_ROUTE, value: route.name })
        }
        await dispatch(Actions.REMOVE_STORAGE, StorageKey.TOKEN)
        if (route.name !== RouterName.LOGIN) {
          vm.$router.replace({ name: RouterName.LOGIN })
        }
        return false
      }
    } catch (error) {
      return false
    }
  },

  /** @type {login} */
  async login(store, data) {
    const { dispatch } = store
    try {
      const res = await apiPostUserLogin(data)
      if (isAxiosError(res)) {
        throw new HttpError(res)
      }
      const token = res.data.key
      await dispatch(Actions.SET_STORAGE, { key: StorageKey.TOKEN, value: token })
      return token
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },

  /** @type {logout} */
  async logout(store) {
    const { commit, dispatch } = store
    try {
      const res = await apiPostLogout()
      if (isAxiosError(res)) {
        throw new HttpError(res)
      }
      commit(Mutations.REMOVE_USER_INFO)
      await dispatch(Actions.REMOVE_STORAGE, StorageKey.TOKEN)
      await dispatch(Actions.CHECK_LOGIN_REPLACE)
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
