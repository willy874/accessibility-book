const root = {
  SET_INIT: 'setInit',
  SET_ROUTE: 'setRoute',
  SET_LOADING: 'setLoading',
}

const chapter = {
  SET_CHAPTER: 'setChapter',
  SET_CHAPTER_ACTIVE_BOOK: 'setChapterActiveBook',
}

const bookmark = {
  SET_BOOKMARK: 'setBookmark',
  REMOVE_BOOKMARK: 'removeBookmark',
}

const book = {
  SET_BOOK: 'setBook',
}

const history = {
  SET_HISTORY: 'setHistory',
}

const menu = {
  SET_MENULIST: 'setMenuList',
}

const news = {
  SET_NEWS: 'setNews',
}

const storage = {
  CREATE_STORAGE: 'createStorage',
  UPDATE_STORAGE: 'updateStorage',
  DELETE_STORAGE: 'deleteStorage',
}

const tag = {
  SET_TAG: 'setTag',
}

const user = {
  SET_USER_INFO: 'setUserInfo',
  REMOVE_USER_INFO: 'removeUserInfo',
}

/**
 * @enum {string}
 */
export const Mutations = {
  ...root,
  ...chapter,
  ...bookmark,
  ...book,
  ...history,
  ...menu,
  ...news,
  ...storage,
  ...tag,
  ...user,
}
