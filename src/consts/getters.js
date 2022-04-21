const root = {}

const bookmark = {
  BOOKMARK_LIST: 'bookmarkList',
}

const chapter = {
  CHAPTER_LIST: 'chapterList',
  GET_CHAPTER_BY_ID: 'getChapterListById',
}

const book = {
  BOOK_LIST: 'bookList',
}

const tag = {
  TAG_LIST: 'tagList',
}

const history = {
  HISTORY_LIST: 'historyList',
}

const menu = {
  MENU_LIST: 'menuList',
}

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
