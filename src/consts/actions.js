const root = {}

const storage = {
  SET_STORAGE: 'setStorage',
  REMOVE_STORAGE: 'removeStorage',
  GET_STORAGE: 'getStorage',
}

const user = {
  FETCH_USER_INFO: 'fetchUserInfo',
  CHECK_LOGIN_REPLACE: 'checkLoginReplace',
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
  FETCH_BOOK_BY_ID: 'fetchBookById',
}

const tag = {
  FETCH_TAG_LIST: 'fetchTagList',
}

const history = {
  FETCH_HISTORY_LIST: 'fetchHistoryList',
  ADD_HISTORY: 'addHistory',
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
}
