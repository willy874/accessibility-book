import { flatten } from './array'
import { isEmpty, isTextIncludes } from './condition'
import { handleWarningLog } from './error'
import { blobToBase64, urlToImageElement, transformFileSize } from './image'
import { ValidateType } from '@/consts'

/**
 * @typedef {Object} ValidateRules
 * @property {ValidateOption<null>} is_empty
 * @property {ValidateOption<ValidPasswordParams>} password
 * @property {ValidateOption<null>} email
 * @property {ValidateOption<ValidEqualParams>} equal
 * @property {ValidateOption<ValidImageParams>} image
 */
/**
 * @type {{ [x: ValidateTypeEnum]: ValidateHandle }}
 */
const validateHandler = {
  /**
   * @param {unknown} value
   * @param {ValidateOption<{}>} option
   * @returns {string|null}
   */
  [ValidateType.IS_EMPTY]: function (value, option) {
    return isEmpty(value) ? option.message || '輸入資料不得為空' : null
  },
  /**
   * @param {unknown} value
   * @param {ValidateOption<{}>} option
   * @returns {string|null}
   */
  [ValidateType.EMAIL]: function (value, option) {
    const reg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const result = !reg.test(String(value))
    return result ? option.message || '請輸入正確的電子郵件信箱格式' : null
  },
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
  [ValidateType.PASSWORD]: function (value, option) {
    const min = option.min || 6
    const max = option.max || 30
    const reg = new RegExp(`^(?=.*\\d)(?=.*[a-zA-Z]).{${min},${max}}$`)
    const result = !reg.test(String(value))
    return result ? option.message || `密碼請輸入${min}~${max}碼英數混合` : null
  },
  /**
   * @typedef {Object} ValidEqualParams
   * @property {string} equal
   */
  /**
   * @param {unknown} value
   * @param {ValidateOption<ValidEqualParams>} option
   * @returns {string|null}
   */
  [ValidateType.EQUAL]: function (value, option) {
    return option.equal !== value ? option.message || '輸入資料不相等' : null
  },
  /**
   * @typedef {Object} ImageValidMessageOption
   * @property {string} minWidth
   * @property {string} maxWidth
   * @property {string} minHeight
   * @property {string} maxHeight
   * @property {string} size
   * @property {string} type
   */
  /**
   * @typedef {Object} ValidImageParams
   * @property {number} minWidth
   * @property {number} maxWidth
   * @property {number} minHeight
   * @property {number} maxHeight
   * @property {string|number} size
   * @property {string} type
   * @property {ImageValidMessageOption} messageOption
   */
  /**
   * @param {Blob} value
   * @param {ValidateOption<ValidImageParams>} option
   * @returns {string[]|null}
   */
  [ValidateType.IMAGE]: async function (value, option) {
    const errors = []
    if (value instanceof Blob) {
      const messageData = option.messageOption || { default: option.message || null }
      if (option.minWidth || option.maxWidth || option.minHeight || option.maxHeight) {
        const base64Url = await blobToBase64(value)
        const img = await urlToImageElement(base64Url)
        if (option.minWidth < img.naturalWidth) {
          errors.push(messageData.minWidth || messageData.default || '圖片長寬大小超出限制')
        }
        if (option.maxWidth > img.naturalWidth) {
          errors.push(messageData.maxWidth || messageData.default || '圖片長寬大小超出限制')
        }
        if (option.minHeight < img.naturalHeight) {
          errors.push(messageData.minHeight || messageData.default || '圖片長寬大小超出限制')
        }
        if (option.maxHeight > img.naturalHeight) {
          errors.push(messageData.maxHeight || messageData.default || '圖片長寬大小超出限制')
        }
      }
      if (option.size) {
        const sizeNumber = transformFileSize(option.size)
        if (isNaN(sizeNumber)) {
          handleWarningLog('utils[function validImage]: The option property size is not valid variable.')
        } else {
          if (value.size > sizeNumber) {
            errors.push(messageData.size || messageData.default || '檔案大小超出限制')
          }
        }
      }
      if (option.type) {
        const allowedTypes = typeof option.type === 'string' ? option.type.split(',') : Array.from(option.type)
        const types = allowedTypes.map((v) => String(v).toLocaleLowerCase())
        const isAllowed = isTextIncludes(types, value.type.toLocaleLowerCase())
        if (!isAllowed) {
          errors.push(messageData.type || messageData.default || '檔案類型錯誤')
        }
      }
    } else {
      handleWarningLog('utils[function validImage]: The value is not Blob object.')
    }
    return errors.length ? errors : null
  },
}

/**
 * @param {string} value
 * @param {ValidateField} options
 * @returns {boolean}
 */
export async function validateField(value, options) {
  const errors = []
  for (const type in options) {
    const typeOption = options[type] || {}
    /** @type {ValidateHandle} **/
    const handler = validateHandler[type]
    if (handler) {
      const errorMessages = await handler(value, typeOption)
      if (errorMessages) {
        if (Array.isArray(errorMessages)) {
          errors.push(...errorMessages)
        } else {
          errors.push(errorMessages)
        }
      }
    } else {
      handleWarningLog('utils[function validateField]: The options type is not a function.')
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
export async function validate(form, options) {
  if (isEmpty(form)) {
    handleWarningLog('utils[function validate]: The form property is all empty.')
  }
  if (isEmpty(options)) {
    handleWarningLog('utils[function validate]: The options property is all empty.')
  }
  const errors = {}
  for (const key in options) {
    if (Object.hasOwnProperty.call(form, key)) {
      errors[key] = await validateField(form[key], options[key])
    }
  }
  return errors
}

/**
 * @param {ErrorResult} errors
 * @return {string[]}
 */
export function errorsToArray(errors) {
  return flatten(Object.values(errors)).filter((v) => v)
}

/**
 * @param {ErrorResult} errors
 * @param {string} field
 * @return {boolean}
 */
export function isValid(errors, field) {
  if (field) {
    const fieldError = errors[field]
    return Boolean(fieldError ? fieldError[0] : null)
  }
  return Boolean(errorsToArray(errors).length)
}
