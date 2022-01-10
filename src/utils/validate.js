import { isEmpty } from './condition'
import { handleWarningLog } from './error'
import { ValidateType } from '@/consts'

/**
 * @typedef {Object} ValidateRules
 * @property {ValidateOption<null>} is_empty
 * @property {ValidateOption<ValidPasswordParams>} password
 * @property {ValidateOption<null>} email
 * @property {ValidateOption<ValidEqualParams>} equal
 */

/**
 * @param {string} value
 * @param {ValidateField} options
 * @returns {boolean}
 */
export function validateField(value, options) {
  const errors = []
  for (const type in options) {
    const typeOption = options[type] || {}
    switch (type) {
      case ValidateType.IS_EMPTY:
        errors.push(validEmpty(value, typeOption))
        break
      case ValidateType.EMAIL:
        errors.push(validEmail(value, typeOption))
        break
      case ValidateType.PASSWORD:
        errors.push(validPassword(value, typeOption))
        break
      case ValidateType.EQUAL:
        errors.push(validEqual(value, typeOption))
        break
    }
  }
  const result = errors.filter((s) => s)
  return result.length ? result : null
}

/**
 * @typedef {Pick<ValidateRules,ValidateType>} ValidateField
 */
/**
 * @param {{ [field: string]: JsonData}} form
 * @param {{ [field: string]: ValidateField }} options
 * @returns {ErrorResult}
 */
export function validate(form, options) {
  if (isEmpty(form)) {
    handleWarningLog('utils[function validate]: The form property is all empty.')
  }
  if (isEmpty(options)) {
    handleWarningLog('utils[function validate]: The options property is all empty.')
  }
  const errors = {}
  for (const key in options) {
    if (Object.hasOwnProperty.call(form, key)) {
      errors[key] = validateField(form[key], options[key])
    }
  }
  return errors
}

/**
 * @param {ErrorResult} errors
 * @param {string} field
 * @return {string|null}
 */
export function isValid(errors, field) {
  const fieldError = errors[field]
  return fieldError ? fieldError[0] : null
}

/**
 * @param {unknown} value
 * @param {ValidateOption<{}>} option
 * @returns {string|null}
 */
export function validEmail(value, option) {
  const reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const result = !reg.test(String(value))
  return result ? option.message || '請輸入正確的電子郵件信箱格式' : null
}

/**
 * @typedef {Object} ValidPasswordParams
 * @property {string} min
 * @property {string} max
 */
/**
 * @param {unknown} value
 * @param {ValidateOption<ValidPasswordParams>} option
 * @returns {string|null}
 */
export function validPassword(value, option) {
  const min = option.min || 6
  const max = option.max || 30
  const reg = new RegExp(`^(?=.*\\d)(?=.*[a-zA-Z]).{${min},${max}}$`)
  const result = !reg.test(String(value))
  return result ? option.message || `密碼請輸入${min}~${max}碼英數混合` : null
}

/**
 * @param {unknown} value
 * @param {ValidateOption<{}>} option
 * @returns {string|null}
 */
export function validEmpty(value, option) {
  return isEmpty(value) ? option.message || '輸入資料不得為空' : null
}

/**
 * @typedef {Object} ValidEqualParams
 * @property {string} equal
 */
/**
 * @param {unknown} value
 * @param {ValidateOption<ValidEqualParams>} option
 * @returns {string|null}
 */
export function validEqual(value, option) {
  return option.equal !== value ? option.message || '輸入資料不相等' : null
}
