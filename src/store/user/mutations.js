/**
 * @callback setUserInfo
 * @param {UserState} state
 * @param {UserModel} data
 */
/**
 * @callback removeUserInfo
 * @param {UserState} state
 */
/** @type {MutationTree<UserState>} */
export default {
  /** @type {setUserInfo} */
  setUserInfo(state, data) {
    state.info = data
  },
  /** @type {removeUserInfo} */
  removeUserInfo(state) {
    state.info = null
  },
}
