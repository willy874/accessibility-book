/**
 * @typedef {import('@/store')}
 */
const root = {
  SET_INIT: 'setInit',
}

/**
 * @typedef {import('@/store/storage')}
 */
const storage = {
  CREATE_STORAGE: 'createStorage',
  UPDATE_STORAGE: 'updateStorage',
  DELETE_STORAGE: 'deleteStorage',
}

/**
 * @typedef {import('@/store/user/mutations')}
 */
const user = {
  SET_USER_INFO: 'setUserInfo',
  REMOVE_USER_INFO: 'removeUserInfo',
}

/**
 * @typedef {import('@/store/chapter')}
 */
const chapter = {
  SET_CHAPTER: 'setChapter',
}

/**
 * @typedef {import('@/store/bookmark')}
 */
const bookmark = {
  SET_BOOKMARK: 'setBookmark',
  REMOVE_BOOKMARK: 'removeBookmark',
}

/**
 * @typedef {import('@/store/book')}
 */
const book = {
  SET_BOOK: 'setBook',
}

/**
 * @typedef {import('@/store/tag')}
 */
const tag = {
  SET_TAG: 'setTag',
}

/**
 * @typedef {import('@/store/history')}
 */
const history = {
  SET_HISTORY: 'setHistory',
}

/**
 * @typedef {import('@/store/menu')}
 */
const menu = {
  SET_MENULIST: 'setMenuList',
}

/**
 * @typedef {import('@/store/news')}
 */
const news = {
  SET_NEWS: 'setNews',
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
  ...menu,
  ...news,
}
