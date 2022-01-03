import { HttpError, handleHttpErrorLog } from '@/utils'
import { apiGetUserInfo } from '@/api'
import { Mutations, Actions } from '@/consts'

export default {
  /**
   * @name fetchUserInfo
   * @param {UserActionContext} store
   * @returns {Promise<UserModel>}
   */
  [Actions.FETCH_USER_INFO]: async function (store) {
    try {
      const res = await apiGetUserInfo()
      if (res.isAxiosError) {
        throw new HttpError(res)
      }
      store.commit(Mutations.SET_USER_INFO, res.data)
      return store.state.info
    } catch (error) {
      handleHttpErrorLog(error)
    }
  },
}
