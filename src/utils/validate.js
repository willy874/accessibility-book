/**
 * @param {string} type
 * @param {string} value
 * @returns {boolean}
 * @description
 * ```markdown
 * # 規則:
 * ## 放入參數:
 *    1. 第一個為要驗證的型別
 *    2. 第二個為要被驗證的值
 * ```
 */
export function validate(type, value) {
  if (type === 'email') {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return reg.test(String(value).toLowerCase())
  }

  if (type === 'password') {
    const reg = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/
    return reg.test(String(value))
  }
}
