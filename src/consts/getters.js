// import { getters as rootGetters } from '@/store/root'
import { getters as chapterGetters } from '@/store/chapter'
import { getters as bookmarkGetters } from '@/store/bookmark'
import { getters as bookGetters } from '@/store/book'
import { getters as historyGetters } from '@/store/history'
import { getters as menuGetters } from '@/store/menu'
import { getters as newsGetters } from '@/store/news'
// import { getters as storageGetters } from '@/store/storage'
import { getters as tagGetters } from '@/store/tag'
// import { getters as userGetters } from '@/store/user'

const root = {}

const { bookmarkList, bookmarkListById, getBookListByTagId } = bookmarkGetters
const bookmark = {
  BOOKMARK_LIST: bookmarkList.name,
  GET_BOOKMARK_BY_ID: bookmarkListById.name,
  GET_BOOKMARK_LIST_BY_TAG_ID: getBookListByTagId.name,
}

const { chapterList, getChapterListById } = chapterGetters
const chapter = {
  CHAPTER_LIST: chapterList.name,
  GET_CHAPTER_BY_ID: getChapterListById.name,
}

const { bookList } = bookGetters
const book = {
  BOOK_LIST: bookList.name,
}

const { tagList } = tagGetters
const tag = {
  TAG_LIST: tagList.name,
}

const { historyList } = historyGetters
const history = {
  HISTORY_LIST: historyList.name,
}

const { menuList } = menuGetters
const menu = {
  MENU_LIST: menuList.name,
}

const { newsList } = newsGetters
const news = {
  NEWS_LIST: newsList.name,
}

/**
 * @enum {string}
 */
export const Getters = {
  ...root,
  ...chapter,
  ...bookmark,
  ...book,
  ...tag,
  ...history,
  ...menu,
  ...news,
}
