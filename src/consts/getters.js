/**
 * @typedef {import('@/store')}
 */
const root = {
  IS_LOGIN: 'isLogin',
}

/**
 * @typedef {import('@/store/bookmark')}
 */
const bookmark = {
  BOOKMARK_LIST: 'bookmarkList',
}

/**
 * @typedef {import('@/store/chapter')}
 */
const chapter = {
  CHAPTER_LIST: 'chapterList',
}

/**
 * @typedef {import('@/store/storage')}
 */
const book = {
  BOOK_LIST: 'bookList',
}

/**
 * @typedef {import('@/store/tag')}
 */
const tag = {
  TAG_LIST: 'tagList',
}

/**
 * @typedef {import('@/store/history')}
 */
const history = {
  HISTORY_LIST: 'historyList',
}

/**
 * @typedef {import('@/store/menu')}
 */
const menu = {
  MENU_LIST: 'menuList',
}

/**
 * @typedef {import('@/store/news')}
 */
const news = {
  NEWS_LIST: 'newsList',
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
