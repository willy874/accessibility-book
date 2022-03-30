import { actions as rootActions } from '@/store/root'
import { actions as chapterActions } from '@/store/chapter'
import { actions as bookmarkActions } from '@/store/bookmark'
import { actions as bookActions } from '@/store/book'
import { actions as historyActions } from '@/store/history'
import { actions as menuActions } from '@/store/menu'
import { actions as newsActions } from '@/store/news'
import { actions as storageActions } from '@/store/storage'
import { actions as tagActions } from '@/store/tag'
import { actions as userActions } from '@/store/user'

const { routeChange } = rootActions
const root = {
  ROUTE_CHANGE: routeChange.name,
}

const { fetchChapterById, fetchChapterListByTagId } = chapterActions
const chapter = {
  FETCH_CHAPTER_BY_ID: fetchChapterById.name,
  FETCH_CHAPTER_LIST_BY_TAG_ID: fetchChapterListByTagId.name,
}

const { fetchBookmarkList, addBookmark, deleteBookmark } = bookmarkActions
const bookmark = {
  FETCH_BOOKMARK_LIST: fetchBookmarkList.name,
  ADD_BOOKMARK: addBookmark.name,
  DELETE_BOOKMARK: deleteBookmark.name,
}

const { fetchBookList, fetchBookByQuery, fetchBookById } = bookActions
const book = {
  FETCH_BOOK_LIST: fetchBookList.name,
  FETCH_BOOK_BY_QUERY: fetchBookByQuery.name,
  FETCH_BOOK_BY_ID: fetchBookById.name,
}

const { fetchHistoryList } = historyActions
const history = {
  FETCH_HISTORY_LIST: fetchHistoryList.name,
  // ADD_HISTORY: addHistory.name,
}

const { fetchMenuList } = menuActions
const menu = {
  FETCH_MENU_LIST: fetchMenuList.name,
}

const { fetchNewsList, fetchNewsById } = newsActions
const news = {
  FETCH_NEWS_LIST: fetchNewsList.name,
  FETCH_NEWS_BY_ID: fetchNewsById.name,
}

const { setStorage, removeStorage, getStorage } = storageActions
const storage = {
  SET_STORAGE: setStorage.name,
  REMOVE_STORAGE: removeStorage.name,
  GET_STORAGE: getStorage.name,
}

const { fetchTagList } = tagActions
const tag = {
  FETCH_TAG_LIST: fetchTagList.name,
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
