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
 * @typedef {Object} RootState
 * @property {boolean} init
 * @property {UserState} user
 * @property {StorageState} storage
 */
