import { mutations as rootMutations } from '@/store/root'
import { mutations as chapterMutations } from '@/store/chapter'
import { mutations as bookmarkMutations } from '@/store/bookmark'
import { mutations as bookMutations } from '@/store/book'
import { mutations as historyMutations } from '@/store/history'
import { mutations as menuMutations } from '@/store/menu'
import { mutations as newsMutations } from '@/store/news'
import { mutations as storageMutations } from '@/store/storage'
import { mutations as tagMutations } from '@/store/tag'
import { mutations as userMutations } from '@/store/user'

const { setInit, setRoute, setLoading } = rootMutations
const root = {
  SET_INIT: setInit.name,
  SET_ROUTE: setRoute.name,
  SET_LOADING: setLoading.name,
}

const { setChapter, setChapterActiveBook } = chapterMutations
const chapter = {
  SET_CHAPTER: setChapter.name,
  SET_CHAPTER_ACTIVE_BOOK: setChapterActiveBook.name,
}

const { setBookmark, removeBookmark } = bookmarkMutations
const bookmark = {
  SET_BOOKMARK: setBookmark.name,
  REMOVE_BOOKMARK: removeBookmark.name,
}

const { setBook } = bookMutations
const book = {
  SET_BOOK: setBook.name,
}

const { setHistory } = historyMutations
const history = {
  SET_HISTORY: setHistory.name,
}

const { setMenuList } = menuMutations
const menu = {
  SET_MENULIST: setMenuList.name,
}

const { setNews } = newsMutations
const news = {
  SET_NEWS: setNews.name,
}

const { createStorage, updateStorage, deleteStorage } = storageMutations
const storage = {
  CREATE_STORAGE: createStorage.name,
  UPDATE_STORAGE: updateStorage.name,
  DELETE_STORAGE: deleteStorage.name,
}

const { setTag } = tagMutations
const tag = {
  SET_TAG: setTag.name,
}

const { setUserInfo, removeUserInfo } = userMutations
const user = {
  SET_USER_INFO: setUserInfo.name,
  REMOVE_USER_INFO: removeUserInfo.name,
}

/**
 * @enum {string}
 */
export const Mutations = {
  ...root,
  ...chapter,
  ...bookmark,
  ...book,
  ...history,
  ...menu,
  ...news,
  ...storage,
  ...tag,
  ...user,
}
