import { actions as storageActions } from '@/store/storage'
import { actions as tagActions } from '@/store/tag'
import { actions as userActions } from '@/store/user'

const root = {
  ROUTE_CHANGE: 'routeChange',
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
  FETCH_NEWS_BY_ID: 'fetchNewsById',
}

const { setStorage, removeStorage, getStorage } = storageActions
const storage = {
  SET_STORAGE: setStorage.name,
  REMOVE_STORAGE: removeStorage.name,
  GET_STORAGE: getStorage.name,
}

const { fetchTagList } = tagActions
const tag = {
  FETCH_TAG_LIST: fetchTagList.name, // 'fetchTagList'
}

const { fetchUserInfo, checkLoginReplace, updateUserInfo, login, logout } = userActions
const user = {
  FETCH_USER_INFO: fetchUserInfo.name,
  CHECK_LOGIN_REPLACE: checkLoginReplace.name,
  UPDATED_USER_INFO: updateUserInfo.name,
  LOGIN: login.name,
  LOGOUT: logout.name,
}

/**
 * @enum {string}
 */
export const Actions = {
  ...root,
  ...chapter,
  ...bookmark,
  ...book,
  ...history,
  ...menu,
  ...news,
  ...user,
  ...tag,
  ...storage,
}
