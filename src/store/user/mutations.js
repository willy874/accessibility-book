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
}
