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

const bookmark = {
  SET_BOOKMARK: 'setBookmark',
  REMOVE_BOOKMARK: 'removeBookmark',
}

/**
 * @enum
 */
export const Mutations = {
  ...root,
  ...user,
  ...storage,
  ...chapter,
  ...bookmark,
}
