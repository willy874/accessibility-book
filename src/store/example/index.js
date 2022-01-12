/**
 * @enum
 */
const Actions = {
  TEST: 'test',
}
/**
 * @enum
 */
const Mutations = {
  TEST: 'test',
}
/**
 * @enum
 */
const Getters = {
  TEST: 'test',
}

export const state = {}

export const mutations = {
  /**
   * @name test
   * @param {object} state
   * @param {object} data
   */
  [Mutations.TEST]: function (state, data) {},
}

export const actions = {
  /**
   * @name test
   * @param {ActionContext<object,RootState>} store
   * @param {object} data
   * @returns {Promise<object>}
   */
  [Actions.TEST]: async function (store, data) {
    return data
  },
}
export const getters = {
  /**
   * @name test
   * @param {object} state
   * @param {object} getters
   */
  [Getters.TEST]: function (state, getters) {},
}
