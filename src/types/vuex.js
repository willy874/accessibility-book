/**
 * @typedef {import('vuex').Store<RootState>} Store
 */
/**
 * @template S,R
 * @typedef {import('vuex').Module<S,R>} Module
 */
/**
 * @template S
 * @typedef {import('vuex').GetterTree<S,RootState>} GetterTree
 */
/**
 * @template S
 * @typedef {import('vuex').MutationTree<S>} MutationTree
 */
/**
 * @template S,R
 * @typedef {{ [key: string]: import('vuex').ActionHandler<S,R> }} ActionTree
 */
/**
 * @template S,R
 * @typedef {import('vuex').ActionHandler<S,R>} ActionHandler
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
 * @property {Record<import('@/consts').StorageKey,string>} local
 */
/**
 * @typedef {Object} ChapterState
 * @property {Record<number,ChapterModel>} collection
 * @property {BookModel} activeBook
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
 */
/**
 * @template {(...args: any) => any} F
 * @typedef {function(Parameters<F>[1]): ReturnType<F>} ActionFunction
 */
