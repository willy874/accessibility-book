/**
 * @template S
 * @typedef {import('vuex').Store<S>} Store
 */
/**
 * @template S,R
 * @typedef {import('vuex').ActionContext<S,R>} ActionContext
 */
/**
 * @typedef {Object} UserState
 * @property {UserModel} info
 */
/**
 * @typedef {Object} StorageState
 * @property {Record<StorageKey,string>} local
 */
/**
 * @typedef {Object} ChapterState
 * @property {Record<number,ChapterModel>} collection
 */
/**
 * @typedef {Object} BookMarkState
 * @property {Record<number,BookMarkModel>} collection
 */
/**
 * @typedef {Object} BookState
 * @property {Record<number,BookModel>} collection
 */
/**
 * @typedef {Object} TagState
 * @property {Record<number,TagModel>} collection
 */
/**
 * @typedef {Object} HistoryState
 * @property {Record<number,HistoryModel>} collection
 */
/**
 * @typedef {Object} MenuState
 * @property {Record<number,MenuModel>} collection
 */
/**
 * @typedef {Object} NewsState
 * @property {Record<number,NewsModel>} collection
 */
/**
 * @typedef {Object} RootState
 * @property {boolean} init
 * @property {Route} route
 * @property {boolean} loading
 * @property {UserState} user
 * @property {StorageState} storage
 * @property {ChapterState} chapter
 * @property {BookMarkState} bookmark
 * @property {BookState} book
 * @property {TagState} tag
 * @property {HistoryState} history
 * @property {MenuState} menu
 */
