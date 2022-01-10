const root = {}

const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}

const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
  CHECK_LOGIN_REPLACE: 'checkLoginReplace',
  UPDATED_USER_INFO: 'updateUserInfo',
  LOGIN: 'login',
  LOGOUT: 'logout',
}

const chapter = {
  FETCH_CHAPTER_BY_ID: 'fetchChapterById',
  FETCH_CHAPTER_LIST_BY_TAG_ID: 'fetchChapterListByTagId',
}

const bookmark = {
  FETCH_BOOKMARK_LIST: 'fetchBookmarkList',
  ADD_BOOKMARK: 'addBookmark',
  DELETE_BOOKMARK: 'deleteBookmark',
}

const book = {
  FETCH_BOOK_LIST: 'fetchBookList',
  FETCH_BOOK_LIST_BY_QUERY: 'fetchBookListByQuery',
  FETCH_BOOK_BY_ID: 'fetchBookById',
}

const tag = {
  FETCH_TAG_LIST: 'fetchTagList',
}

const history = {
  FETCH_HISTORY_LIST: 'fetchHistoryList',
  ADD_HISTORY: 'addHistory',
}

const menulist = {
  FETCH_MENU_LIST: 'fetchMenuList',
}

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
  ...menulist,
  ...news,
}
