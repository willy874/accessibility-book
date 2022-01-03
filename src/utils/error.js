/**
 * @param {string} message
 * @param {Record<string,string>} data
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
   * @param {AxiosError<HttpErrorResponse>} res
   */
  constructor(res = {}) {
    const message = res.response.message || res.response.detail || ''
    super(message)
    this.status = res.response?.status || res.code || 0
    this.methods = res.config.methods.toUpperCase() || 'GET'
    this.url = res.response.url || ''
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
}

/**
 * @param {unknown} error
 */
export function handleHttpErrorLog(error) {
  if (process.env.NODE_ENV === 'development') {
    if (error instanceof HttpError) {
      console.error(
        `%s[%s] %s\n%s\n%s`,
        error.methods || 'GET',
        error.status || 0,
        error.url || '',
        error.message,
        error.stack || ''
      )
      return
    }
    if (error instanceof Error) {
      handleErrorLog(error)
    }
  }
}

/**
 * @param {string | string[]} message
 * @param {Record<string,string>} data
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
