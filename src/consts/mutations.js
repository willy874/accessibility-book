const storage = {
  CREATE_STORAGE: 'createStorage',
  UPDATE_STORAGE: 'updateStorage',
  DELETE_STORAGE: 'deleteStorage',
}

const user = {
  SET_USER_INFO: 'setUserInfo',
}

/**
 * @enum
 */
export const Mutations = {
  ...user,
  ...storage,
}
