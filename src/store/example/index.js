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

export default {
  state: {},
  mutations: {
    /**
     * @name test
     * @param {object} state
     * @param {object} data
     */
    [Mutations.TEST]: function (state, data) {},
  },
  actions: {
    /**
     * @name test
     * @param {ActionContext<object,RootState>} store
     * @param {object} data
     * @returns {Promise<object>}
     */
    [Actions.TEST]: async function (store, data) {
      return data
    },
  },
  getters: {
    /**
     * @name test
     * @param {object} state
     * @param {object} data
     */
    [Getters.TEST]: function (state, data) {},
  },
}
