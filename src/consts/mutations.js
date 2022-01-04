const root = {
  SET_INIT: 'setInit',
}

const storage = {
  CREATE_STORAGE: 'createStorage',
  UPDATE_STORAGE: 'updateStorage',
  DELETE_STORAGE: 'deleteStorage',
}

const user = {
  SET_USER_INFO: 'setUserInfo',
  REMOVE_USER_INFO: 'removeUserInfo',
}

const chapter = {
  SET_CHAPTER: 'setChapter',
}

/**
 * @enum
 */
export const Mutations = Object.assign(root, user, storage, chapter)
