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
}

const bookmark = {
  FETCH_BOOKMARK_LIST: 'fetchBookmarkList',
  ADD_BOOKMARK: 'addBookmark',
  DELETE_BOOKMARK: 'deleteBookmark',
}

/**
 * @enum
 */
export const Actions = {
  ...root,
  ...user,
  ...storage,
  ...chapter,
  ...bookmark,
}
