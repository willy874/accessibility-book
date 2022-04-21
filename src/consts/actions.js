const root = {
  ROUTE_CHANGE: 'routeChange',
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
  FETCH_BOOK_BY_ID: 'fetchBookById',
  FETCH_BOOK_BY_QUERY: 'fetchBookByQuery',
}

const history = {
  FETCH_HISTORY_LIST: 'fetchHistoryList',
  // ADD_HISTORY: addHistory,
}

const menu = {
  FETCH_MENU_LIST: 'fetchMenuList',
}

const news = {
  FETCH_NEWS_LIST: 'fetchNewsList',
  FETCH_NEWS_BY_ID: 'fetchNewsById',
}

const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}

const tag = {
  FETCH_TAG_LIST: 'fetchTagList',
}

const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
  CHECK_LOGIN_REPLACE: 'checkLoginReplace',
  UPDATED_USER_INFO: 'updateUserInfo',
  LOGIN: 'login',
  LOGOUT: 'logout',
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
