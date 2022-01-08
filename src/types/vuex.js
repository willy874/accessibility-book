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
 * @typedef {Object} MenuListState
 * @property {Record<number,MenuListModel>} collection
 */
/**
 * @typedef {Object} RootState
 * @property {boolean} init
 * @property {UserState} user
 * @property {StorageState} storage
 */
