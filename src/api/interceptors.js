import Config from '@/config'
import { Actions, HttpCode, StorageKey } from '@/consts'

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getRequestSuccess(options) {
  return (req) => {
    const token = localStorage.getItem(StorageKey.TOKEN)
    if (token) {
      req.headers.Authorization = Config.value.authorizationHeaderPrefix + ' ' + token
    }
    return req
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosError<*>>}
 */
export function getRequestError(options) {
  return (error) => error
}

/**
 * @template T
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosResponse<T>>}
 */
export function getResponseSuccess(options) {
  return (res) => res
}

/**
 * @template T
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosError<T>>}
 */
export function getResponseError(options) {
  return (error) => {
    /** @type {Vue} */
    const vm = Config.useApp()
    /** @type {number} */
    const status = error.response?.status || error.request?.status
    switch (status) {
      case HttpCode.CLIENT_ERROR:
        console.error('Client Error')
        break
      case HttpCode.UNAUTHORIZED:
        vm.$store.dispatch(Actions.REMOVE_STORAGE, StorageKey.TOKEN)
        vm.$store.dispatch(Actions.CHECK_LOGIN_REPLACE)
        break
      case HttpCode.FORBIDDEN:
        vm.$store.dispatch(Actions.REMOVE_STORAGE, StorageKey.TOKEN)
        vm.$store.dispatch(Actions.CHECK_LOGIN_REPLACE)
        break
      case HttpCode.NOT_FOUND:
        console.error('Not Found')
        break
      case HttpCode.METHOD_NOT_ALLOWED:
        console.error('Method Not Allowed')
        break
      case HttpCode.Not_ACCEPTABLE:
        console.error('Not Acceptable')
        break
      case HttpCode.TIMEOUT:
        console.error('Timeout')
        break
      case HttpCode.SERVER_ERROR:
        console.error('Server Error')
        break
      case HttpCode.NOT_IMPLEMENTED:
        console.error('Not Implemented')
        break
      case HttpCode.SERVICE_UNAVAILABLE:
        console.error('Service Unavailable')
        break
      default:
        break
    }
    return error
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getAuthRequestSuccess(options) {
  return (req) => {
    if (req.url !== 'login/') {
      const token = localStorage.getItem(StorageKey.TOKEN)
      if (token) {
        req.headers.Authorization = Config.value.authorizationHeaderPrefix + ' ' + token
      }
    }
    return req
  }
}

/**
 * @param {InterceptorsOptions} options
 * @return {InterceptorsClosure<AxiosRequestConfig>}
 */
export function getBaseRequestSuccess(options) {
  return (req) => {
    return req
  }
}
