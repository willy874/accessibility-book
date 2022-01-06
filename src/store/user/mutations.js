import { Mutations } from '@/consts'

export default {
  /**
   * @name setUserInfo
   * @param {UserState} state
   * @param {UserModel} data
   */
  [Mutations.SET_USER_INFO]: function (state, data) {
    state.info = data
  },
  /**
   * @name removeUserInfo
   * @param {UserState} state
   */
  [Mutations.REMOVE_USER_INFO]: function (state) {
    state.info = null
  },
}
