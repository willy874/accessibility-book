/**
 * @param {string} message
 * @param {StringData} data
 * @returns {string}
 */
function messageFormat(message, data = {}) {
  let logMessage = message
  for (const key in data) {
    const reg = new RegExp('{' + key + '}', 'g')
    logMessage = logMessage.replace(reg, () => data[key])
  }
  return logMessage
}

/**
 * @typedef {Object} HttpErrorResponse
 * @property {number} status
 * @property {string} message
 * @property {string} detail
 */

export class HttpError extends Error {
  /**
   * @constructor
   * @param {AxiosError<HttpErrorResponse>} args
   */
  constructor(args) {
    const res = args || {
      response: {
        data: null,
        status: 0,
      },
      config: {
        baseURL: '',
        method: '',
        url: '',
      },
    }
    const message =
      res.response.data?.message || res.response.data?.detail || res.response.data?.non_field_errors?.join(',') || ''
    super(message)
    this.status = res.response?.status || 0
    this.methods = res.config.method.toUpperCase() || 'GET'
    const baseURL = res.config.baseURL || ''
    const url = res.config.url || ''
    this.url = baseURL + url
  }
}

/**
 * @param {unknown} error
 * @param {Record<string,string>} data
 */
export function handleErrorLog(error, data = {}) {
  if (process.env.NODE_ENV === 'development') {
    if (error instanceof Error) {
      console.error(messageFormat(error.message, data))
    }
    if (typeof error === 'string') {
      console.error(messageFormat(error, data))
    }
  }
  return error
}

/**
 * @param {unknown} error
 * @return {void}
 */
export function handleHttpErrorLog(error) {
  if (process.env.NODE_ENV === 'development') {
    if (error instanceof HttpError) {
      console.error(`%s [%s] %s\n%s`, error.methods || 'GET', error.status || 0, error.url || '', error.message)
      return
    }
    if (error instanceof Error) {
      handleErrorLog(error)
    }
  } else {
    if (error instanceof HttpError) {
      if (/login/.test(error.url)) {
        alert(`HTTP Error ${error.status} ${error.message}`)
      }
    }
  }
}

/**
 * @param {string | string[]} message
 * @param {StringData} data
 */
export function handleWarningLog(message, data = {}) {
  if (process.env.NODE_ENV === 'development') {
    if (message instanceof Array) {
      console.error(...message)
    }
    if (typeof message === 'string') {
      console.warn(messageFormat(message, data))
    }
  }
}
