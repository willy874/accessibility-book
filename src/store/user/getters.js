/**
 * @enum
 */
const Getter = {
  TEST: 'test',
}

export default {
  /**
   * @name test
   * @param {ModelState} state
   * @param {Model} data
   */
  [Getter.TEST]: function (state) {
    console.log('state', state)
    console.log('store', this)
  },
}
