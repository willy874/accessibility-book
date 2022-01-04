const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}
const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
}

/**
 * @enum
 */
export const Actions = {
  ...user,
  ...storage,
}
