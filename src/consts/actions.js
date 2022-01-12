/**
 * @typedef {import('@/store')}
 */
const root = {}

/**
 * @typedef {import('@/store/storage')}
 */
const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}

/**
 * @typedef {import('@/store/user/actions')}
 */
const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
  CHECK_LOGIN_REPLACE: 'checkLoginReplace',
  UPDATED_USER_INFO: 'updateUserInfo',
  LOGIN: 'login',
  LOGOUT: 'logout',
}

/**
 * @typedef {import('@/store/chapter')}
 */
const chapter = {
  FETCH_CHAPTER_BY_ID: 'fetchChapterById',
  FETCH_CHAPTER_LIST_BY_TAG_ID: 'fetchChapterListByTagId',
}

/**
 * @typedef {import('@/store/bookmark')}
 */
const bookmark = {
  FETCH_BOOKMARK_LIST: 'fetchBookmarkList',
  ADD_BOOKMARK: 'addBookmark',
  DELETE_BOOKMARK: 'deleteBookmark',
}

/**
 * @typedef {import('@/store/book')}
 */
const book = {
  FETCH_BOOK_LIST: 'fetchBookList',
  FETCH_BOOK_LIST_BY_QUERY: 'fetchBookListByQuery',
  FETCH_BOOK_BY_ID: 'fetchBookById',
}

/**
 * @typedef {import('@/store/tag')}
 */
const tag = {
  FETCH_TAG_LIST: 'fetchTagList',
}

/**
 * @typedef {import('@/store/history')}
 */
const history = {
  FETCH_HISTORY_LIST: 'fetchHistoryList',
  ADD_HISTORY: 'addHistory',
}

/**
 * @typedef {import('@/store/menu')}
 */
const menu = {
  FETCH_MENU_LIST: 'fetchMenuList',
}

/**
 * @typedef {import('@/store/news')}
 */
const news = {
  FETCH_NEWS_LIST: 'fetchNewsList',
}

/**
 * @enum {string}
 */
export const Actions = {
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
