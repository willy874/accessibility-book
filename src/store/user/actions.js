import { HttpError, handleHttpErrorLog } from '@/utils'
import { apiGetUserInfo, apiPatchUserInfo, apiPostUserLogin, apiPostLogout } from '@/api'
import { RouterName, StorageKey, Mutations, Actions } from '@/consts'
import Config from '@/config'

export default {
  /**
   * @name fetchUserInfo
   * @param {ActionContext<UserState,RootState>} store
   * @returns {Promise<UserModel>}
   */
  [Actions.FETCH_USER_INFO]: async function (store) {
    const { state, commit } = store
    try {
      const res = await apiGetUserInfo()
      if (res.isAxiosError) {
        throw new HttpError(res)
      }
      commit(Mutations.SET_USER_INFO, res.data)
      return state.info
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /**
   * @name fetchUserInfo
   * @param {ActionContext<UserState,RootState>} store
   * @param {UserUpdateRequestParam} data
   * @returns {Promise<UserModel>}
   */
  [Actions.UPDATED_USER_INFO]: async function (store, data) {
    const { state, commit } = store
    try {
      const res = await apiPatchUserInfo(data)
      if (res.isAxiosError) {
        throw new HttpError(res)
      }
      commit(Mutations.SET_USER_INFO, res.data)
      return state.info
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /**
   * @name checkLoginReplace
   * @param {ActionContext<UserState,RootState>} store
   * @returns {Promise<boolean>}
   */
  [Actions.CHECK_LOGIN_REPLACE]: async function (store) {
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
        if (!loginRoutes.includes(route.name)) {
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
  /**
   * @name login
   * @param {ActionContext<UserState,RootState>} store
   * @param {LoginRequestParam} data
   * @returns {Promise<LoginResponseData>}
   */
  [Actions.LOGIN]: async function (store, data) {
    const { dispatch } = store
    try {
      const res = await apiPostUserLogin(data)
      if (res.isAxiosError) {
        throw new HttpError(res)
      }
      const token = res.data.key
      await dispatch(Actions.SET_STORAGE, { key: StorageKey.TOKEN, value: token })
      return token
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
  /**
   * @name logout
   * @param {ActionContext<UserState,RootState>} store
   * @returns {Promise<null>}
   */
  [Actions.LOGOUT]: async function (store) {
    const { commit, dispatch } = store
    try {
      const res = await apiPostLogout()
      if (res.isAxiosError) {
        throw new HttpError(res)
      }
      commit(Mutations.REMOVE_USER_INFO)
      await dispatch(Actions.REMOVE_STORAGE, StorageKey.TOKEN)
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
