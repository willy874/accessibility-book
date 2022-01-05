const root = {
  IS_LOGIN: 'isLogin',
}

const bookmark = {
  BOOKMARK_LIST: 'bookmarkList',
}

const chapter = {
  CHAPTER_LIST: 'chapterList',
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

export const Getters = {
  ...root,
  ...chapter,
  ...bookmark,
  ...book,
  ...tag,
  ...history,
}
