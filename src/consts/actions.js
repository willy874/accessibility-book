const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}
const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
  CHECK_LOGIN_REPLACE: 'checkLoginReplace',
  LOGIN: 'login',
  LOGOUT: 'logout',
}
const root = {}
/**
 * @enum
 */
export const Actions = Object.assign(root, user, storage)
