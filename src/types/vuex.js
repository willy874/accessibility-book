/**
 * @template S
 * @typedef {import('vuex').Store<S>} Store
 */
/**
 * @template S
 * @template R
 * @typedef {import('vuex').ActionContext<S,R>} ActionContext
 */
/**
 * @typedef {Object} RootState
 * @property {boolean} init
 */
/**
 * @typedef {Object} UserState
 * @property {UserModel} info
 */
/**
 * @typedef {ActionContext<UserState,RootState>} UserActionContext
 */
