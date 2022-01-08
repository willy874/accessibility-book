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

const book = {
  SET_BOOK: 'setBook',
}

const tag = {
  SET_TAG: 'setTag',
}

const history = {
  SET_HISTORY: 'setHistory',
}

const menulist = {
  SET_MENULIST: 'setMenuList',
}

/**
 * @enum {string}
 */
export const Mutations = {
  ...root,
  ...user,
  ...storage,
  ...chapter,
  ...bookmark,
  ...book,
  ...tag,
  ...history,
  ...menulist,
}
