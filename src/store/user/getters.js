/**
 * @enum {string}
 */
const Getter = {
  TEST: 'test',
}

export default {
  [Getter.TEST]: function (state) {
    console.log('state', state)
    console.log('store', this)
  },
}
